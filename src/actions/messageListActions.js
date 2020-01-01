import { serverLocation, messageSendPath, messageGetPath } from '../applicationSettings'

import { setLastError } from './chatSettingsActions'

export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE'
export const MESSAGE_WAS_RECEIVED = 'MESSAGE_WAS_RECEIVED'
export const REFRESH_MESSAGES_LIST = 'REFRESH_MESSAGES_LIST'

export function addNewMessage(message) {
    return {
        type: ADD_NEW_MESSAGE,
        payload: message,
    }
}

export function messageWasReceived(bool) {
    return {
        type: MESSAGE_WAS_RECEIVED,
        payload: bool
    };
}

export function refreshMessagesList(messages) {
    return {
        type: REFRESH_MESSAGES_LIST,
        payload: messages
    }
}

export function sendNewMessage(text) {
    return (dispatch, getState) => {

        const token = localStorage.token

        if(token){
            dispatch(messageWasReceived(false))

            let time = (new Date()).getTime();
            let authorEmail = getState().chatUser.userEmail
            let authorName = getState().chatUser.userName
            let chatId = getState().currentChat
    
            let message = {
                chatId,
                time,
                authorEmail,
                authorName,
                text,
            }
    
            fetch(serverLocation + messageSendPath, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(
                    message
                )
            })
                .then((response) => {
                    
                    if (!response.ok) {
                        message.wasMessageReceived = false
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
                        message.wasMessageReceived = false
                        dispatch(addNewMessage(message))
                        localStorage.removeItem('token')
                    } else {
                        message.wasMessageReceived = true
                        dispatch(addNewMessage(message))
                        dispatch(messageWasReceived(true));
                    }
                })
                .catch(function (error) {
                    console.log('error', error)
                })
        }
    };
}

export function fetchMessagesList() {
    return (dispatch) => {

        const token = localStorage.token

        if(token){
            fetch(serverLocation + messageGetPath, {
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
                        dispatch(refreshMessagesList(data))
                    }
                })
                .catch(function (error) {
                    console.log('error', error)
                })
        }
    }
}