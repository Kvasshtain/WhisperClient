import React from 'react'
import PropTypes from 'prop-types'

class AuthenticationForm extends React.Component {

    state = {
        email : '',
        password : ''
    }

    onSubmit = () => {
        this.props.onSubmit(this.state.email, this.state.password)
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
            <div>
                <input type="text" onChange = { this.updateUserEmailValue } name = "userEmail"/>
                <input type="text" onChange = { this.updateUserPasswordValue } name = "userPassword"/>
                <button type="submit" onClick = {this.onSubmit}>Send email and password</button>
            </div>
        )
    }
}

AuthenticationForm.propTypes = {
    onSubmit : PropTypes.func.isRequired
}

export { AuthenticationForm }