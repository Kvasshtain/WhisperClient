import React from 'react'
import { connect } from 'react-redux'

import ChatList from '../ChatList/ChatList'
import { NewChatForm } from '../../components/NewChatForm/NewChatForm'

import { createNewChat } from '../../actions/chatSettingsActions'

import './UserChatsPanel.sass'

class UserChatsPanel extends React.Component {
  render() {
    return (
      <div className="userChatsPanel">
        <ChatList />
        <NewChatForm
          onSubmitNewChat={this.props.createNewChat}
          currentUserId={this.props.currentUser._id}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createNewChat: (chatName, usersIds) =>
      dispatch(createNewChat(chatName, usersIds)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserChatsPanel)
