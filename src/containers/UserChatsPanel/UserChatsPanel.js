import React from 'react'
import { connect } from 'react-redux'

import ChatList from '../ChatList/ChatList'
import { SimpleDataForm } from '../../components/SimpleDataForm/SimpleDataForm'

import { createNewChat } from '../../actions/chatSettingsActions'

import './UserChatsPanel.sass'

class UserChatsPanel extends React.Component {
  onSubmitNewChat = chatName => {
    this.props.createNewChat(chatName, [this.props.currentUser._id])
  }

  render() {
    return (
      <div className="userChatsPanel">
        <ChatList />
        <SimpleDataForm
          onSubmitNewData={this.onSubmitNewChat}
          caption="+Chat"
          name="chatName"
          placeholder="chat name"
          type="text"
          buttonCaption="Create"
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
