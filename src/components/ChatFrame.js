import React from 'react'
import PropTypes from 'prop-types'

class ChatFrame extends React.Component {
  onSelectChat = () => {
    const { chat } = this.props

    this.props.onSelectChat(chat)
  }

  renderUsersList = users => {
    if (users && users.length) {
      return users.map((item, index) => {
        return (
          <div key={index}>
            <p>{item.name}</p>
          </div>
        )
      })
    }
  }

  render() {
    const { chat } = this.props

    return (
      <div className="selected-item" onClick={this.onSelectChat}>
        <div>
          <h4>{chat.name}</h4>
        </div>
        <div>
          <p>Chat members:</p>
          <div>{this.renderUsersList(chat.users)}</div>
        </div>
      </div>
    )
  }
}

ChatFrame.propTypes = {
  chat: PropTypes.exact({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(
      PropTypes.exact({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  onSelectChat: PropTypes.func.isRequired,
}

export { ChatFrame }
