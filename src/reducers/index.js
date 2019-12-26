import { combineReducers } from 'redux'
import { messages, wasMessageReceived } from './messageListData'
import { chatUser, currentChat } from './chatSettings'

export default combineReducers({
    messages,
    wasMessageReceived,
    chatUser,
    currentChat,
})