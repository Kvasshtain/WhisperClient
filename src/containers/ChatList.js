import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { fetchChatsList, changeCurrentChat } from '../actions/chatSettingsActions';
import { ChatFrame } from '../components/ChatFrame'

class ChatList extends React.Component {

    componentDidMount() {

        let userId = this.props.currentUser._id

        if (!userId) return

        this.props.fetchChatsList(userId)
    }

    renderChatList = () => {
        const { chatsList, changeCurrentChat } = this.props;

        if (chatsList && chatsList.length) {
            return chatsList.map(function (item) {
                return (
                    <ChatFrame onSelectChat = { changeCurrentChat } key = { item._id } chat = { item } />
                )
            })
        }
    }

    render() {
        return (
            <div className = "ChatList">
                {this.renderChatList()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chatsList: state.chatsList,
        currentUser: state.currentUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchChatsList: (userId) => dispatch(fetchChatsList(userId)),
        changeCurrentChat: (chat) => dispatch(changeCurrentChat(chat)),
    }
}

ChatList.propTypes = {
    chatsList: PropTypes.arrayOf(PropTypes.shape({
        chat: PropTypes.exact({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            users: PropTypes.arrayOf(PropTypes.shape({
                _id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                email: PropTypes.string.isRequired,
            })).isRequired,
        })
    })),
    changeCurrentChat: PropTypes.func.isRequired,
}

export { ChatList }
export default connect(mapStateToProps, mapDispatchToProps)(ChatList);