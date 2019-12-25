import React from 'react'
import PropTypes from 'prop-types'

function MessageFrame(props) {
    return <div className = "MessageFrame">
        <p>{props.message}</p>
    </div>
}

MessageFrame.propTypes = {
    message: PropTypes.string.isRequired,
}

export { MessageFrame }