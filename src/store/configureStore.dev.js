import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
// import api from '../middleware/api'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

import promise from 'redux-promise';
export let isMonitorAction;

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(promise, thunk, createLogger()),
      window.devToolsExtension ? window.devToolsExtension({
        getMonitor: (monitor) => { isMonitorAction = monitor.isMonitorAction; }
      }) : f => f
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
