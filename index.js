import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router'

import Layout from './containers/Layout'
import LayoutSignup from './containers/LayoutSignup'
import LayoutLogin from './containers/LayoutLogin'
import LayoutFindMyOrg from './containers/LayoutFindMyOrg'

import Dashboard from './containers/Dashboard'
import OrganizationList from './containers/OrganizationListContainer'

import configureStore from './store/configureStore.js';

const store = configureStore();
window.store = store;

import {ROOT_HOST} from './config.js'

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
		        
		      
		    </Route>

		    <Route path="/login" component={LayoutLogin}>
		      
		    </Route>
		  </Router>
		</Provider>  
	), document.getElementById('root'))
}



