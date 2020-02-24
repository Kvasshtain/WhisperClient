import React from 'react'
import PropTypes from 'prop-types'

class SpecialMessagesPreprocessorMenu extends React.Component {
  state = {
    file: null,
    filePath: '',
  }

  onSubmit = event => {
    const { file } = this.state
    const { onSubmit } = this.props

    event.preventDefault()

    if (file) {
      onSubmit(file)
    }
  }

  updateMessagesPreprocessorFile = eventArg => {
    this.setState({
      file: eventArg.target.files[0],
      filePath: eventArg.target.value,
    })
  }

  render() {
    return (
      <div className="cover-div">
        <div className="modal-window">
          <form onSubmit={this.onSubmit}>
            <h4>+Chat</h4>
            <input
              name="messagesPreprocessorFile"
              type="file"
              value={this.state.filePath}
              onChange={this.updateMessagesPreprocessorFile}
            />
            <button type="submit">Add special messages preprocessor</button>
            <button onClick={this.props.onCancelClick}>Cancel</button>
          </form>
        </div>
      </div>
    )
  }
}

SpecialMessagesPreprocessorMenu.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancelClick: PropTypes.string,
}

export { SpecialMessagesPreprocessorMenu }
