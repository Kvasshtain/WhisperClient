import { serverLocation,
         submitNewChatPath,
         chatsListGetPath,
         submitUserNameAndPasswordPath,
         submitNewUserPath,
         searchUsersPath,
         addNewUserToChatPath, } from '../applicationSettings'

export const CHANGE_CURRENT_USER = 'CHANGE_CURRENT_USER'
export const CHANGE_CURRENT_CHAT = 'CHANGE_CURRENT_CHAT'
export const REFRESH_CHATS_LIST = 'REFRESH_CHATS_LIST'
export const SET_AUTHENTICATION_RESULT = 'SET_AUTHENTICATION_RESULT'
export const SET_LAST_ERROR = 'SET_LAST_ERROR'
export const FILL_FOUND_USERS_LIST = 'FILL_FOUND_USERS_LIST'

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

export function setLastError(status, message) {
    return {
        type: SET_LAST_ERROR,
        payload: {
            status,
            message,
        }
    }
}

export function fillFoundUsersList(usersList) {
    return {
        type: FILL_FOUND_USERS_LIST,
        payload: usersList,
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
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(
                    newChatData
                )
            })
                .then((response) => {
                    
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

        const userAuthenticationData = {
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

export function submitNewUser(email, name, password) {
    return (dispatch) => {

        const userRegistrationData = {
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
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                        chatId: currentChat._id,
                        newUserId: user._id,
                    }
                )
            })
                .then((response) => {
                    
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
