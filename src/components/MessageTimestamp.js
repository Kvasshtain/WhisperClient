import React from 'react'
import PropTypes from 'prop-types'

function MessageTimestamp(props) {

    const date = new Date(props.time)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return (
        <div>
            <p>{ hours }:{ minutes } { day }.{ month }.{ year }</p>
        </div>
    )
}

MessageTimestamp.propTypes = {
    time: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]).isRequired
}

export { MessageTimestamp }