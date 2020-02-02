import React from 'react'
import PropTypes from 'prop-types'

class NewChatForm extends React.Component {

    state = {
        name: '',
        users: [],
    }

    onSubmit = (event) => {
        event.preventDefault()

        this.props.onSubmitNewChat(this.state.name, [this.props.currentUserId])

        this.setState({
            name: '',
            users: [],
        })
    }

    updateChatNameValue = (eventArg) => {
        this.setState({
            name: eventArg.target.value
        })
    }

    render() {
        return (
            <form onSubmit = { this.onSubmit }>
                <h1>Create new chat</h1>
                <input
                    name = 'chatName'
                    placeholder = 'chat name'
                    type = 'text'
                    value = { this.state.name }
                    onChange = { this.updateChatNameValue }
                />
                <button type = "submit">
                    Create
                </button>
            </form>
        )
    }
}

NewChatForm.propTypes = {
    currentUserId: PropTypes.string.isRequired,
    onSubmitNewChat: PropTypes.func.isRequired,
}

export { NewChatForm }