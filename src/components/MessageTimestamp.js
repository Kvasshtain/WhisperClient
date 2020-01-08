import React from 'react'
import PropTypes from 'prop-types'

function MessageTimestamp(props) {

    let date = new Date(props.time)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    return (
        <div>
            <p>{hours}:{minutes} {day}.{month}.{year}</p>
        </div>
    )
}

MessageTimestamp.propTypes = {
    time: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]).isRequired
}

export { MessageTimestamp }