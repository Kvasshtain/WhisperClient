import React from 'react';
import { NewMessageInput } from '../components/NewMessageInput'
import { MessageList } from '../components/MessageList'
import './App.css';

class App extends React.Component {

  state = {
    messageArray: []
  }

  onSubmitNewMessage=(message) => {
    console.log(message)
  }

  render() {
    return (
      <React.Fragment>
        <MessageList
          messages={this.state.messageArray}
        />
        <NewMessageInput
          onSubmitNewMessage={this.onSubmitNewMessage}
        />
      </React.Fragment>
    );
  }
}

export default App;
