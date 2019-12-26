import { ADD_NEW_MESSAGE, MESSAGE_WAS_RECEIVED, REFRESH_MESSAGES_LIST } from '../actions/messageListActions'

export function messages(state = [], action) {
    switch (action.type) {
        case ADD_NEW_MESSAGE:
            return state.concat(action.payload)
        case REFRESH_MESSAGES_LIST:
            return action.payload
        default:
            return state
    }
}

export function wasMessageReceived(state = true, action) {
    switch (action.type) {
        case MESSAGE_WAS_RECEIVED:
            return action.payload
        default:
            return state
    }
}