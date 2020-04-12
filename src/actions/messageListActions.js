import {
  serverLocation,
  wsServerLocation,
  messageSendPath,
  messageGetPath,
  newMessageGetPath,
  fetchMessagesCount,
} from '../applicationSettings'

import { handleServerError } from './chatSettingsActions'
import { wsConnect, wsDisconnect } from './webSocketActions'

import {
  createHttpHeadersWithToken,
  checkResponseAndCreateErrorIfBadStatus,
  convertMessages,
  getUserToken,
} from './helper'

export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE'
export const MESSAGE_WAS_RECEIVED = 'MESSAGE_WAS_RECEIVED'
export const REFRESH_MESSAGES_LIST = 'REFRESH_MESSAGES_LIST'
export const UNSHIFT_PREVIOUS_MESSAGES = 'UNSHIFT_PREVIOUS_MESSAGES'
export const PUSH_NEW_MESSAGES = 'PUSH_NEW_MESSAGES'
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES'

export function clearMessages() {
  return {
    type: CLEAR_MESSAGES,
  }
}

export function addNewMessage(message) {
  return {
    type: ADD_NEW_MESSAGE,
    payload: message,
  }
}

export function messageWasReceived(bool) {
  return {
    type: MESSAGE_WAS_RECEIVED,
    payload: bool,
  }
}

export function refreshMessagesList(messages) {
  return {
    type: REFRESH_MESSAGES_LIST,
    payload: messages,
  }
}

export function unshiftPreviousMessages(messages) {
  return {
    type: UNSHIFT_PREVIOUS_MESSAGES,
    payload: messages,
  }
}

export function pushNewMessages(messages) {
  return {
    type: PUSH_NEW_MESSAGES,
    payload: messages,
  }
}

export function encryptAndSendNewMessage(text) {
  return (dispatch, getState) => {
    const { forwardPreprocessorFunction } = getState().currentChat

    if (forwardPreprocessorFunction) {
      text = forwardPreprocessorFunction(text)
    }

    dispatch(sendNewMessage(text))
  }
}

export function sendNewMessage(text) {
  return async (dispatch, getState) => {
    try {
      const token = await getUserToken()

      if (!token) return

      dispatch(messageWasReceived(false))

      const time = new Date().getTime()
      const authorEmail = getState().currentUser.email
      const authorName = getState().currentUser.name
      const chatId = getState().currentChat._id

      const message = {
        chatId,
        time,
        authorEmail,
        authorName,
        text,
      }

      const response = await fetch(serverLocation + messageSendPath, {
        method: 'POST',
        headers: createHttpHeadersWithToken(token),
        body: JSON.stringify(message),
      })

      let data = checkResponseAndCreateErrorIfBadStatus(response)

      if (!data) {
        data = await response.json()
      }

      if (data.status) {
        dispatch(handleServerError(data))
        message.wasMessageReceived = false
        dispatch(addNewMessage(message))
        localStorage.removeItem('token')
      } else {
        message.wasMessageReceived = true
        //dispatch(addNewMessage(message))
        dispatch(messageWasReceived(true))
      }
    } catch (error) {
      console.log('error', error)
    }
  }
}

export function fetchMessagesList(chatId, oldestMessageTime) {
  return async (dispatch, getState) => {
    try {
      const token = await getUserToken()

      if (!token) return

      const response = await fetch(
        `${serverLocation}${messageGetPath}?chat_id=${chatId}&oldest_message_time=${oldestMessageTime}&fetch_messages_count=${fetchMessagesCount}`,
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
      } else {
        const { backwardPreprocessorFunction } = getState().currentChat
        data = convertMessages(data, backwardPreprocessorFunction)
        dispatch(unshiftPreviousMessages(data))
      }
    } catch (error) {
      console.log('error', error)
    }
  }
}

export function fetchNewMessages(chatId, newestMessageTime) {
  return async (dispatch, getState) => {
    try {
      const token = await getUserToken()

      if (!token) return

      const response = await fetch(
        `${serverLocation}${newMessageGetPath}?chat_id=${chatId}&newest_message_time=${newestMessageTime}`,
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
      } else {
        dispatch(applyBackwardPreprocessorFunctionAndPushMessage(data))
      }
    } catch (error) {
      console.log('error', error)
    }
  }
}

export function applyBackwardPreprocessorFunctionAndPushMessage(messages) {
  return (dispatch, getState) => {
    const { backwardPreprocessorFunction } = getState().currentChat

    if (backwardPreprocessorFunction) {
      messages = convertMessages(messages, backwardPreprocessorFunction)
    }

    dispatch(pushNewMessages(messages))
  }
}

export function subscribeForNewMessages(chatId) {
  return dispatch => {
    dispatch(wsConnect(`${wsServerLocation}${chatId}`))
  }
}

export function unsubscribeForNewMessages() {
  return dispatch => {
    dispatch(wsDisconnect())
  }
}
