import {
  ADD_NEW_MESSAGE,
  MESSAGE_WAS_RECEIVED,
  REFRESH_MESSAGES_LIST,
  UNSHIFT_PREVIOUS_MESSAGES,
  PUSH_NEW_MESSAGES,
  CLEAR_MESSAGES,
} from '../actions/messageListActions'

export function messages(state = [], action) {
  switch (action.type) {
    case CLEAR_MESSAGES:
      return []
    case ADD_NEW_MESSAGE:
      return [...state, action.payload]
    case REFRESH_MESSAGES_LIST:
      return action.payload
    case UNSHIFT_PREVIOUS_MESSAGES:
      const previousMessages = action.payload
      return [...previousMessages, ...state]
    case PUSH_NEW_MESSAGES:
      const newMessages = action.payload
      return [...state, ...newMessages]
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
