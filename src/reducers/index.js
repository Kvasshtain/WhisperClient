import { combineReducers } from 'redux'

import {
  messages,
  messagesWaitingList,
  wasMessageReceived
} from './messageListData'

import {
  currentUser,
  currentChat,
  chatsList,
  isUserAuthenticated,
  lastError,
  usersList,
} from './chatSettings'

export default combineReducers({
  messages,
  wasMessageReceived,
  messagesWaitingList,
  currentUser,
  currentChat,
  chatsList,
  isUserAuthenticated,
  lastError,
  usersList,
})
