import { combineReducers } from 'redux'
import { messages, wasMessageReceived } from './messageListData'
import { currentUser, currentChat, chatsList, isUserAuthenticated, lastError, usersList } from './chatSettings'

export default combineReducers({
    messages,
    wasMessageReceived,
    currentUser,
    currentChat,
    chatsList,
    isUserAuthenticated,
    lastError,
    usersList,
})