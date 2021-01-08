import React from 'react'
import PropTypes from 'prop-types'

import { AddFileForm } from './__AddFileForm/SpecialMessagesPreprocessorMenu-AddFileForm'

import './SpecialMessagesPreprocessorMenu.sass'

class SpecialMessagesPreprocessorMenu extends React.Component {
  render() {
    return (
      <div className="specialMessagesPreprocessorMenu">
        <h4>Add special messages preprocessor</h4>
        <button className="closeButton" onClick={this.props.onCancelClick}>
          X
        </button>
        <AddFileForm onSubmitFile={this.props.onSubmit} />
      </div>
    )
  }
}

SpecialMessagesPreprocessorMenu.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
}

export { SpecialMessagesPreprocessorMenu }
