import React from 'react'
import PropTypes from 'prop-types'

import { InputField } from '../InputField/InputField'

import './AuthenticationAndRegistrationForm.sass'
import '../SubmitButton/SubmitButton.sass'
import './__Label/AuthenticationAndRegistrationForm-Label.sass'

class AuthenticationAndRegistrationForm extends React.Component {
  state = {
    email: '',
    name: '',
    password: '',
    isRegistrationMode: false,
  }

  onSubmit = eventArg => {
    eventArg.preventDefault()

    const { email, name, password, isRegistrationMode } = this.state
    const { onAuthenticationSubmit, onRegistrationSubmit } = this.props

    const user = {
      email,
      name,
      password,
    }

    if (isRegistrationMode) {
      onRegistrationSubmit(user)
    } else {
      onAuthenticationSubmit(email, password)
    }

    this.setState({
      email: '',
      name: '',
      password: '',
    })
  }

  updateUserEmailValue = eventArg => {
    this.setState({
      email: eventArg.target.value,
    })
  }

  updateUserNameValue = eventArg => {
    this.setState({
      name: eventArg.target.value,
    })
  }

  updateUserPasswordValue = eventArg => {
    this.setState({
      password: eventArg.target.value,
    })
  }

  changeMode = ({ target: { checked } }) => {
    this.setState({
      isRegistrationMode: checked,
    })
  }

  renderHeader = () => {
    let headerText

    if (this.state.isRegistrationMode) {
      headerText = 'New user registration'
    } else {
      headerText = 'Login'
    }

    return (
      <h3 className="authenticationAndRegistrationForm__Header">
        {headerText}
      </h3>
    )
  }

  renderLabel = () => {
    return (
      <div className="authenticationAndRegistrationForm-Label" align="center">
        <img src={require("../../resources/Whisper.png")}></img>
      </div>
    )
  }

  renderUserNameInputField = () => {
    if (this.state.isRegistrationMode) {
      return (
        <InputField
          caption="User name"
          name="userName"
          placeholder="User name"
          type="text"
          value={this.state.name}
          onChange={this.updateUserNameValue}
        />
      )
    }
  }

  renderSubmitButton = () => {
    let buttonText

    if (this.state.isRegistrationMode) {
      buttonText = 'Sign up'
    } else {
      buttonText = 'Sign in'
    }

    return (
      <button className="submitButton" type="submit">
        {buttonText}
      </button>
    )
  }

  render() {
    return (
      <div className="authenticationAndRegistrationForm">
        <input type="checkbox" name="changeMode" onClick={this.changeMode} />
        <span>Registration</span>
        <form onSubmit={this.onSubmit}>
          {this.renderLabel()}
          <div align="center">{this.renderHeader()}</div>
          {this.renderUserNameInputField()}
          <InputField
            caption="User email"
            name="userEmail"
            placeholder="User email"
            type="text"
            value={this.state.email}
            onChange={this.updateUserEmailValue}
          />
          <InputField
            caption="User password"
            name="userPassword"
            placeholder="User password"
            type="text"
            value={this.state.password}
            onChange={this.updateUserPasswordValue}
          />
          <div align="center">{this.renderSubmitButton()}</div>
        </form>
      </div>
    )
  }
}

AuthenticationAndRegistrationForm.propTypes = {
  onAuthenticationSubmit: PropTypes.func.isRequired,
  onRegistrationSubmit: PropTypes.func.isRequired,
}

export { AuthenticationAndRegistrationForm }
