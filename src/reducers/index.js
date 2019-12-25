import { combineReducers } from 'redux'
import { messages, wasMessageReceived } from './messageListData'
import { chatUser } from './chatSettings'

export default combineReducers({
    messages,
    wasMessageReceived,
    chatUser,
})