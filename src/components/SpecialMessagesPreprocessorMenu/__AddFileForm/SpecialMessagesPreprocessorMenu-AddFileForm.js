import React from 'react'
import PropTypes from 'prop-types'

import { FileInput } from '../../FileInput/FileInput'

import './SpecialMessagesPreprocessorMenu-AddFileForm.sass'
import '../../SubmitButton/SubmitButton.sass'

class AddFileForm extends React.Component {
  state = {
    file: null,
  }

  onSubmit = event => {
    const { file } = this.state
    const { onSubmitFile } = this.props

    event.preventDefault()

    if (file) {
      onSubmitFile(file)
    }
  }

  updateMessagesPreprocessorFile = eventArg => {
    this.setState({
      file: eventArg.target.files[0],
    })
  }

  render() {
    return (
      <form className="addFileForm" onSubmit={this.onSubmit}>
        <FileInput
          name="messagesPreprocessorFile"
          updateFile={this.updateMessagesPreprocessorFile}
        />
        <div>
          <button className="submitButton" type="submit">
            Add
          </button>
        </div>
      </form>
    )
  }
}

AddFileForm.propTypes = {
  onSubmitFile: PropTypes.func.isRequired,
}

export { AddFileForm }
