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

        dispatch(messageWasReceived(false))

        let time = (new Date()).getTime();
        let author = getState().chatUser
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
            },
            body: JSON.stringify(
                message
            )
        })
            .then((response) => {
                
                if (!response.ok) {
                    message.wasMessageReceived = false;
                }

                dispatch(addNewMessage(message))
                dispatch(messageWasReceived(true));
            })
    };
}

export function fetchMessagesList() {
    return (dispatch) => {

        fetch(serverLocation + messageGetPath, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                return response.json()
            })
            .then((json) => {
                dispatch(refreshMessagesList(json))
            })
    }
}