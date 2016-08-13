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
import OrganizationUsers from './src/containers/OrganizationUsersContainer'

import CompanyList from './src/containers/CompanyListContainer'
import TaskList from './src/containers/TaskListContainer'
import TagList from './src/containers/TagListContainer'

import PageDemo from './src/containers/LayoutDemo'

import PageTask from './src/containers/PageTask'


import configureStore from './src/store/configureStore.dev.js';

import {store} from './src/store/index.js';
// const store = configureStore();
// window.store = store;


import {ROOT_HOST} from './src/config.js'

import Auth from './src/helpers/auth.js'
import RequireAuth from './src/containers/RequireAuth';

import Localstore from './src/helpers/localstore.js'


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
		    <Route path="/" component={RequireAuth(Layout)}>
		       <Route path="dashboard" component={Dashboard} />
		       <Route path="organization" component={OrganizationList} />
		       <Route path="organization/companies" component={CompanyList} />
		       <Route path="organization/peoples" component={OrganizationUsers} />
               <Route path="/tasklist/:tasklistId" component={TaskList}/>
               <Route path="settings/tags" component={TagList} />
               <Route path="task" component={PageTask} />
               <Route path="demo" component={PageDemo} />
               
		    </Route>

		    <Route path="/login" component={LayoutLogin}>
		      
		    </Route>
		  </Router>
		</Provider>  
	), document.getElementById('root'))
}



