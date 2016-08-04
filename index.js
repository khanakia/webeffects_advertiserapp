import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router'

import Layout from './src/containers/Layout'
import LayoutSignup from './src/containers/LayoutSignup'
import LayoutLogin from './src/containers/LayoutLogin'
import LayoutFindMyOrg from './src/containers/LayoutFindMyOrg'

import Dashboard from './src/containers/Dashboard'
import OrganizationList from './src/containers/OrganizationListContainer'
import CompanyList from './src/containers/CompanyListContainer'

import configureStore from './src/store/configureStore.dev.js';

const store = configureStore();
// window.store = store;


import {ROOT_HOST} from './src/config.js'

import Auth from './src/helpers/auth.js'


// window.Auth = Auth;
// console.log(Auth.login());
console.log(Auth.attempt({email:'khanakia@gmail.com', password: 'admin'}).then(function(response){
	console.log('loggedin');
}));
// console.log(Auth.check());
// localStorage.setItem('token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdfaWQiOiJkZCIsInN1YiI6MSwiaXNzIjoiaHR0cDpcL1wvbG9jYWwucG1hXC9hcGlcL2F1dGhcL3NpZ25pbiIsImlhdCI6MTQ2ODkyMjE2MSwiZXhwIjoxNDcyNTIyMTYxLCJuYmYiOjE0Njg5MjIxNjEsImp0aSI6ImNjYzU1YTU4Y2YxYzg2NmU5ZmY1MjI2OTk0NGU1ZDIzIn0.UtbGlSk45WQMZ8C7iRY6Nwfy4xJ2Z7kAtQTJ4E911Yc");

// If user is on Root URL then render Find My Organization page
if(ROOT_HOST==window.location.host) {
   	render((
		<Provider store={store}>
		  <Router history={hashHistory}>
    		<Route path="/" component={LayoutFindMyOrg} />
    		<Route path="/signup" component={LayoutSignup} />
		  </Router>
		</Provider>  
	), document.getElementById('root'))
} else {

	render((
		<Provider store={store}>
		  <Router history={hashHistory}>
		    <Route path="/" component={Layout}>
		       <Route path="dashboard" component={Dashboard} />
		       <Route path="organization" component={OrganizationList} />
		       <Route path="company" component={CompanyList} />
		        
		      
		    </Route>

		    <Route path="/login" component={LayoutLogin}>
		      
		    </Route>
		  </Router>
		</Provider>  
	), document.getElementById('root'))
}



