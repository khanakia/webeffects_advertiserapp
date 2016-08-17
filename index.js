import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router'

import Layout from './src/containers/LayoutContainer'
import LayoutSignup from './src/containers/LayoutSignup'
import LayoutLogin from './src/containers/LayoutLogin'
import LayoutFindMyOrg from './src/containers/LayoutFindMyOrg'
import LayoutProject from './src/containers/LayoutProject'

import Dashboard from './src/containers/Dashboard'
import OrganizationList from './src/containers/OrganizationListContainer'
import OrganizationUsers from './src/containers/OrganizationUsersContainer'

import OrganizationCompanies from './src/containers/OrganizationCompaniesContainer'
import TaskList from './src/containers/TaskListContainer'
import TagList from './src/containers/TagListContainer'

import PageDemo from './src/containers/LayoutDemo'

import PageTask from './src/containers/PageTask'

import ProjectsContainer from './src/containers/ProjectsContainer'
import ProjectOverviewContainer from './src/containers/ProjectOverviewContainer'
import ProjectMessagesContainer from './src/containers/ProjectMessagesContainer'
import ProjectFilesContainer from './src/containers/ProjectFilesContainer'
import ProjectPeopleContainer from './src/containers/ProjectPeopleContainer'
import ProjectTaskListsContainer from './src/containers/ProjectTaskListsContainer'
import ProjectTaskContainer from './src/containers/ProjectTaskContainer'
import ProjectTaskListContainer from './src/containers/ProjectTaskListContainer'


import configureStore from './src/store/configureStore.dev.js';

import {store} from './src/store/index.js';
// const store = configureStore();
// window.store = store;


import {ROOT_HOST} from './src/config.js'

import Auth from './src/helpers/auth.js'
import RequireAuth from './src/containers/RequireAuth';

// import Localstore from './src/helpers/localstore.js'


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
		       <Route path="organization/companies" component={OrganizationCompanies} />
		       <Route path="organization/peoples" component={OrganizationUsers} />
               <Route path="/tasklist/:tasklistId" component={TaskList}/>
               <Route path="settings/tags" component={TagList} />
               <Route path="task" component={PageTask} />
               <Route path="demo" component={PageDemo} />

               <Route path="projects" component={ProjectsContainer} />

               <Route path="projects/:projectId" component={LayoutProject}>
               		<Route path="overview" component={ProjectOverviewContainer} />
					<Route path="tasklists" component={ProjectTaskListsContainer} />
					<Route path="task/:taskId" component={ProjectTaskContainer} />
					<Route path="tasklist/:tasklistId" component={ProjectTaskListContainer} />
					<Route path="messages" component={ProjectMessagesContainer} />
					<Route path="files" component={ProjectFilesContainer} />
					<Route path="people" component={ProjectPeopleContainer} />
               </Route>
               
		    </Route>

		    <Route path="/login" component={LayoutLogin}>
		      
		    </Route>
		  </Router>
		</Provider>  
	), document.getElementById('root'))
}



