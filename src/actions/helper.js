export const httpHeadersWithoutToken = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

export function createHttpHeadersWithToken(token) {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }
}

export function checkResponseAndCreateErrorIfBadStatus(response) {

    if (response.ok) return

    const { status, statusText, message } = response

    return {
        status,
        badStatusText: statusText,
        message
    }
}
