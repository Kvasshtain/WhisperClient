import { ADD_NEW_MESSAGE, MESSAGE_WAS_RECEIVED, REFRESH_MESSAGES_LIST, UNSHIFT_PREVIOUS_MESSAGES } from '../actions/messageListActions'

export function messages(state = [], action) {
    switch (action.type) {
        case ADD_NEW_MESSAGE:
            return state.concat(action.payload)
        case REFRESH_MESSAGES_LIST:
            return action.payload
        case UNSHIFT_PREVIOUS_MESSAGES:
            let previousMessages = action.payload
            let newState = [...previousMessages, ...state]
            return newState
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