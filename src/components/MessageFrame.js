import React from 'react'
import PropTypes from 'prop-types'
import { MessageTimestamp } from './MessageTimestamp'

function MessageFrame(props) {

    let message = props.message

    return (
        <div className="MessageFrame">
            <div>
                <p>{message.authorName}</p>
            </div>
            <div>
                <p>{message.authorEmail}</p>
            </div>
            <div>
                <p>{message.text}</p>
            </div>
            <MessageTimestamp time={message.time} />
        </div>
    )
}

MessageFrame.propTypes = {
    message: PropTypes.exact({
        chatId: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired,
        time: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
        text: PropTypes.string.isRequired,
        wasMessageReceived: PropTypes.bool.isRequired
    })
}

export { MessageFrame }