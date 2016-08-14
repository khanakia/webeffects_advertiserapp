import React, { Component, PropTypes } from 'react'

import { Link, hashHistory } from 'react-router'


import Auth from '../helpers/auth.js'

import UserprofileForm from './UserprofileForm'
import Localstore from '../helpers/localstore.js'


export default class Header extends Component {
	logout = (e) => {
		e.preventDefault();
		Auth.logout()
		hashHistory.push('login')
	}
  
  render() {
  	console.log(Localstore.getItem('org'))
    return (
      	<header>
			
	      <nav className="navbar navbar-default">
	        <div className="container-fluid">
	          <div className="navbar-header">
	            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
	              <span className="sr-only">Toggle navigation</span>
	              <span className="icon-bar"></span>
	              <span className="icon-bar"></span>
	              <span className="icon-bar"></span>
	            </button>
	            <a className="navbar-brand" href="#">{Localstore.getItem('org').org_title}</a>
	          </div>
	          <div id="navbar" className="navbar-collapse collapse">
	            <ul className="nav navbar-nav">
	              <li><Link to="dashboard">Dashboard</Link></li>
	              <li><Link to="projects">Projects</Link></li>
	            </ul>
	            <ul className="nav navbar-nav navbar-right">
	              <li className="dropdown">
	                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-cog" aria-hidden="true"></span> <span className="caret"></span></a>
	                <ul className="dropdown-menu">
					  <li className="dropdown-header">Organization</li>
					  <li><Link to="organization">Organizations</Link></li>
					  <li><Link to="organization/companies">Company</Link></li>
					  <li><Link to="organization/peoples">Peoples</Link></li>

					  <li role="separator" className="divider"></li>
					  <li className="dropdown-header">Settings</li>
					  <li><Link to="settings/general">General</Link></li>
					  <li><Link to="settings/template">Template</Link></li>
					  <li><Link to="settings/logo">Logo</Link></li>
					  <li><Link to="settings/colortheme">Color Theme</Link></li>
	                  <li><Link to="settings/tags">Tags</Link></li>
	                  <li><Link to="settings/integration">Integration</Link></li>

	                  <li role="separator" className="divider"></li>
	                  <li className="dropdown-header">Billing / Subscription</li>
	                  <li><Link to="billing">Billing</Link></li>
	                  <li><Link to="subscription">Subscription</Link></li>
	                  
	                </ul>
	              </li>
	              <li className="dropdown">
		            <a className="dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		                <span className="user_title">Aman </span>
		                <i className="fa fa-chevron-down"></i>
		            </a>
		            <ul className="dropdown-menu userDetailsBox" aria-labelledby="dropdownMenu1">
		                <li className="li_img">
		                  <div className="imagecircle">
		                  	
		                  </div>
		                  <div className="user_title text-center">Aman Bansal</div>
		                </li>
		                <li role="separator" className="divider"></li>
		                <li><Link to="dashboard"><i className="fa fa-bullhorn"></i> Update Status</Link></li>
		                <li><Link to="organization"><i className="fa fa-check-square-o"></i> My Tasks</Link></li>
		                <li role="separator" className="divider"></li>
		                <li><Link to="dashboard"><i className="fa fa-user"></i> Profile & Account</Link></li>
		                <li><Link to="#" className="a_edit_my_detail" onClick={()=> UserprofileForm.showInPoup()} ><i className="fa fa-pencil"></i> Edit My Details</Link></li>
		                <li role="separator" className="divider"></li>
		                <li><a href="#" onClick={(e) => {this.logout(e)}}><i className="fa fa-sign-out"></i>Logout</a></li>
		            </ul>
	              </li>
	            </ul>
	          </div>
	        </div>
	      </nav>        
      </header>
    )
  }
}

