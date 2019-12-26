import { serverLocation, chatsListGetPath } from '../applicationSettings'

export const CHANGE_CHAT_USER = 'CHANGE_CHAT_USER'
export const CHANGE_CHAT = 'CHANGE_CHAT'
export const REFRESH_CHATS_LIST = 'REFRESH_CHATS_LIST'

export function changeChatUser(userName) {
    return {
        type: CHANGE_CHAT_USER,
        payload: userName,
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
        payload: chats
    }
}

export function fetchChatsList() {
    return (dispatch) => {

        fetch(serverLocation + chatsListGetPath, {
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
                dispatch(refreshChatsList(json))
            })
    }
}