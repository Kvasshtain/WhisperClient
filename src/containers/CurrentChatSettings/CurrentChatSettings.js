import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { asModalWindow } from '../../components/ModalWindow/asModalWindow'
import { AddToChatNewUserWindow } from '../../components/AddToChatNewUserWindow/AddToChatNewUserWindow'
import { SpecialMessagesPreprocessorMenu } from '../../components/SpecialMessagesPreprocessorMenu/SpecialMessagesPreprocessorMenu'
import {
  findUsers,
  addNewUserToCurrentChat,
  addNewSpecialMessagesPreprocessor,
} from '../../actions/chatSettingsActions'

import './CurrentChatSettings.sass'

const AddToChatNewUserModalWindow = asModalWindow(AddToChatNewUserWindow)
const SpecialMessagesPreprocessorModalWindow = asModalWindow(
  SpecialMessagesPreprocessorMenu
)

class CurrentChatSettings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showAddedUserMenu: false,
      showSpecialMessagesPreprocessorMenu: false,
    }
  }

  onAddUserButtonClick = () => {
    this.setState({
      showAddedUserMenu: true,
    })
  }

  onAddSpecialMessagesPreprocessorButtonClick = () => {
    this.setState({
      showSpecialMessagesPreprocessorMenu: true,
    })
  }

  addNewUserToCurrentChat = user => {
    this.cancelUserAdding()
    this.props.addNewUserToCurrentChat(user)
  }

  cancelUserAdding = () => {
    this.setState({
      showAddedUserMenu: false,
    })
  }

  addNewSpecialMessagesPreprocessor = preprocessorFunctionString => {
    this.cancelSpecialMessagesPreprocessorAdding()
    this.props.addNewSpecialMessagesPreprocessor(preprocessorFunctionString)
  }

  cancelSpecialMessagesPreprocessorAdding = () => {
    this.setState({
      showSpecialMessagesPreprocessorMenu: false,
    })
  }

  renderAddedUserWindow = () => {
    const {
      showAddedUserMenu,
      showSpecialMessagesPreprocessorMenu,
    } = this.state
    const { currentChat, findUsers, usersList } = this.props

    if (showAddedUserMenu) {
      return (
        <AddToChatNewUserModalWindow
          findUsers={findUsers}
          usersList={usersList}
          onUserClick={this.addNewUserToCurrentChat}
          onCancelClick={this.cancelUserAdding}
        />
      )
    }

    if (showSpecialMessagesPreprocessorMenu) {
      return (
        <SpecialMessagesPreprocessorModalWindow
          currentChat={currentChat}
          onSubmit={this.addNewSpecialMessagesPreprocessor}
          onCancelClick={this.cancelSpecialMessagesPreprocessorAdding}
        />
      )
    }

    if (currentChat._id) {
      return (
        <React.Fragment>
          <button onClick={this.onAddUserButtonClick}>
            Add new user to chat
          </button>
          <button onClick={this.onAddSpecialMessagesPreprocessorButtonClick}>
            Add special messages preprocessor
          </button>
        </React.Fragment>
      )
    }
  }

  render() {
    return (
      <div className="currentChatSettings">
        <span>Chat: {this.props.currentChat.name}</span>
        {this.renderAddedUserWindow()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentChat: state.currentChat,
    usersList: state.usersList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    findUsers: userSeekData => dispatch(findUsers(userSeekData)),
    addNewUserToCurrentChat: user => dispatch(addNewUserToCurrentChat(user)),
    addNewSpecialMessagesPreprocessor: file =>
      dispatch(addNewSpecialMessagesPreprocessor(file)),
  }
}

CurrentChatSettings.propTypes = {
  usersList: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.exact({
        _id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }),
    })
  ),
  currentChat: PropTypes.exact({
    _id: PropTypes.string,
    name: PropTypes.string,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      })
    ),
    forwardPreprocessorFunction: PropTypes.func,
    backwardPreprocessorFunction: PropTypes.func,
  }),
  findUsers: PropTypes.func.isRequired,
  addNewUserToCurrentChat: PropTypes.func.isRequired,
}

export { CurrentChatSettings }
export default connect(mapStateToProps, mapDispatchToProps)(CurrentChatSettings)
