export const CHANGE_CHAT_USER = 'CHANGE_CHAT_USER'

export function changeChatUser(userName) {
    return {
        type: CHANGE_CHAT_USER,
        payload: userName,
    }
}