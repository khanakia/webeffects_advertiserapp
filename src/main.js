import React from 'react'
import { render } from 'react-dom'
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router'

import Auth from './helpers/auth'
import Env from './env.json'

window.ReactDom = ReactDom;
window.React = React;
window.Env = Env;
window.Auth = Auth;

// console.log(window.Env)

import {
    RequireAuth,
    AppContainer,
    LoginContainer,
    ResetPasswordContainer,
    ForgotPasswordContainer,
    ProjectOverviewContainer,
    ProjectContainer,
    AccountContainer,
    DemoContainer
} from './containers';


import configureStore from './store/configureStore.dev.js';

import {store} from './store/index.js';
// const store = configureStore();
// window.store = store;

import {ROOT_HOST} from './config.js'

// import {language} from './src/lang/index.js';
// window.lang = language.en;

	render((
		<Provider store={store}>
		  <Router history={hashHistory}>
            <Route path="/" component={LoginContainer} />
            <Route path="/forgetpwd" component={ForgotPasswordContainer} />
            <Route path="/resetpwd" component={ResetPasswordContainer} />
            <Route path="/" component={RequireAuth(AppContainer)}>
                <Route path="demo" component={DemoContainer} />
    			<Route path="dashboard" component={ProjectOverviewContainer} />
    			<Route path="projects/:projectId" component={ProjectContainer} />
    			<Route path="project/add" component={ProjectContainer} />
                <Route path="account" component={AccountContainer} />
    		</Route>
		  </Router>
		</Provider>  
	), document.getElementById('root'))

