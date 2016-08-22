import React, { Component } from 'react';
import { connect } from 'react-redux'

import configureStore from './configureStore.dev.js';
export const store = configureStore();

// Custom Connect to Passing The Store Down Explicitly Via Props
// https://github.com/reactjs/react-redux/issues/390
export function connectWithStore(WrappedComponent, ...args) {
    var ConnectedWrappedComponent = connect(...args)(WrappedComponent)
    return function(props) {
        return <ConnectedWrappedComponent {...props }
        store = { store }
        />
    }
}