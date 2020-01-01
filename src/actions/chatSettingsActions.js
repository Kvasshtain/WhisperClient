import { serverLocation, chatsListGetPath, submitUserNameAndPasswordPath, submitNewUserPath } from '../applicationSettings'

export const CHANGE_CHAT_USER = 'CHANGE_CHAT_USER'
export const CHANGE_CHAT = 'CHANGE_CHAT'
export const REFRESH_CHATS_LIST = 'REFRESH_CHATS_LIST'
export const SET_AUTHENTICATION_RESULT = 'SET_AUTHENTICATION_RESULT'
export const SET_LAST_ERROR = 'SET_LAST_ERROR'

export function changeChatUser(userEmail, userName) {
    return {
        type: CHANGE_CHAT_USER,
        payload: {
            userName,
            userEmail,
        }
    }
}

export function changeChat(chatId) {
    return {
        type: CHANGE_CHAT,
        payload: chatId,
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

export function setLastError(status, message) {
    return {
        type: SET_LAST_ERROR,
        payload: {
            status,
            message,
        }
    }
}

export function fetchChatsList() {
    return (dispatch) => {

        const token = localStorage.token

        if(token) {
            fetch(serverLocation + chatsListGetPath, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => {

                    if (!response.ok) {

                        localStorage.removeItem('token')

                        return {
                            status: response.status,
                            message: response.statusText,
                        }
                    }

                    return response.json()
                })
                .then((data) => {
                    if (data.message) {
                        dispatch(setLastError(data.status, data.message))

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

export function submitUserNameAndPassword(email, password) {
    return (dispatch) => {

        let userAuthenticationData = {
            user: {
                email,
                name: '',
                password,
            }
        }

        fetch(serverLocation + submitUserNameAndPasswordPath, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                userAuthenticationData
            )
        })
            .then((response) => {
                
                if (!response.ok) {
                    return {
                        status: response.status,
                        message: response.statusText,
                    }
                }
                
                return response.json()
            })
            .then((data) => {

                if (data.message) {
                    dispatch(setLastError(data.status, data.message))
                    dispatch(setAuthenticationResult(false))
                } else {
                    let { email, name, token } = data.user

                    localStorage.setItem('token', token)

                    dispatch(changeChatUser(email, name))
                    dispatch(setAuthenticationResult(true))
                }
            })
            .catch(function (error) {
                console.log('error', error)
            })
    }
}

export function submitNewUser(email, name, password) {
    return (dispatch) => {

        let userRegistrationData = {
            user: {
                email,
                name,
                password,
            }
        }

        fetch(serverLocation + submitNewUserPath, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                userRegistrationData
            )
        })
            .then((response) => {
                
                if (!response.ok) {
                    return {
                        status: response.status,
                        message: response.statusText,
                    }
                }
                
                return response.json()
            })
            .then((data) => {

                if (data.message) {
                    dispatch(setLastError(data.status, data.message))
                    dispatch(setAuthenticationResult(false))
                } else {
                    let { email, name, token } = data.user

                    localStorage.setItem('token', token)

                    dispatch(changeChatUser(email, name))
                    dispatch(setAuthenticationResult(true))
                }
            })
            .catch(function (error) {
                console.log('error', error)
            })
    }
}
