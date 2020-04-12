import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import wsMiddleware from '../middleware/webSocketMiddleware'

export default function configureStore(initialState) {
  return createStore(rootReducer, applyMiddleware(thunk, wsMiddleware))
}
