import { serverLocation, messageSendPath, messageGetPath, fetchMessagesCount } from '../applicationSettings'

import { setLastError } from './chatSettingsActions'

export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE'
export const MESSAGE_WAS_RECEIVED = 'MESSAGE_WAS_RECEIVED'
export const REFRESH_MESSAGES_LIST = 'REFRESH_MESSAGES_LIST'
export const UNSHIFT_PREVIOUS_MESSAGES = 'UNSHIFT_PREVIOUS_MESSAGES'

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
    };
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

export function sendNewMessage(text) {
    return (dispatch, getState) => {

        const token = localStorage.token

        if(token){
            dispatch(messageWasReceived(false))

            const time = (new Date()).getTime();
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

export function fetchMessagesList(chatId, oldestMessageTime) {
    return (dispatch) => {

        const token = localStorage.token

        if(token){
            fetch(`${serverLocation}${messageGetPath}?chat_id=${chatId}&oldest_message_time=${oldestMessageTime}&fetch_messages_count=${fetchMessagesCount}`, {
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
                        dispatch(unshiftPreviousMessages(data))
                    }
                })
                .catch(function (error) {
                    console.log('error', error)
                })
        }
    }
}