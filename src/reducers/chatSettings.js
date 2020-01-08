import { 
    CHANGE_CURRENT_USER, 
    CHANGE_CURRENT_CHAT, 
    REFRESH_CHATS_LIST, 
    SET_AUTHENTICATION_RESULT, 
    SET_LAST_ERROR
} from '../actions/chatSettingsActions'

export function currentUser(state = {}, action) {
    switch (action.type) {
        case CHANGE_CURRENT_USER:
            return action.payload
        default:
            return state
    }
}

export function currentChat(state = {}, action) {
    switch (action.type) {
        case CHANGE_CURRENT_CHAT:
            return action.payload
        default:
            return state
    }
}

export function chatsList(state = [], action) {
    switch (action.type) {
        case REFRESH_CHATS_LIST:
            return action.payload
        default:
            return state
    }
}

export function isUserAuthenticated(state = false, action) {
    switch (action.type) {
        case SET_AUTHENTICATION_RESULT:
            return action.payload
        default:
            return state
    }
}

export function lastError(state = {}, action) {
    switch (action.type) {
        case SET_LAST_ERROR:
            return action.payload
        default:
            return state
    }
}