import {
  ADD_NEW_MESSAGE,
  MESSAGE_WAS_RECEIVED,
  REFRESH_MESSAGES_LIST,
  UNSHIFT_PREVIOUS_MESSAGES,
  PUSH_NEW_MESSAGES,
  CLEAR_MESSAGES,
  ADD_MSSAGE_TO_WAITING_LIST,
  REMOVE_MESSAGES_FROM_WAITING_LIST,
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

export function messagesWaitingList(state = [], action) {
  switch (action.type) {
    case ADD_MSSAGE_TO_WAITING_LIST:
      return [...state, action.payload]
    case REMOVE_MESSAGES_FROM_WAITING_LIST:
      return state.filter(message => !action.payload.includes(message.clientSideId))
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
