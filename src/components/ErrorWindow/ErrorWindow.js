import React from 'react'
import PropTypes from 'prop-types'

import './ErrorWindow.sass'

function ErrorWindow(props) {
  const { status, badStatusText, message } = props.lastError

  let statusParagraph, badStatusTextParagraph, messageParagraph

  if (status) {
    statusParagraph = <p>Status: {status}</p>
    badStatusTextParagraph = <p>Status text: {badStatusText}</p>
    messageParagraph = <p>Message: {message}</p>
  }

  return (
    <div className="errorWindow">
      <div>
        <h4>Error</h4>
      </div>
      <div>
        {statusParagraph}
        {badStatusTextParagraph}
        {messageParagraph}
      </div>
      <button onClick={props.onOk}>Ok</button>
    </div>
  )
}

ErrorWindow.propTypes = {
  lastError: PropTypes.exact({
    status: PropTypes.number,
    badStatusText: PropTypes.string,
    message: PropTypes.string,
  }),
}

export { ErrorWindow }
