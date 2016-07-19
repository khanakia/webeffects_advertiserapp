import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Header extends Component {
  render() {
    

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
	            <a className="navbar-brand" href="#">Project name</a>
	          </div>
	          <div id="navbar" className="navbar-collapse collapse">
	            <ul className="nav navbar-nav">
	              <li><Link to="dashboard">Dashboard</Link></li>
	              <li><Link to="organization">Organization</Link></li>
	              <li><Link to="project">Everything</Link></li>
	              

	            </ul>
	            <ul className="nav navbar-nav navbar-right">
	              <li className="dropdown">
	                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-cog" aria-hidden="true"></span> <span className="caret"></span></a>
	                <ul className="dropdown-menu">
					  <li className="dropdown-header">Organization Administrator</li>
					  <li><a href="#">Organizations</a></li>
	                  <li><a href="#">General</a></li>
	                  <li><a href="#">Template</a></li>
	                  <li><a href="#">Logo</a></li>
	                  <li><a href="#">Color</a></li>
	                  <li><a href="#">Tags</a></li>
	                  <li role="separator" className="divider"></li>
	                  <li className="dropdown-header">Site Administration</li>
	                  <li><a href="#">Integration</a></li>
	                  <li><a href="#">Billing</a></li>
	                  <li><a href="#">Subscription</a></li>
	                </ul>
	              </li>
	              <li className="dropdown">
	              
		            <a className="dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		                <span className="user_title">Aman</span>
		                <i className="fa fa-chevron-down"></i>
		            </a>
		            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
		                <li className="li_img">
		                  <div className="imagecircle">
		                  </div>
		                  <div className="user_title">Aman Bansal</div>
		                </li>
		                <li role="separator" className="divider"></li>
		                <li><Link to="/app/dashboard"><i className="fa fa-bullhorn"></i>Update Status</Link></li>
		                <li><Link to="/app/organization"><i className="fa fa-check-square-o"></i>My Tasks</Link></li>
		                <li role="separator" className="divider"></li>
		                <li><Link to="/app/dashboard"><i className="fa fa-user"></i>Profile & Account</Link></li>
		                <li><a href="#" className="a_edit_my_detail" ><i className="fa fa-pencil"></i>Edit My Details</a></li>
		                <li role="separator" className="divider"></li>
		                <li><a href="/logout"><i className="fa fa-sign-out"></i>Logout</a></li>
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

