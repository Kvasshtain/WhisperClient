import React from 'react'
import PropTypes from 'prop-types'

class NewMessageInput extends React.Component {

    state = {
        newMessage: ''
    }

    onSubmit = (event) => {
        event.preventDefault()
        
        this.props.onSubmitNewMessage(this.state.newMessage)

        this.setState({
            newMessage: ''
        })
    }

    updateInputValue = (eventArg) => {
        this.setState({
            newMessage: eventArg.target.value
        })
    }

    render() {
        return (
            <form onSubmit = { this.onSubmit }>
                <h1>Send new message</h1>
                <input
                    name = 'userMessage'
                    placeholder = 'message text'
                    type = 'text'
                    value = { this.state.newMessage }
                    onChange = { this.updateInputValue }
                />
                <button type = 'submit'>
                    Send message
                </button>
            </form>
        )
    }
}

NewMessageInput.propTypes = {
    onSubmitNewMessage: PropTypes.func.isRequired
}

export { NewMessageInput }