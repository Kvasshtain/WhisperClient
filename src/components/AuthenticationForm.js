import React from 'react'
import PropTypes from 'prop-types'

class AuthenticationForm extends React.Component {

    state = {
        userName : '',
        userPassword : ''
    }

    onSubmit = () => {
        this.props.onSubmit(this.state.userName, this.state.userPassword)
    }

    updateUserNameValue = (eventArg) => {
        this.setState({
            userName: eventArg.target.value
        })
    }

    updateUserPasswordValue = (eventArg) => {
        this.setState({
            userPassword: eventArg.target.value
        })
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.updateUserNameValue} name="userName"/>
                <input type="text" onChange={this.updateUserPasswordValue} name="userPassword"/>
                <button type="submit" onClick = {this.onSubmit}>Send message</button>
            </div>
        )
    }
}

AuthenticationForm.propTypes = {
    onSubmit : PropTypes.func.isRequired
}

export {AuthenticationForm}