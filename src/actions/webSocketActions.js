export const WS_CONNECT = 'WS_CONNECT'
export const WS_CONNECTING = 'WS_CONNECTING'
export const WS_CONNECTED = 'WS_CONNECTED'
export const WS_DISCONNECT = 'WS_DISCONNECT'
export const WS_DISCONNECTED = 'WS_DISCONNECTED'

export function wsConnect(host) {
  return {
    type: WS_CONNECT,
    payload: host,
  }
}

export function wsConnecting() {
  return {
    type: WS_CONNECTING,
  }
}

export function wsConnected() {
  return {
    type: WS_CONNECTED,
  }
}

export function wsDisconnect() {
  return {
    type: WS_DISCONNECT,
  }
}

export function wsDisconnected() {
  return {
    type: WS_DISCONNECTED,
  }
}
