import { serverLocation, messageSendPath, messageGetPath } from '../applicationSettings'

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
            let author = getState().chatUser.userEmail
            let chatId = getState().currentChat
    
            let message = {
                chatId,
                time,
                author,
                text,
                wasMessageReceived: true
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
                    }
    
                    return response.json()
                })
                .then((data) => {

                    if (data.message) {
                        //!!!!! Логика обработки ошибок

                        localStorage.removeItem('token')
                    } else {
                        dispatch(addNewMessage(message))
                        dispatch(messageWasReceived(true));
                    }
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
                    }

                    return response.json()
                })
                .then((data) => {

                    if (data.message) {
                        //!!!!! Логика обработки ошибок

                        localStorage.removeItem('token')
                    } else {
                        dispatch(refreshMessagesList(data))
                    }
                })
        }
    }
}