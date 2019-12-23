export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE'
export const MESSAGE_WAS_RECEIVED = 'MESSAGE_WAS_RECEIVED'

const serverLocation = 'http://localhost:3000/'
const messageReceivePath = 'messageReceive/';

export function addNewMessage(message) {
    return {
        type: ADD_NEW_MESSAGE,
        payload: message,
    }
}

export function messageWasReceived(bool) {
    return {
        type: MESSAGE_WAS_RECEIVED,
        payload: bool
    };
}

export function sendNewMessage(message) {
    return (dispatch, getState) => {

        let state = getState()
        console.log(state)

        dispatch(messageWasReceived(false))

        fetch(serverLocation + messageReceivePath, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message
            })
        })
            .then((response) => {
                // if (!response.ok) {
                //     throw Error(response.statusText);
                // }

                dispatch(addNewMessage(message))
                dispatch(messageWasReceived(true));
            })
    };
}