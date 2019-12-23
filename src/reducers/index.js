import { combineReducers } from 'redux'
import { messages, wasMessageReceived } from './messageListData'

export default combineReducers({
    messages,
    wasMessageReceived,
})