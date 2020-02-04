import React from 'react'
import PropTypes from 'prop-types'

function ErrorWindow(props) {

    const { status, badStatusText, message } = props.lastError

    let statusParagraph, badStatusTextParagraph, messageParagraph

    if (status) {
        statusParagraph = <p>
            Status: { status }
        </p>
    }

    if (status) {
        badStatusTextParagraph = <p>
            Status text: { badStatusText }
        </p>
    }

    if (status) {
        messageParagraph = <p>
            Message: { message }
        </p>
    }

    return (
        <div className = "modalWindow">
            <div>
                <h4>Error</h4>
            </div>
            <div>
                { statusParagraph }
                { badStatusTextParagraph }
                { messageParagraph }
            </div>
            <button onClick = { props.onOk }>
                Ok
            </button>
        </div>
    )
}

ErrorWindow.propTypes = {
    lastError: PropTypes.exact({
        status: PropTypes.number,
        badStatusText: PropTypes.string,
        message: PropTypes.string,
    })
}

export { ErrorWindow }