import {CHANGE_CHAT_USER} from '../actions/chatSettingsActions'

export function chatUser(state = '', action) {
    switch (action.type) {
        case CHANGE_CHAT_USER:
            return action.payload
        default:
            return state
    }
}