import React from 'react'
import PropTypes from 'prop-types'

import './UserFrame.sass'

class UserFrame extends React.Component {
  onUserClick = () => {
    const { user } = this.props

    this.props.onUserClick(user)
  }

  render() {
    const { user } = this.props

    return (
      <div className="userFrame" onClick={this.onUserClick}>
        <span>{user.name}</span>
      </div>
    )
  }
}

UserFrame.propTypes = {
  chat: PropTypes.exact({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  onSelectUser: PropTypes.func,
}

export { UserFrame }
