import React from 'react'
import PropTypes from 'prop-types'

import './MessageList-ScrollDownButton.sass'

function ScrollDownButton(props) {
  const strToDecode = '&#11015'
  const parser = new DOMParser()
  const decodedString = parser.parseFromString(
    `<!doctype html><body>${strToDecode}`,
    'text/html'
  ).body.textContent

  return (
    <div className="scrollDownButton" onClick={props.onScrollDownClick}>
      {decodedString}
    </div>
  )
}

ScrollDownButton.propTypes = {
  text: PropTypes.string,
}

export { ScrollDownButton }
