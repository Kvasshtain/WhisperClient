import {
  serverLocation,
  submitNewChatPath,
  chatsListGetPath,
  submitUserEmailAndPasswordPath,
  submitNewUserPath,
  searchUsersPath,
  addNewUserToChatPath,
} from '../applicationSettings'

import { clearMessages } from './messageListActions'

import {
  createHttpHeadersWithToken,
  httpHeadersWithoutToken,
  checkResponseAndCreateErrorIfBadStatus,
  validateEmail,
  readTextFile,
  isStringNullOrEmpty,
  getUserToken,
} from './helper'

export const CHANGE_CURRENT_USER = 'CHANGE_CURRENT_USER'
export const CHANGE_CURRENT_CHAT = 'CHANGE_CURRENT_CHAT'
export const REFRESH_CHATS_LIST = 'REFRESH_CHATS_LIST'
export const SET_AUTHENTICATION_RESULT = 'SET_AUTHENTICATION_RESULT'
export const SET_LAST_ERROR = 'SET_LAST_ERROR'
export const FILL_FOUND_USERS_LIST = 'FILL_FOUND_USERS_LIST'
export const CLEAR_LAST_ERROR = 'CLEAR_LAST_ERROR'
export const ADD_NEW_SPECIAL_MESSAGES_PREPROCESSOR_FUNCTION =
  'ADD_NEW_SPECIAL_MESSAGES_PREPROCESSOR_FUNCTION'

export function changeCurrentUser(user) {
  return {
    type: CHANGE_CURRENT_USER,
    payload: user,
  }
}

export function changeCurrentChat(chat) {
  return {
    type: CHANGE_CURRENT_CHAT,
    payload: chat,
  }
}

export function refreshChatsList(chats) {
  return {
    type: REFRESH_CHATS_LIST,
    payload: chats,
  }
}

export function setAuthenticationResult(result) {
  return {
    type: SET_AUTHENTICATION_RESULT,
    payload: result,
  }
}

export function handleServerError(serverErrorData) {
  return dispatch => {
    if (serverErrorData.status === 401) {
      dispatch(resetAuthenticationResult())
    }

    dispatch(setLastError(serverErrorData))
  }
}

export function setLastError(errorData) {
  return {
    type: SET_LAST_ERROR,
    payload: errorData,
  }
}

export function fillFoundUsersList(usersList) {
  return {
    type: FILL_FOUND_USERS_LIST,
    payload: usersList,
  }
}

export function resetAuthenticationResult() {
  return dispatch => {
    localStorage.removeItem('userJson')
    dispatch(setAuthenticationResult(false))
  }
}

export function clearLastError() {
  return {
    type: CLEAR_LAST_ERROR,
  }
}

export function addNewSpecialMessagesPreprocessorFunction(
  forwardPreprocessorFunction,
  backwardPreprocessorFunction
) {
  return {
    type: ADD_NEW_SPECIAL_MESSAGES_PREPROCESSOR_FUNCTION,
    payload: {
      forwardPreprocessorFunction,
      backwardPreprocessorFunction,
    },
  }
}

export function checkIsUserAuthenticated() {
  return async dispatch => {
    const { userJson } = localStorage
    let user
    try {
      if (!userJson) return
      user = await JSON.parse(userJson)
    } catch (error) {
      localStorage.removeItem('userJson')
      return
    }

    dispatch(changeCurrentUser(user))
    dispatch(setAuthenticationResult(true))
    dispatch(fetchChatsList(user._id))
  }
}

export function addNewSpecialMessagesPreprocessor(file) {
  return async (dispatch, getState) => {
    if (!file) return

    let preprocessorString = await readTextFile(file)

    if (isStringNullOrEmpty(preprocessorString)) {
      dispatch(setLastError({ message: 'File is empty or has wrong format' }))
      return
    }

    let createTextMutators

    try {
      eval(preprocessorString)
    } catch (err) {
      dispatch(setLastError({ message: 'File has wrong format' }))
      return
    }

    if (typeof createTextMutators !== 'function') {
      dispatch(setLastError({ message: 'File has wrong format' }))
      return
    }

    const mutators = createTextMutators()

    if (!mutators) {
      dispatch(setLastError({ message: 'File has wrong format' }))
      return
    }

    const { forward, backward } = mutators
    if (typeof forward !== 'function' || typeof backward !== 'function') {
      dispatch(setLastError({ message: 'File has wrong format' }))
      return
    }

    const { currentChat } = getState()

    localStorage.setItem(currentChat._id, preprocessorString)

    dispatch(addNewSpecialMessagesPreprocessorFunction(forward, backward))
  }
}

export function tryGetPreprocessorAndСhangeCurrentChat(chat) {
  return dispatch => {
    const preprocessorString = localStorage.getItem(chat._id)

    dispatch(changeCurrentChat(chat))
    dispatch(clearMessages())

    let createTextMutators

    if (preprocessorString) {
      try {
        eval(preprocessorString)
      } catch (err) {
        return
      }
    }

    if (typeof createTextMutators !== 'function') {
      return
    }

    const mutators = createTextMutators()

    if (!mutators) {
      return
    }

    const { forward, backward } = mutators

    if (typeof forward !== 'function' || typeof backward !== 'function') {
      return
    }

    dispatch(addNewSpecialMessagesPreprocessorFunction(forward, backward))
  }
}

