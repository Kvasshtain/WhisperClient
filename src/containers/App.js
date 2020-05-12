import React from 'react'
import { asModalWindow } from '../components/ModalWindow/asModalWindow'
import { AuthenticationAndRegistrationWindow } from '../components/AuthenticationAndRegistrationWindow/AuthenticationAndRegistrationWindow'
import { ErrorWindow } from '../components/ErrorWindow/ErrorWindow'
import { AppPanel } from './AppPanel/AppPanel'

import { connect } from 'react-redux'

import {
  checkIsUserAuthenticated,
  submitUserEmailAndPassword,
  submitNewUser,
  clearLastError,
} from '../actions/chatSettingsActions'

const ErrorModalWindow = asModalWindow(ErrorWindow)

class App extends React.Component {
  componentDidMount() {
    this.props.checkIsUserAuthenticated()
  }

  renderErrorWindow() {
    if (!this.props.lastError) return

    return (
      <ErrorModalWindow
        onOk={this.props.clearLastError}
        lastError={this.props.lastError}
      />
    )
  }

  renderMainContent() {
    if (this.props.isUserAuthenticated) {
      return <AppPanel />
    }

    return (
      <AuthenticationAndRegistrationWindow
        onAuthenticationSubmit={this.props.submitUserEmailAndPassword}
        onRegistrationSubmit={this.props.submitNewUser}
      />
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.renderErrorWindow()}
        {this.renderMainContent()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isUserAuthenticated: state.isUserAuthenticated,
    lastError: state.lastError,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkIsUserAuthenticated: () => dispatch(checkIsUserAuthenticated()),
    submitUserEmailAndPassword: (userEmail, userPassword) =>
      dispatch(submitUserEmailAndPassword(userEmail, userPassword)),
    submitNewUser: user => dispatch(submitNewUser(user)),
    clearLastError: () => dispatch(clearLastError()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
