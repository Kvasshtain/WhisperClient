import React from 'react'
import PropTypes from 'prop-types'

class RegistrationForm extends React.Component {

    state = {
        email : '',
        name : '',
        password : '',
    }

    onSubmit = () => {
        this.props.onSubmit(this.state.email, this.state.name, this.state.password)
    }

    updateUserEmailValue = (eventArg) => {
        this.setState({
            email: eventArg.target.value
        })
    }

    updateUserNameValue = (eventArg) => {
        this.setState({
            name: eventArg.target.value
        })
    }

    updateUserPasswordValue = (eventArg) => {
        this.setState({
            password: eventArg.target.value
        })
    }

    render() {
        return (
            <div>
                <input type="text" onChange = { this.updateUserEmailValue } name = "userEmail"/>
                <input type="text" onChange = { this.updateUserNameValue } name = "userName"/>
                <input type="text" onChange = { this.updateUserPasswordValue } name = "userPassword"/>
                <button type="submit" onClick = { this.onSubmit }>Send new user registration data</button>
            </div>
        )
    }
}

RegistrationForm.propTypes = {
    onSubmit : PropTypes.func.isRequired
}

export { RegistrationForm }