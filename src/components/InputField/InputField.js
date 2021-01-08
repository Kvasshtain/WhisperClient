import React from 'react'
import PropTypes from 'prop-types'

import './InputField.sass'

function InputField(props) {
  const { caption, name, placeholder, type, value, onChange } = props

  return (
    <div className="inputField">
      <label>{caption}</label>
      <input
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

InputField.propTypes = {
  caption: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export { InputField }
