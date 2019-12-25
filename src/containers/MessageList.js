import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { fetchMessagesList } from '../actions/messageListActions';
import { MessageFrame } from '../components/MessageFrame'

class MessageList extends React.Component {

    componentDidMount() {
        this.props.fetchMessagesList()
    }

    renderMessageList = () => {
        const { messages } = this.props;

        if (messages && messages.length) {
            return messages.map(function (item, index) {
                return (
                    <MessageFrame key={index} message={item.message} />
                )
            })
        }
    }

    render() {
        return (
            <div className="MessageList">
                {this.renderMessageList()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        wasMessageReceived: state.wasMessageReceived,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMessagesList: () => dispatch(fetchMessagesList()),
    }
}

MessageList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        message: PropTypes.exact({
            author: PropTypes.string.isRequired,
            time: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
            text: PropTypes.string.isRequired,
            wasMessageReceived: PropTypes.bool.isRequired
        })
    })
    )
}

export { MessageList }
export default connect(mapStateToProps, mapDispatchToProps)(MessageList);