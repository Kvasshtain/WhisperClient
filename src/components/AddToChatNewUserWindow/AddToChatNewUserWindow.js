import React from 'react'
import { UserFrame } from '../UserFrame/UserFrame'
import { SeekForm } from './__SeekForm/AddToChatNewUserWindow-SeekForm'
import PropTypes from 'prop-types'

import './AddToChatNewUserWindow.sass'
import '../CloseButton/CloseButton.sass'
import './__UsersList/AddToChatNewUserWindow-UsersList.sass'

class AddToChatNewUserWindow extends React.Component {
  onSubmitUserSeekData = userSeekData => {
    this.props.findUsers(userSeekData)
  }

  renderUsersList = () => {
    const { usersList, onUserClick } = this.props

    if (usersList && usersList.length) {
      return usersList.map(function(item) {
        return (
          <UserFrame onUserClick={onUserClick} key={item._id} user={item} />
        )
      })
    }
  }

  render() {
    return (
      <div className="addToChatNewUserWindow">
        <h4>Search for a new member</h4>
        <button className="closeButton" onClick={this.props.onCancelClick}>
          X
        </button>
        <SeekForm onSubmitUserSeekData={this.onSubmitUserSeekData} />
        <div className="addToChatNewUserWindow-UsersList">
          {this.renderUsersList()}
        </div>
      </div>
    )
  }
}

AddToChatNewUserWindow.propTypes = {
  usersList: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.exact({
        _id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }),
    })
  ),
  findUsers: PropTypes.func.isRequired,
  onUserClick: PropTypes.func.isRequired,
  cancelUserAdding: PropTypes.func.isRequired,
}

export { AddToChatNewUserWindow }
