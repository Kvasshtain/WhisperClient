import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { AuthenticationAndRegistrationForm } from '../../components/AuthenticationAndRegistrationForm/AuthenticationAndRegistrationForm'

import { connect } from 'react-redux'

import {
  submitUserEmailAndPassword,
  submitNewUser,
  resetAuthenticationResult,
} from '../../actions/chatSettingsActions'

import './AuthenticationAndRegistrationWindow.sass'

class AuthenticationAndRegistrationWindow extends React.Component {
  componentDidUpdate = () => {
    const { isUserAuthenticated, history } = this.props

    if (isUserAuthenticated) {
      history.push('/chat')
    }
  }

  render() {
    const { submitUserEmailAndPassword, submitNewUser } = this.props

    return (
      <div className="authenticationAndRegistrationWindow">
        <AuthenticationAndRegistrationForm
          onAuthenticationSubmit={submitUserEmailAndPassword}
          onRegistrationSubmit={submitNewUser}
        />
      </div>
    )
  }
}

AuthenticationAndRegistrationWindow.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  submitUserEmailAndPassword: PropTypes.func,
  submitNewUser: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    isUserAuthenticated: state.isUserAuthenticated,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitUserEmailAndPassword: (userEmail, userPassword) =>
      dispatch(submitUserEmailAndPassword(userEmail, userPassword)),
    submitNewUser: user => dispatch(submitNewUser(user)),
    onSignOut: () => dispatch(resetAuthenticationResult()),
  }
}

const AuthenticationAndRegistrationWindowWithRouter = withRouter(
  AuthenticationAndRegistrationWindow
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticationAndRegistrationWindowWithRouter)
