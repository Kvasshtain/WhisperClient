import React from 'react'
import PropTypes from 'prop-types'
import { addLeadZero } from '../../helper'

import './MessageFrame-MessageTimestamp.sass'

function MessageTimestamp(props) {
  const date = new Date(props.time)
  let hours = addLeadZero(date.getHours())
  let minutes = addLeadZero(date.getMinutes())
  let day = addLeadZero(date.getDate())
  let month = addLeadZero(date.getMonth() + 1)
  let year = date.getFullYear()

  return (
    <div className="messageFrame-MessageTimestamp">
      <span>
        {hours}:{minutes} {day}.{month}.{year}
      </span>
    </div>
  )
}

MessageTimestamp.propTypes = {
  time: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
}

export { MessageTimestamp }
