import React, { Component } from 'react';
import { Link } from 'react-router';
// import { If, Then, Else } from 'react-if';

import Sidebar from './Sidebar'
import PagePanel from './PagePanel'
import OrganizationAdd from './OrganizationAdd'

import OrgUserSettingForm from './org/OrgUserSettingForm'
import OrgUserInviteForm from './org/OrgUserInviteForm'


import Auth from '../helpers/auth.js'
import OrgUserHelper from '../helpers/helper_org_user.js'
import Util from '../helpers/util'
import Localstore from '../helpers/localstore'


class OrganizationGeneral extends Component {
    constructor(props, context) {
        super(props, context);
        // this.currentOrg = Localstore.getItem('org');
    }

    componentWillMount() {
        // this.props.fetchOrgUsers(); 
    }

    render() {        
        return (

            <div>
                <PagePanel>
                    <div className="control-toolbar1">
                        <div className="left">
                            <span className="title">Settings</span>
                        </div>
                        <div className="middle">
                        </div>
                    </div>
                    <div className="general-setting">
                    <form className="form" ref='form' onSubmit={this.handleSubmit}>
                        <div className="col-md-12">
                            <div className="content border-bottom-dotted row">
                                <div className="col-md-2">
                                    <label className="control-label">Site Name</label>
                                </div>
                                <div className="col-md-3">
                                    <div className="control-label">Webbio</div>
                                    <a href={"#"}>Edit</a>
                                </div>
                            </div>
                            <div className="content border-bottom-dotted row">
                                <div className="col-md-2">
                                    <label className="control-label">Site Address</label>
                                    <div className="subtitle">Customize the site address, you can even use your own domain</div>
                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-success btn-xs">Custom domain in use</button>
                                    <div><a href={"#"}>pm.webbio.nl</a></div>
                                    <div><a href={"#"}>Edit</a></div>
                                </div>
                            </div>
                            <div className="content border-bottom-dotted row">
                                <div className="col-md-2">
                                    <label className="control-label">Show site name on login page</label>
                                </div>
                                <div className="col-md-3">
                                    <input type="checkbox" className="js-switch"  name="is_show_loginpage" id="is_show_loginpage" />
                                </div>
                            </div>
                            <div className="content border-bottom-dotted row">
                                <div className="col-md-2">
                                    <label className="control-label">Dashboard Message</label>
                                    <div className="subtitle">This is visible to all peoplewho log in to your project</div>
                                </div>
                                <div className="col-md-3">
                                    <div className="control-label">no message provided</div>
                                    <a href={"#"}>Edit</a>
                                </div>
                            </div>
                            <div className="content border-bottom-dotted row">
                                <div className="col-md-2">
                                    <label className="control-label">Dashboard Project List</label>
                                    <div className="subtitle">This is visible to all peoplewho log in to your project</div>
                                </div>
                                <div className="col-md-3">
                                    <a href={"#"}>Show Latest Projects</a>
                                </div>
                            </div>
                        </div>
                    </form>
                    </div>
                </PagePanel>
            </div>
        );
    }
}


export default OrganizationGeneral;
