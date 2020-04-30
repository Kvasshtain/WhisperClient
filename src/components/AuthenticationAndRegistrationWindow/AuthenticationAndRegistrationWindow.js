import React from 'react'
import PropTypes from 'prop-types'

import { AuthenticationAndRegistrationForm } from '../AuthenticationAndRegistrationForm/AuthenticationAndRegistrationForm'

import './AuthenticationAndRegistrationWindow.sass'

function AuthenticationAndRegistrationWindow(props) {
  return (
    <div className="authenticationAndRegistrationWindow">
      <AuthenticationAndRegistrationForm {...props} />
    </div>
  )
}

AuthenticationAndRegistrationWindow.propTypes = {
  submitUserEmailAndPassword: PropTypes.func,
  submitNewUser: PropTypes.func,
}

export { AuthenticationAndRegistrationWindow }
