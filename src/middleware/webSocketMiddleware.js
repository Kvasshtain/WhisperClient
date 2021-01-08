import { applyBackwardPreprocessorFunctionAndPushMessage } from '../actions/messageListActions'

import {
  wsConnected,
  wsDisconnected,
  WS_CONNECT,
  WS_DISCONNECT,
} from '../actions/webSocketActions'

const webSocketMiddleware = () => {
  let socket = null

  const onOpen = store => event => {
    store.dispatch(wsConnected(event.target.url))
  }

  const onClose = store => () => {
    store.dispatch(wsDisconnected())
  }

  const onMessage = store => event => {
    const data = JSON.parse(event.data)

    switch (data.actionType) {
      case 'save':
        const messages = [data.message]
        store.dispatch(
          applyBackwardPreprocessorFunctionAndPushMessage(messages)
        )
        break
      default:
        break
    }
  }

  return store => next => action => {
    switch (action.type) {
      case WS_CONNECT:
        if (socket !== null) {
          socket.close()
        }

        socket = new WebSocket(action.payload)
        socket.onmessage = onMessage(store)
        socket.onclose = onClose(store)
        socket.onopen = onOpen(store)
        break
      case WS_DISCONNECT:
        if (socket !== null) {
          socket.close()
        }

        socket = null
        break
      default:
        return next(action)
    }
  }
}

export default webSocketMiddleware()
