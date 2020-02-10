import React from 'react'
import PropTypes from 'prop-types'

class RegistrationForm extends React.Component {

    state = {
        email: '',
        name: '',
        password: '',
    }

    onSubmit = (eventArg) => {
        eventArg.preventDefault()

        const { email, name, password } = this.state

        const user = {
            email,
            name,
            password,
        }

        this.props.onSubmit(user)

        this.setState({
            email: '',
            name: '',
            password: '',
        })
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
            <form onSubmit = { this.onSubmit } className = "reg-auth-form">
                <h3>New user registration</h3>
                <label>User email</label>
                <input
                    name = "userEmail"
                    placeholder = 'User email'
                    type = 'text'
                    value = { this.state.email }
                    onChange = { this.updateUserEmailValue }
                /><br />
                <label>User name</label>
                <input
                    name = 'userName'
                    placeholder = 'User name'
                    type = 'text'
                    value = { this.state.name }
                    onChange = { this.updateUserNameValue }
                /><br />
                <label>User password</label>
                <input
                    name = 'userPassword'
                    placeholder = 'User password'
                    type = 'text'
                    value = { this.state.password }
                    onChange = { this.updateUserPasswordValue }
                /><br />
                <button type = 'submit'>
                    Send new user registration data
                </button>
            </form>
        )
    }
}

RegistrationForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export { RegistrationForm }