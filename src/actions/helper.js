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
