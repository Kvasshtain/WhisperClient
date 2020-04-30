import React from 'react'
import { NewChatForm } from '../components/NewChatForm'
import MessageList from './MessageList/MessageList'
import ChatList from './ChatList'
import CurrentChatSettings from './CurrentChatSettings'
import { asModalWindow } from '../components/ModalWindow/asModalWindow'
import { AuthenticationAndRegistrationWindow } from '../components/AuthenticationAndRegistrationWindow/AuthenticationAndRegistrationWindow'
import { SettingsPanel } from '../components/SettingsPanel'
import { ErrorWindow } from '../components/ErrorWindow/ErrorWindow'
import { connect } from 'react-redux'
import { encryptAndSendNewMessage } from '../actions/messageListActions'

import {
  checkIsUserAuthenticated,
  submitUserEmailAndPassword,
  submitNewUser,
  createNewChat,
  resetAuthenticationResult,
  clearLastError,
} from '../actions/chatSettingsActions'

import './App.sass'

const ErrorModalWindow = asModalWindow(ErrorWindow)

class App extends React.Component {
  componentDidMount() {
    this.props.checkIsUserAuthenticated()
  }

  renderChatListNewChatForm() {
    if (this.props.currentUser._id) {
      return (
        <div>
          <ChatList />
          <NewChatForm
            onSubmitNewChat={this.props.createNewChat}
            currentUserId={this.props.currentUser._id}
          />
        </div>
      )
    }
  }

  renderMessageList() {
    if (!this.props.currentUser._id) return
    if (!this.props.currentChat._id) return

    return <MessageList sendNewMessage={this.props.sendNewMessage} />
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
            <div className="user-chats-panel">
              {this.renderChatListNewChatForm()}
            </div>
            <div className="current-chat-panel">{this.renderMessageList()}</div>
          </div>
          <div className="top-panel">
            <SettingsPanel
              className="settings-panel"
              onSignOut={this.onSignOut}
              currentUserName={this.props.currentUser.name}
            />
            <CurrentChatSettings className="current-chat-settings" />
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
        <div className="app-panel">{this.renderMainContent()}</div>
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
    createNewChat: (chatName, usersIds) =>
      dispatch(createNewChat(chatName, usersIds)),
    sendNewMessage: message => dispatch(encryptAndSendNewMessage(message)),
    submitUserEmailAndPassword: (userEmail, userPassword) =>
      dispatch(submitUserEmailAndPassword(userEmail, userPassword)),
    submitNewUser: user => dispatch(submitNewUser(user)),
    resetAuthenticationResult: () => dispatch(resetAuthenticationResult()),
    clearLastError: () => dispatch(clearLastError()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
