import React from 'react'
import PropTypes from 'prop-types'

import './SimpleDataForm.sass'

class SimpleDataForm extends React.Component {
  state = {
    newData: '',
  }

  onSubmit = event => {
    event.preventDefault()

    this.props.onSubmitNewData(this.state.newData)

    this.setState({
      newData: '',
    })
  }

  updateInputValue = eventArg => {
    this.setState({
      newData: eventArg.target.value,
    })
  }

  render() {
    const { caption, name, placeholder, type, buttonCaption } = this.props

    return (
      <form className="simpleDataForm" onSubmit={this.onSubmit}>
        <h4>{caption}</h4>
        <div>
          <input
            name={name}
            placeholder={placeholder}
            type={type}
            value={this.state.newData}
            onChange={this.updateInputValue}
          />
          <button type="submit">{buttonCaption}</button>
        </div>
      </form>
    )
  }
}

SimpleDataForm.propTypes = {
  onSubmitNewData: PropTypes.func.isRequired,
  caption: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  buttonCaption: PropTypes.string,
}

export { SimpleDataForm }
