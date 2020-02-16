import React from 'react'
import { UserFrame } from './UserFrame'
import { UserSeekForm } from './UserSeekForm'
import PropTypes from 'prop-types'

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
      <div className="cover-div">
        <div className="modal-window">
          <UserSeekForm onSubmitUserSeekData={this.onSubmitUserSeekData} />
          {this.renderUsersList()}
          <button onClick={this.props.cancelUserAdding}>Cancel</button>
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
