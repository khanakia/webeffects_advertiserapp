import React from 'react'
import { render } from 'react-dom'
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router'


import {store}   from './store/index_dev.js';
// window.store = store;

import {ROOT_HOST} from './config.js'

import Auth from './helpers/auth'
import Env from './env.json'
import language from './translation';
window.ReactDom = ReactDom;
window.React = React;
window.Env = Env;
window.Auth = Auth;
window.trans = language[Env.site_id];


moment.locale(Env.locale);
// console.log(window.Env)

import {
    RequireAuth,
    AppContainer,
    LoginContainer,
    ResetPasswordContainer,
    ForgotPasswordContainer,
    ProjectOverviewContainer,
    ProjectContainer,
    ProjectContainer1,
    ProjectNewContainer,
    AccountContainer,
    DemoContainer
} from './containers';




	render((
		<Provider store={store}>
		  <Router history={hashHistory}>
            <Route path="/" component={LoginContainer} />
            <Route path="/forgetpwd" component={ForgotPasswordContainer} />
            <Route path="/resetpwd" component={ResetPasswordContainer} />
            <Route path="/" component={RequireAuth(AppContainer)}>
                <Route path="demo" component={DemoContainer} />
    			<Route path="dashboard" component={ProjectOverviewContainer} />
    			<Route path="projects_old/:projectId" component={ProjectContainer} />
                <Route path="projects/:projectId" component={ProjectContainer1} />
                <Route path="project/add" component={ProjectContainer1} />
    			<Route path="project_old/add" component={ProjectNewContainer} />
                <Route path="account" component={AccountContainer} />
    		</Route>
		  </Router>
		</Provider>  
	), document.getElementById('root'))

