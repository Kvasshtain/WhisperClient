import React from 'react'
import { connect } from 'react-redux'
import { encryptAndSendNewMessage } from '../../actions/messageListActions'

import MessageList from '../MessageList/MessageList'
import { NewMessageForm } from '../../components/NewMessageForm/NewMessageForm'

import './CurrentChatPanel.sass'

class CurrentChatPanel extends React.Component {
  renderMessageList() {
    if (!this.props.currentUser._id) return
    if (!this.props.currentChat._id) return

    return (
      <React.Fragment>
        <MessageList />
        <NewMessageForm onSubmitNewMessage={this.props.sendNewMessage} />
      </React.Fragment>
    )
  }

  render() {
    return <div className="currentChatPanel">{this.renderMessageList()}</div>
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    currentChat: state.currentChat,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendNewMessage: message => dispatch(encryptAndSendNewMessage(message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentChatPanel)
