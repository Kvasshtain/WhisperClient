import { serverLocation, messageSendPath, messageGetPath, newMessageGetPath, fetchMessagesCount } from '../applicationSettings'

import { handleServerError } from './chatSettingsActions'

import { createHttpHeadersWithToken, checkResponseAndCreateErrorIfBadStatus } from './helper'

export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE'
export const MESSAGE_WAS_RECEIVED = 'MESSAGE_WAS_RECEIVED'
export const REFRESH_MESSAGES_LIST = 'REFRESH_MESSAGES_LIST'
export const UNSHIFT_PREVIOUS_MESSAGES = 'UNSHIFT_PREVIOUS_MESSAGES'
export const PUSH_NEW_MESSAGES = 'PUSH_NEW_MESSAGES'

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

export function pushNewMessages(messages) {
    return {
        type: PUSH_NEW_MESSAGES,
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
                headers: createHttpHeadersWithToken(token),
                body: JSON.stringify(
                    message
                )
            })
                .then((response) => {
                    const serverError = checkResponseAndCreateErrorIfBadStatus(response)
                    return serverError ? serverError : response.json()
                })
                .then((data) => {                  
                    if (data.status) {
                        dispatch(handleServerError(data))
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
                        dispatch(unshiftPreviousMessages(data))
                    }
                })
                .catch(function (error) {
                    console.log('error', error)
                })
        }
    }
}

export function fetchNewMessages(chatId, newestMessageTime) {
    return (dispatch) => {

        const token = localStorage.token

        if(token){
            fetch(`${serverLocation}${newMessageGetPath}?chat_id=${chatId}&newest_message_time=${newestMessageTime}`, {
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
                        dispatch(pushNewMessages(data))
                    }
                })
                .catch(function (error) {
                    console.log('error', error)
                })
        }
    }
}