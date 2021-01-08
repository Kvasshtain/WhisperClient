import React from 'react'
import PropTypes from 'prop-types'

import './FileInput.sass'

class FileInput extends React.Component {
  state = {
    file: null,
    filePath: '',
  }

  updateFile = eventArg => {
    this.setState({
      file: eventArg.target.files[0],
      filePath: eventArg.target.value,
    })

    this.props.updateFile(eventArg)
  }

  renderFileName = () => {
    const { file } = this.state
    let fileName = ''

    if (file) fileName = file.name

    return <span>{fileName}</span>
  }

  render() {
    const { name } = this.props

    return (
      <div className="fileInput">
        <div>
          <span>{this.renderFileName()}</span>
        </div>
        <div>
          <label>
            <input
              name={name}
              type="file"
              value={this.state.filePath}
              onChange={this.updateFile}
            />
            <span>Open file</span>
          </label>
        </div>
      </div>
    )
  }
}

FileInput.propTypes = {
  name: PropTypes.string,
  updateFile: PropTypes.func.isRequired,
}

export { FileInput }
