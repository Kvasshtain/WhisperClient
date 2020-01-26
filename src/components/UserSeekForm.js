import React from 'react'
import PropTypes from 'prop-types'

class UserSeekForm extends React.Component {

    state = {
        userSeekData: '',
    }

    onSubmit = (eventArg) => {
        eventArg.preventDefault()

        this.props.onSubmitUserSeekData(this.state.userSeekData)

        this.setState({
            searchQueryString: '',
        })
    }

    updateSearchQueryString = (eventArg) => {
        this.setState({
            userSeekData: eventArg.target.value
        })
    }

    render() {
        return (
            <form onSubmit = { this.onSubmit }>
                <h1>Search for a new member</h1>
                <label>Enter email</label>
                <input
                    name = "userEmail"
                    placeholder = 'User email'
                    type = 'text'
                    value = { this.state.userSeekData }
                    onChange = { this.updateSearchQueryString }
                /><br />
                <button type = 'submit'>
                    Find users
                </button>
            </form>
        )
    }
}

UserSeekForm.propTypes = {
    onSubmitUserSeekData: PropTypes.func.isRequired
}

export { UserSeekForm }