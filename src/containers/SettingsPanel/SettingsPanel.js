import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { resetAuthenticationResult } from '../../actions/chatSettingsActions'

import './SettingsPanel.sass'

class SettingsPanel extends React.Component {
  render() {
    return (
      <div className="settingsPanel">
        <span>{this.props.currentUser.name}</span>
        <button onClick={this.props.onSignOut}>Sign out</button>
      </div>
    )
  }
}

SettingsPanel.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  currentUserName: PropTypes.exact({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignOut: () => dispatch(resetAuthenticationResult()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPanel)
