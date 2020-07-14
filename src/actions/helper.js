export const httpHeadersWithoutToken = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export function createHttpHeadersWithToken(token) {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

export function checkResponseAndCreateErrorIfBadStatus(response) {
  if (response.ok) {
    return
  } else {
    const { status, statusText, message } = response

    return {
      status,
      badStatusText: statusText,
      message,
    }
  }
}

export function validateEmail(email) {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

  return reg.test(email)
}

export function readTextFile(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsText(file)
  })
}

export function isStringNullOrEmpty(str) {
  if (!str) return true

  if (str.trim() === '') return true

  return false
}

export function convertMessages(messages, convertor) {
  if (convertor) {
    messages = messages.map(item => {
      const text = convertor(item.text)
      return { ...item, text }
    })
  }

  return messages
}

export async function getUserToken() {
  const { userJson } = localStorage

  if (!userJson) return null

  const user = await JSON.parse(userJson)

  if (!user) return null

  return user.token ? user.token : null
}

export function createGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  }).toUpperCase();
}
