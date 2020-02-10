import React from 'react'
import { connect } from 'react-redux'
import { AddToChatNewUserWindow } from '../components/AddToChatNewUserWindow'
import { findUsers, addNewUserToCurrentChat } from '../actions/chatSettingsActions'
import PropTypes from 'prop-types'

class CurrentChatSettings extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showAddedUserMenu: false,
        }
    }

    onAddUserButtonClick = () => {
        this.setState({
            showAddedUserMenu: true,
        })
    }

    addNewUserToCurrentChat = (user) => {
        this.setState({
            showAddedUserMenu: false,
        })

        this.props.addNewUserToCurrentChat(user)
    }

    cancelUserAdding = () => {
        this.setState({
            showAddedUserMenu: false,
        })
    }

    renderAddedUserWindow = () => {

        const { showAddedUserMenu } = this.state
        const { currentChat, findUsers, usersList } = this.props

        if (showAddedUserMenu) {
            return (
                <AddToChatNewUserWindow
                    findUsers = { findUsers }
                    usersList = { usersList }
                    onUserClick = { this.addNewUserToCurrentChat }
                    cancelUserAdding = { this.cancelUserAdding }
                />
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
                    { this.renderAddedUserWindow() }
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