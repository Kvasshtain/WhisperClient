import React from 'react'
import { connect } from 'react-redux'
import { UserFrame } from '../components/UserFrame'
import { UserSeekForm } from '../components/UserSeekForm'
import { findUsers, addNewUserToCurrentChat } from '../actions/chatSettingsActions'
import PropTypes from 'prop-types'

class CurrentChatSettings extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showAddedUserMenu: false,
        }
    }

    onSubmitUserSeekData = (userSeekData) => {
        this.props.findUsers(userSeekData)
    }

    onAddUserButtonClick = () => {
        this.setState({
            showAddedUserMenu: true,
        })
    }

    onUserClick = (user) => {
        this.setState({
            showAddedUserMenu: false,
        })

        this.props.addNewUserToCurrentChat(user)
    }

    renderUsersList = () => {
        const { usersList } = this.props
        const onUserClick = this.onUserClick

        if (usersList && usersList.length) {
            return usersList.map(function (item) {
                return (
                    <UserFrame onUserClick = { onUserClick } key = { item._id } user = { item } />
                )
            })
        }
    }

    renderAddedUserMenu = () => {

        const { showAddedUserMenu } = this.state
        const { currentChat } = this.props

        if (showAddedUserMenu) {
            return (
                <div className = "coverDiv">
                    <div className = "modalWindow">
                        <UserSeekForm onSubmitUserSeekData = { this.onSubmitUserSeekData } />
                        {this.renderUsersList()}
                    </div>
                </div>
            )
        }

        if (currentChat._id) {
            return (
                <button onClick = { this.onAddUserButtonClick }>
                    Add new user to chat
                </button>
            )
        }
    }

    render() {
        return (
                <div>
                    <span>Chat: { this.props.currentChat.name }</span>
                    { this.renderAddedUserMenu() }
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentChat: state.currentChat,
        usersList: state.usersList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        findUsers: (userSeekData) => dispatch(findUsers(userSeekData)),
        addNewUserToCurrentChat: (user) => dispatch(addNewUserToCurrentChat(user)),
    }
}

CurrentChatSettings.propTypes = {
    usersList: PropTypes.arrayOf(PropTypes.shape({
        user: PropTypes.exact({
            _id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
        })
    })),
    currentChat: PropTypes.exact({
        _id: PropTypes.string,
        name: PropTypes.string,
        users: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
        })),
    }),
    findUsers: PropTypes.func.isRequired,
    addNewUserToCurrentChat: PropTypes.func.isRequired,
}

export { CurrentChatSettings }
export default connect(mapStateToProps, mapDispatchToProps)(CurrentChatSettings)