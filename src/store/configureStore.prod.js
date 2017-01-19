import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import api from '../middleware/api'
import rootReducer from '../reducers'
import promise from 'redux-promise';
export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(promise, thunk)
  )
}