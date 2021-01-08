import React from 'react'
import { withRouter } from 'react-router-dom'

import { TopPanel } from './__TopPanel/AppPanel-TopPanel'
import { MainPanel } from './__MainPanel/AppPanel-MainPanel'

import { connect } from 'react-redux'

import './AppPanel.sass'

class AppPanel extends React.Component {
  componentDidUpdate = () => {
    const { isUserAuthenticated, history } = this.props

    if (!isUserAuthenticated) {
      history.push('/login')
    }
  }

  render() {
    return (
      <div className="appPanel">
        <div className="mainPanelPlace">
          <MainPanel />
        </div>
        <div className="topPanelPlace">
          <TopPanel />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isUserAuthenticated: state.isUserAuthenticated,
  }
}

const AppPanelWithRouter = withRouter(AppPanel)
export default connect(mapStateToProps)(AppPanelWithRouter)
