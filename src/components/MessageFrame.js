import React from 'react'
import PropTypes from 'prop-types'
import { MessageTimestamp } from './MessageTimestamp'

function MessageFrame(props) {

    const { message } = props

    return (
        <div>
            <div>
                <p>{ message.authorName }</p>
            </div>
            <div>
                <p>{ message.authorEmail }</p>
            </div>
            <div>
                <p>{ message.text }</p>
            </div>
            <MessageTimestamp time = { message.time } />
        </div>
    )
}

MessageFrame.propTypes = {
    message: PropTypes.exact({
        _id: PropTypes.string,
        chatId: PropTypes.string.isRequired,
        authorName: PropTypes.string.isRequired,
        authorEmail: PropTypes.string.isRequired,
        time: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
        text: PropTypes.string.isRequired,
        wasMessageReceived: PropTypes.bool,
    })
}

export { MessageFrame }