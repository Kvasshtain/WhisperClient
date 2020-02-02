import { serverLocation,
         submitNewChatPath,
         chatsListGetPath,
         submitUserEmailAndPasswordPath,
         submitNewUserPath,
         searchUsersPath,
         addNewUserToChatPath, } from '../applicationSettings'

import { createHttpHeadersWithToken, httpHeadersWithoutToken, checkResponseAndCreateErrorIfBadStatus, validateEmail } from './helper'

export const CHANGE_CURRENT_USER = 'CHANGE_CURRENT_USER'
export const CHANGE_CURRENT_CHAT = 'CHANGE_CURRENT_CHAT'
export const REFRESH_CHATS_LIST = 'REFRESH_CHATS_LIST'
export const SET_AUTHENTICATION_RESULT = 'SET_AUTHENTICATION_RESULT'
export const SET_LAST_ERROR = 'SET_LAST_ERROR'
export const FILL_FOUND_USERS_LIST = 'FILL_FOUND_USERS_LIST'
export const CLEAR_LAST_ERROR = 'CLEAR_LAST_ERROR'

export function changeCurrentUser(user) {
    return {
        type: CHANGE_CURRENT_USER,
        payload: user
    }
}

export function changeCurrentChat(chat) {
    return {
        type: CHANGE_CURRENT_CHAT,
        payload: chat
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
    return (dispatch) => {
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
    return (dispatch) => {
        localStorage.removeItem('token')
        dispatch(setAuthenticationResult(false))
    }
}

export function clearLastError() {
    return {
        type: CLEAR_LAST_ERROR,
    }
}

export function createNewChat(name, users) {
    return (dispatch, getState) => {

        const { token } = localStorage

        if(token) {
            const newChatData = {
                chat: {
                    name,
                    users,
                }
            }
    
            fetch(serverLocation + submitNewChatPath, {
                method: 'POST',
                headers: createHttpHeadersWithToken(token),
                body: JSON.stringify(
                    newChatData
                )
            })
                .then((response) => {
                    const serverError = checkResponseAndCreateErrorIfBadStatus(response)
                    return serverError ? serverError : response.json()
                })
                .then((data) => {
    
                    if (data.status) {
                        dispatch(handleServerError(data))
                    } else {
                        const { _id, name, users } = data.chat
                        const { currentUser } = getState()
    
                        dispatch(changeCurrentChat(_id, name, users))
                        dispatch(fetchChatsList(currentUser._id))
                    }
                })
                .catch(function (error) {
                    console.log('error', error)
                })
        }
    }
}

export function fetchChatsList(userId) {
    return (dispatch) => {

        const { token } = localStorage

        if(token) {
            fetch(`${serverLocation}${chatsListGetPath}?user_id=${userId}`, {
                method: 'GET',
                headers: createHttpHeadersWithToken(token),
            })
                .then(response => {
                    const serverError = checkResponseAndCreateErrorIfBadStatus(response)
                    return serverError ? serverError : response.json()
                })
                .then((data) => {                   
                    if (data.badStatusText) {
                        dispatch(handleServerError(data))
                        localStorage.removeItem('token')
                    } else {
                        dispatch(refreshChatsList(data))
                    }
                })
                .catch(function (error) {
                    console.log('error', error)
                })
        }
    }
}

export function submitUserEmailAndPassword(email, password) {
    return (dispatch) => {

        if (!validateEmail(email)) {
            dispatch(setLastError({
                message: `Bad email: ${email}`,
            }))
            return
        }

        const userAuthenticationData = {
            user: {
                email,
                name: '',
                password,
            }
        }

        fetch(serverLocation + submitUserEmailAndPasswordPath, {
            method: 'POST',
            headers: httpHeadersWithoutToken,
            body: JSON.stringify(
                userAuthenticationData
            )
        })
            .then((response) => {
                const serverError = checkResponseAndCreateErrorIfBadStatus(response)
                return serverError ? serverError : response.json()
            })
            .then((data) => {

                if (data.badStatusText) {
                    dispatch(handleServerError(data))
                    dispatch(setAuthenticationResult(false))
                } else {
                    const { _id, token } = data.user

                    localStorage.setItem('token', token)

                    dispatch(changeCurrentUser(data.user))
                    dispatch(setAuthenticationResult(true))
                    dispatch(fetchChatsList(_id))
                }
            })
            .catch(function (error) {
                console.log('error', error)
            })
    }
}

export function submitNewUser(user) {
    return (dispatch) => {

        if (!validateEmail(user.email)) {
            dispatch(setLastError({
                message: `Bad email: ${user.email}`,
            }))

            return
        }

        fetch(serverLocation + submitNewUserPath, {
            method: 'POST',
            headers: httpHeadersWithoutToken,
            body: JSON.stringify({ user })
        })
            .then((response) => {
                const serverError = checkResponseAndCreateErrorIfBadStatus(response)
                return serverError ? serverError : response.json()
            })
            .then((data) => {

                if (data.badStatusText) {
                    dispatch(handleServerError(data))
                    dispatch(setAuthenticationResult(false))
                } else {
                    const { _id, token } = data.user

                    localStorage.setItem('token', token)

                    dispatch(changeCurrentUser(data.user))
                    dispatch(changeCurrentChat({}))
                    dispatch(setAuthenticationResult(true))
                    dispatch(fetchChatsList(_id))
                }
            })
            .catch(function (error) {
                console.log('error', error)
            })
    }
}

export function findUsers(userSeekData) {
    return (dispatch) => {
        const { token } = localStorage

        if(token) {
            fetch(`${serverLocation}${searchUsersPath}?user_seek_data=${userSeekData}`, {
                method: 'GET',
                headers: createHttpHeadersWithToken(token),
            })
                .then(response => {
                    const serverError = checkResponseAndCreateErrorIfBadStatus(response)
                    return serverError ? serverError : response.json()
                })
                .then((data) => {
                    if (data.badStatusText) {
                        dispatch(handleServerError(data))

                        localStorage.removeItem('token')
                    } else {
                        dispatch(fillFoundUsersList(data))
                    }
                })
                .catch(function (error) {
                    console.log('error', error)
                })
        }
    }
}

export function addNewUserToCurrentChat(user) {
    return (dispatch, getState) => {
        const { token } = localStorage
        if(token) {
            const { currentChat } = getState()
    
            fetch(serverLocation + addNewUserToChatPath, {
                method: 'POST',
                headers: createHttpHeadersWithToken(token),
                body: JSON.stringify({
                        chatId: currentChat._id,
                        newUserId: user._id,
                    }
                )
            })
                .then((response) => {
                    const serverError = checkResponseAndCreateErrorIfBadStatus(response)
                    return serverError ? serverError : response.json()
                })
                .then((data) => {
    
                    if (data.badStatusText) {
                        dispatch(handleServerError(data))
                    } else {
                        const { _id, name, users } = data.chat
    
                        dispatch(changeCurrentChat(_id, name, users))
                    }
                })
                .catch(function (error) {
                    console.log('error', error)
                })
        }
    }
}
