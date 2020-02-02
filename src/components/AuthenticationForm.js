import React from 'react'
import PropTypes from 'prop-types'

class AuthenticationForm extends React.Component {

    state = {
        email: '',
        password: '',
    }

    onSubmit = (event) => {
        event.preventDefault()

        this.props.onSubmit(this.state.email, this.state.password)

        this.setState({
            email: '',
            password: '',
        })
    }

    updateUserEmailValue = (eventArg) => {
        this.setState({
            email: eventArg.target.value
        })
    }

    updateUserPasswordValue = (eventArg) => {
        this.setState({
            password: eventArg.target.value
        })
    }

    render() {
        return (
            <form onSubmit = { this.onSubmit } className = "regAuthForm">
                <h3>Login</h3>
                <label>User email</label>
                <input
                    name = 'userEmail'
                    placeholder='User email'
                    type = 'text'
                    value = { this.state.email }
                    onChange = { this.updateUserEmailValue }
                /><br />
                <label>User password</label>
                <input
                    name = 'userPassword'
                    placeholder = 'User password'
                    type = 'text'
                    value = { this.state.password }
                    onChange = { this.updateUserPasswordValue }
                /><br />
                <button type = "submit">
                    Submit
                </button>
            </form>
        )
    }
}

AuthenticationForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export { AuthenticationForm }