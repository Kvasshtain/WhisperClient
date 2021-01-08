import React from 'react'
import PropTypes from 'prop-types'

function MessageTextField(props) {
  return <span>{props.text}</span>
}

MessageTextField.propTypes = {
  text: PropTypes.string,
}

export { MessageTextField }
