import { CHANGE_CHAT_USER, CHANGE_CHAT, REFRESH_CHATS_LIST } from '../actions/chatSettingsActions'

export function chatUser(state = 'nemo user', action) {
    switch (action.type) {
        case CHANGE_CHAT_USER:
            return action.payload
        default:
            return state
    }
}

export function currentChat(state = -1, action) {
    switch (action.type) {
        case CHANGE_CHAT:
            return action.payload
        default:
            return state
    }
}

export function chatsList(state = [], action) {
    switch (action.type) {
        case REFRESH_CHATS_LIST:
            return action.payload
        default:
            return state
    }
}