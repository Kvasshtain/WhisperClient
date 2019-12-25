import React from 'react';
import { NewMessageInput } from '../components/NewMessageInput'
import MessageList from './MessageList'
import { connect } from 'react-redux';
import { sendNewMessage } from '../actions/messageListActions';
import './App.css';

class App extends React.Component {

  render() {

    return (
      <React.Fragment>
        <MessageList />
        <NewMessageInput
          onSubmitNewMessage = { this.props.sendNewMessage }
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wasMessageReceived: state.wasMessageReceived,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendNewMessage: (message) => dispatch(sendNewMessage(message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
