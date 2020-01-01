import React from 'react'
import { NewMessageInput } from '../components/NewMessageInput'
import MessageList from './MessageList'
import { AuthenticationForm } from '../components/AuthenticationForm'
import { RegistrationForm } from '../components/RegistrationForm'
import { connect } from 'react-redux'
import { sendNewMessage } from '../actions/messageListActions'
import { submitUserNameAndPassword, submitNewUser } from '../actions/chatSettingsActions'
import './App.css'

class App extends React.Component {

  renderMainContent() {
    if (this.props.isUserAuthenticated) {
      return (
        <React.Fragment>
          <MessageList />
          <NewMessageInput
            onSubmitNewMessage = { this.props.sendNewMessage }
          />
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
    wasMessageReceived: state.wasMessageReceived,
    isUserAuthenticated: state.isUserAuthenticated,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendNewMessage: (message) => dispatch(sendNewMessage(message)),
    submitUserNameAndPassword: (userEmail, userPassword) => dispatch(submitUserNameAndPassword(userEmail, userPassword)),
    submitNewUser: (userEmail, userName, userPassword) => dispatch(submitNewUser(userEmail, userName, userPassword)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
