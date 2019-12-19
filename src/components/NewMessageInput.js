import React from 'react'
import PropTypes from 'prop-types'

class NewMessageInput extends React.Component {

    state = {
        inputValue : ''
    }

    onSubmit = () => {
        this.props.onSubmitNewMessage(this.state.inputValue)
    }

    updateInputValue = (eventArg) => {
        this.setState({
            inputValue: eventArg.target.value
        })
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.updateInputValue} name="userMessage" />
                <button type="submit" onClick = {this.onSubmit}>Send message</button>
            </div>
        )
    }
}

NewMessageInput.propTypes = {
    onSubmitNewMessage : PropTypes.func.isRequired
}

export {NewMessageInput}