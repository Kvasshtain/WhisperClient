import React from 'react'
import PropTypes from 'prop-types'

import { InputField } from '../../InputField/InputField'

import '../../SubmitButton/SubmitButton.sass'

class SeekForm extends React.Component {
  state = {
    userSeekData: '',
  }

  onSubmit = eventArg => {
    eventArg.preventDefault()

    this.props.onSubmitUserSeekData(this.state.userSeekData)

    this.setState({
      searchQueryString: '',
    })
  }

  updateSearchQueryString = eventArg => {
    this.setState({
      userSeekData: eventArg.target.value,
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <InputField
          caption="User email"
          name="userEmail"
          placeholder="User email"
          type="text"
          value={this.state.userSeekData}
          onChange={this.updateSearchQueryString}
        />
        <div align="center">
          <button className="submitButton" type="submit">
            Find users
          </button>
        </div>
      </form>
    )
  }
}

SeekForm.propTypes = {
  onSubmitUserSeekData: PropTypes.func.isRequired,
}

export { SeekForm }
