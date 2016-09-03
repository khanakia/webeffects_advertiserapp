import React, { Component, PropTypes } from 'react'

import { Link, hashHistory } from 'react-router'


import Auth from '../helpers/auth'
import PopupHelper from '../helpers/helper_popup'

import UserProfileEditForm from './other/UserProfileEditForm'
// import ChangePassword from './other/ChangePassword'
// import Localstore from '../helpers/localstore'

// import LogoForm from './UploadPopupForm'
import {ROOT_URL, API_URL_UPLOAD_USER_PROFILE_IMAGE } from '../config.js'


export default class Header extends Component {

	constructor(props) {
		super(props)
		// this.currentOrg = Localstore.getItem('org');
		// Auth.updateCurrentOrg()
		// this.user = Localstore.getItem('user');
	}

	logout = (e) => {
		e.preventDefault();
		Auth.logout()
		hashHistory.push('/')
	}

    // openPopuplogo(data, uploadurl, e) {
    //     LogoForm.showInPoup(data,uploadurl,1);
    //     return false;
    // }

    uploadUserProfileImage(e) {
    	e.preventDefault();
    	PopupHelper.showUploadImageControl({uploadUrl:API_URL_UPLOAD_USER_PROFILE_IMAGE, object_type: 'user', object_id: this.props.current_user.id, image: this.props.current_user.profile_image_url})
    }

    updateProfile(e) {
    	e.preventDefault()
		PopupHelper.showUserProfileEditForm({data : this.props.current_user})
    }

    changePassword(e) {
    	e.preventDefault()
		PopupHelper.showChangePasswordForm({})
    }

	render() {
		var avtarStyle = {
            backgroundImage: "url('" + this.props.current_user.profile_image_url + "')",
        }

		return (
			<header>

				<nav className="navbar navbar-inverse">
					<div className="container-fluid">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<a className="navbar-brand" href="#">{this.props.current_org.name}</a>
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
										<li><Link to="organization"><i className="fa fa-sitemap"></i> Organizations</Link></li>

										{(this.props.current_org.permissions.org_can_update ||  this.props.current_org.permissions.can_manage_people_companies)
											? <li><Link to="organization/companies"><i className="fa fa-building"></i> Company</Link></li> : ''}
										{(this.props.current_org.permissions.org_can_update ||  this.props.current_org.permissions.can_manage_people_companies)
											? <li><Link to="organization/peoples"><i className="fa fa-users"></i> Peoples</Link></li> : ''}

										<li role="separator" className="divider"></li>
										<li className="dropdown-header">Settings</li>
										{/*<li><Link to="settings/general">General</Link></li>*/}
										<li><Link to="settings/template"><i className="fa fa-users"></i> Template</Link></li>
										<li><Link to="settings/tags"><i className="fa fa-tags"></i> Tags</Link></li>

										<li role="separator" className="divider"></li>
										<li className="dropdown-header">Billing / Subscription</li>
										<li><Link to="billing"><i className="fa fa-money"></i> Billing</Link></li>
										<li><Link to="subscription"><i className="fa fa-subscript"></i> Subscription</Link></li>
									</ul>
								</li>
								<li className="dropdown">
									<a className="dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
										<span className="user_title ">{this.props.current_user.fullname} </span>
										<i className="fa fa-chevron-down pl5"></i>
									</a>
									<ul className="dropdown-menu userDetailsBox" aria-labelledby="dropdownMenu1">
										<li className="li_img">
											<div className="useravtarCt">
												<a className="user-avtar-link" href="javascript:void(0);" title="Change Avtar" onClick={(e)=> this.uploadUserProfileImage(e)}>
													<div className="user-avtar" style={avtarStyle}></div>
													<i className="fa fa-image"></i>
												</a>
											</div>
											<div className="user_title text-center">{this.props.current_user.first_name + ' ' + this.props.current_user.last_name}</div>
											<div className="text-center fs12">{this.props.current_user.email}</div>
										</li>
										<li role="separator" className="divider"></li>
										<li><Link to="organization"><i className="fa fa-check-square-o"></i> My Tasks</Link></li>
										{/*<li><Link to="dashboard"><i className="fa fa-user"></i> Profile & Account</Link></li>*/}
										<li><Link to="#" className="a_edit_my_detail" onClick={(e)=> this.updateProfile(e)} ><i className="fa fa-pencil"></i> Edit My Details</Link></li>
										<li><Link to="#" className="change_password" onClick={(e) => this.changePassword(e)} ><i className="fa fa-lock"></i> Change Password</Link></li>
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
