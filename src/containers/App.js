import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import { asModalWindow } from '../components/ModalWindow/asModalWindow'
import AuthenticationAndRegistrationWindow from './AuthenticationAndRegistrationWindow/AuthenticationAndRegistrationWindow'
import { ErrorWindow } from '../components/ErrorWindow/ErrorWindow'
import AppPanel from './AppPanel/AppPanel'

import { connect } from 'react-redux'

import {
  checkIsUserAuthenticated,
  submitUserEmailAndPassword,
  submitNewUser,
  clearLastError,
  resetAuthenticationResult,
} from '../actions/chatSettingsActions'

const ErrorModalWindow = asModalWindow(ErrorWindow)

class App extends React.Component {
  componentDidMount() {
    const { isUserAuthenticated, checkIsUserAuthenticated } = this.props

    checkIsUserAuthenticated()

    if (isUserAuthenticated) {
      this.props.history.push('/chat')
    } else {
      this.props.history.push('/login')
    }
  }

  renderErrorWindow() {
    if (!this.props.lastError) return

    return (
      <ErrorModalWindow
        onOk={this.props.clearLastError}
        lastError={this.props.lastError}
      />
    )
  }

  renderMainContent() {
    return (
      <Switch>
        <Route
          exact
          path="/login"
          render={() => <AuthenticationAndRegistrationWindow />}
        />
        <Route path="/chat" component={AppPanel} />
      </Switch>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.renderErrorWindow()}
        {this.renderMainContent()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isUserAuthenticated: state.isUserAuthenticated,
    lastError: state.lastError,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkIsUserAuthenticated: () => dispatch(checkIsUserAuthenticated()),
    submitUserEmailAndPassword: (userEmail, userPassword) =>
      dispatch(submitUserEmailAndPassword(userEmail, userPassword)),
    submitNewUser: user => dispatch(submitNewUser(user)),
    clearLastError: () => dispatch(clearLastError()),
    onSignOut: () => dispatch(resetAuthenticationResult()),
  }
}

const AppWithRouter = withRouter(App)
export default connect(mapStateToProps, mapDispatchToProps)(AppWithRouter)