export function createNewChat(name, users) {
  return async (dispatch, getState) => {
    try {
      const token = await getUserToken()

      if (!token) return

      const newChatData = {
        chat: {
          name,
          users,
        },
      }

      const response = await fetch(serverLocation + submitNewChatPath, {
        method: 'POST',
        headers: createHttpHeadersWithToken(token),
        body: JSON.stringify(newChatData),
      })

      let data = checkResponseAndCreateErrorIfBadStatus(response)

      if (!data) {
        data = await response.json()
      }

      if (data.status) {
        dispatch(handleServerError(data))
      } else {
        const { currentUser } = getState()

        dispatch(tryGetPreprocessorAndСhangeCurrentChat(data.chat))
        dispatch(fetchChatsList(currentUser._id))
      }
    } catch (error) {
      console.log('error', error)
    }
  }
}

export function fetchChatsList(userId) {
  return async dispatch => {
    try {
      const token = await getUserToken()

      if (!token) return

      const response = await fetch(
        `${serverLocation}${chatsListGetPath}?user_id=${userId}`,
        {
          method: 'GET',
          headers: createHttpHeadersWithToken(token),
        }
      )

      let data = checkResponseAndCreateErrorIfBadStatus(response)

      if (!data) {
        data = await response.json()
      }

      if (data.badStatusText) {
        dispatch(handleServerError(data))
        localStorage.removeItem('token')
        localStorage.removeItem('userJson')
      } else {
        dispatch(refreshChatsList(data))
      }
    } catch (error) {
      console.log('error', error)
    }
  }
}

export function submitUserEmailAndPassword(email, password) {
  return async dispatch => {
    try {
      if (!validateEmail(email)) {
        dispatch(
          setLastError({
            message: `Bad email: ${email}`,
          })
        )
        return
      }

      const userAuthenticationData = {
        user: {
          email,
          name: '',
          password,
        },
      }

      const response = await fetch(
        serverLocation + submitUserEmailAndPasswordPath,
        {
          method: 'POST',
          headers: httpHeadersWithoutToken,
          body: JSON.stringify(userAuthenticationData),
        }
      )

      let data = checkResponseAndCreateErrorIfBadStatus(response)

      if (!data) {
        data = await response.json()
      }

      if (data.badStatusText) {
        dispatch(handleServerError(data))
        dispatch(setAuthenticationResult(false))
      } else {
        const { _id } = data.user

        localStorage.setItem('userJson', JSON.stringify(data.user))

        dispatch(changeCurrentUser(data.user))
        dispatch(setAuthenticationResult(true))
        dispatch(fetchChatsList(_id))
      }
    } catch (error) {
      console.log('error', error)
    }
  }
}

export function submitNewUser(user) {
  return async dispatch => {
    try {
      if (!validateEmail(user.email)) {
        dispatch(
          setLastError({
            message: `Bad email: ${user.email}`,
          })
        )

        return
      }

      const response = await fetch(serverLocation + submitNewUserPath, {
        method: 'POST',
        headers: httpHeadersWithoutToken,
        body: JSON.stringify({ user }),
      })

      let data = checkResponseAndCreateErrorIfBadStatus(response)

      if (!data) {
        data = await response.json()
      }

      if (data.badStatusText) {
        dispatch(handleServerError(data))
        dispatch(setAuthenticationResult(false))
      } else {
        const { _id } = data.user

        localStorage.setItem('userJson', JSON.stringify(data.user))

        dispatch(changeCurrentUser(data.user))
        dispatch(changeCurrentChat({}))
        dispatch(setAuthenticationResult(true))
        dispatch(fetchChatsList(_id))
      }
    } catch (error) {
      console.log('error', error)
    }
  }
}

export function findUsers(userSeekData) {
  return async dispatch => {
    try {
      const token = await getUserToken()

      if (!token) return

      const response = await fetch(
        `${serverLocation}${searchUsersPath}?user_seek_data=${userSeekData}`,
        {
          method: 'GET',
          headers: createHttpHeadersWithToken(token),
        }
      )

      let data = checkResponseAndCreateErrorIfBadStatus(response)

      if (!data) {
        data = await response.json()
      }

      if (data.badStatusText) {
        dispatch(handleServerError(data))

        localStorage.removeItem('token')
        localStorage.removeItem('userJson')
      } else {
        dispatch(fillFoundUsersList(data))
      }
    } catch (error) {
      console.log('error', error)
    }
  }
}

export function addNewUserToCurrentChat(user) {
  return async (dispatch, getState) => {
    try {
      const token = await getUserToken()

      if (!token) return

      const { currentChat } = getState()

      const response = await fetch(serverLocation + addNewUserToChatPath, {
        method: 'POST',
        headers: createHttpHeadersWithToken(token),
        body: JSON.stringify({
          chatId: currentChat._id,
          newUserId: user._id,
        }),
      })

      let data = checkResponseAndCreateErrorIfBadStatus(response)

      if (!data) {
        data = await response.json()
      }

      if (data.badStatusText) {
        dispatch(handleServerError(data))
      } else {
        dispatch(tryGetPreprocessorAndСhangeCurrentChat(data.chat))
      }
    } catch (error) {
      console.log('error', error)
    }
  }
}
