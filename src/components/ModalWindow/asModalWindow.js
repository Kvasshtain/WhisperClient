import React from 'react'

import './ModalWindow.sass'

function asModalWindow(Component) {
  return function(props) {
    return (
      <div className="modalWindow">
        <div>
          <Component {...props} />
        </div>
      </div>
    )
  }
}

export { asModalWindow }
