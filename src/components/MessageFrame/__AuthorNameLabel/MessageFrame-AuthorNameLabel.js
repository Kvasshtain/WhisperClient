import React from 'react'
import PropTypes from 'prop-types'

import './MessageFrame-AuthorNameLabel.sass'

function AuthorNameLabel(props) {
  return (
    <span className="messageFrame-AuthorNameLabel">{props.authorName}</span>
  )
}

AuthorNameLabel.propTypes = {
  authorName: PropTypes.string,
}

export { AuthorNameLabel }
