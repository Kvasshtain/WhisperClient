import React from 'react'
import { NewChatForm } from '../components/NewChatForm'
import MessageList from './MessageList'
import ChatList from './ChatList'
import CurrentChatSettings from './CurrentChatSettings'
import { AuthenticationForm } from '../components/AuthenticationForm'
import { RegistrationForm } from '../components/RegistrationForm'
import { connect } from 'react-redux'
import { sendNewMessage } from '../actions/messageListActions'
import { submitUserNameAndPassword, submitNewUser, createNewChat } from '../actions/chatSettingsActions'
import '../App.css'

class App extends React.Component {

  renderChatListNewChatForm() {
    if (this.props.currentUser._id) {
      return (
        <React.Fragment>
          <ChatList />
          <NewChatForm
            onSubmitNewChat = { this.props.createNewChat }
            currentUserId = { this.props.currentUser._id }
          />
        </React.Fragment>
      ) 
    }
  }

  renderMessageList() {
    if (!this.props.currentUser._id) return
    if (!this.props.currentChat._id) return

    return (
        <MessageList sendNewMessage = { this.props.sendNewMessage } />
    )
  }

  renderMainContent() {
    if (this.props.isUserAuthenticated) {
      return (
        <React.Fragment>
          <h1>Curret user: { this.props.currentUser.name }</h1>
          {this.renderChatListNewChatForm()}
          <CurrentChatSettings/>
          {this.renderMessageList()}
        </React.Fragment>
      )
    }

    return (
      <AuthenticationForm
        onSubmit = { this.props.submitUserNameAndPassword }
      />
    )
  }

  render() {

    return (
      <React.Fragment>
        <RegistrationForm 
          onSubmit = { this.props.submitNewUser }
        />
        {this.renderMainContent()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentChat: state.currentChat,
    wasMessageReceived: state.wasMessageReceived,
    isUserAuthenticated: state.isUserAuthenticated,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewChat: (chatName, usersIds) => dispatch(createNewChat(chatName, usersIds)),
    sendNewMessage: (message) => dispatch(sendNewMessage(message)),
    submitUserNameAndPassword: (userEmail, userPassword) => dispatch(submitUserNameAndPassword(userEmail, userPassword)),
    submitNewUser: (userEmail, userName, userPassword) => dispatch(submitNewUser(userEmail, userName, userPassword)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
