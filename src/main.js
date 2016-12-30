import React from 'react'
import { render } from 'react-dom'
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router'


import Env from './env.json'

window.ReactDom = ReactDom;
window.React = React;
window.Env = Env;

console.log(window.Env)

import {
    AppContainer,
    LoginContainer,
    ResetPasswordContainer,
    ForgotPasswordContainer,
    ProjectOverviewContainer,
    ProjectContainer,
    AccountContainer
} from './containers';


import configureStore from './store/configureStore.dev.js';

import {store} from './store/index.js';
// const store = configureStore();
// window.store = store;

import {ROOT_HOST} from './config.js'

// // import Auth from './src/helpers/auth.js'
import RequireAuth from './containers/RequireAuth';

// import Localstore from './src/helpers/localstore.js'


// import {language} from './src/lang/index.js';
// window.lang = language.en;

	render((
		<Provider store={store}>
		  <Router history={hashHistory}>
            <Route path="/" component={LoginContainer} />
            <Route path="/forgetpwd" component={ForgotPasswordContainer} />
            <Route path="/resetpwd" component={ResetPasswordContainer} />
    		<Route path="/" component={AppContainer}>
    			<Route path="dashboard" component={ProjectOverviewContainer} />
    			<Route path="projects/:projectId" component={ProjectContainer} />
    			<Route path="project/add" component={ProjectContainer} />
                <Route path="account" component={AccountContainer} />
    		</Route>
		  </Router>
		</Provider>  
	), document.getElementById('root'))

