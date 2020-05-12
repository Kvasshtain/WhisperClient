import React from 'react'
import CurrentChatPanel from './CurrentChatPanel/CurrentChatPanel'
import UserChatsPanel from './UserChatsPanel/UserChatsPanel'
import CurrentChatSettings from './CurrentChatSettings/CurrentChatSettings'
import SettingsPanel from './SettingsPanel/SettingsPanel'
import { asModalWindow } from '../components/ModalWindow/asModalWindow'
import { AuthenticationAndRegistrationWindow } from '../components/AuthenticationAndRegistrationWindow/AuthenticationAndRegistrationWindow'
import { ErrorWindow } from '../components/ErrorWindow/ErrorWindow'

import { connect } from 'react-redux'
import { encryptAndSendNewMessage } from '../actions/messageListActions'

import {
  checkIsUserAuthenticated,
  submitUserEmailAndPassword,
  submitNewUser,
  resetAuthenticationResult,
  clearLastError,
} from '../actions/chatSettingsActions'

import './App.sass'

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

  onSignOut = () => {
    this.props.resetAuthenticationResult()
  }

  renderMainContent() {
    if (this.props.isUserAuthenticated) {
      return (
        <React.Fragment>
          <div className="main-panel">
            <UserChatsPanel />
            <CurrentChatPanel />
          </div>
          <div className="top-panel">
            <SettingsPanel />
            <CurrentChatSettings />
          </div>
        </React.Fragment>
      )
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
        <div className="appPanel">{this.renderMainContent()}</div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    currentChat: state.currentChat,
    wasMessageReceived: state.wasMessageReceived,
    isUserAuthenticated: state.isUserAuthenticated,
    lastError: state.lastError,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkIsUserAuthenticated: () => dispatch(checkIsUserAuthenticated()),
    sendNewMessage: message => dispatch(encryptAndSendNewMessage(message)),
    submitUserEmailAndPassword: (userEmail, userPassword) =>
      dispatch(submitUserEmailAndPassword(userEmail, userPassword)),
    submitNewUser: user => dispatch(submitNewUser(user)),
    resetAuthenticationResult: () => dispatch(resetAuthenticationResult()),
    clearLastError: () => dispatch(clearLastError()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
