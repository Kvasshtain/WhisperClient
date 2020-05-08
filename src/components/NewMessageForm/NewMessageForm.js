import React from 'react'
import PropTypes from 'prop-types'

import './NewMessageForm.sass'

class NewMessageForm extends React.Component {
  state = {
    newMessage: '',
  }

  onSubmit = event => {
    event.preventDefault()

    this.props.onSubmitNewMessage(this.state.newMessage)

    this.setState({
      newMessage: '',
    })
  }

  updateInputValue = eventArg => {
    this.setState({
      newMessage: eventArg.target.value,
    })
  }

  render() {
    return (
      <form className="newMessageForm" onSubmit={this.onSubmit}>
        <h4>+Message</h4>
        <input
          name="userMessage"
          placeholder="message text"
          type="text"
          value={this.state.newMessage}
          onChange={this.updateInputValue}
        />
        <button type="submit">Send message</button>
      </form>
    )
  }
}

NewMessageForm.propTypes = {
  onSubmitNewMessage: PropTypes.func.isRequired,
}

export { NewMessageForm }
