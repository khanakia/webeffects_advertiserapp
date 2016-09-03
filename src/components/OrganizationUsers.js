import React, { Component } from 'react';
import { Link } from 'react-router';
// import { If, Then, Else } from 'react-if';

import Sidebar from './Sidebar'
import PagePanel from './PagePanel'
import OrganizationAdd from './OrganizationAdd'

import OrgUserSettingForm from './org/OrgUserSettingForm'
import OrgUserPermissionForm from './org/OrgUserPermissionForm'
import OrgUserInviteForm from './org/OrgUserInviteForm'

import {Auth, Util, OrgUserHelper} from '../helpers'
import PopupHelper from '../helpers/helper_popup'

class OrganizationUsers extends Component {
    constructor(props, context) {
        super(props, context);
        // this.currentOrg = Localstore.getItem('org');
    }

    componentWillMount() {
        this.props.fetchOrgUsers();
    }

    renderList(orgusers) {
        if(orgusers.error) {
            Auth.updateCurrentOrg().then(function(response){
                // window.location.href = "/";
            })
            return false;
        }
        return orgusers.map((orguser) => {
            
            return (
                <li className="" key={orguser.id}>
                    <div className="d-table w100">
                        <div className="">
                            
                                <div className="image text-center mb10">
                                    <div className="avatar d-inline-block" style={{backgroundImage: "url('" + orguser.user.profile_image_url + "')" }}>
                                    </div>
                                </div>
                                <div className="mb10">
                                    <h4 className="list-group-item-heading">
                                        {orguser.user.fullname}
                                        <div className="dropdown d-inline-block">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"><i className="fa fa-chevron-down"></i></a>
                                            <ul className="dropdown-menu dropdown-menu-right">
                            <li>
                                {(this.props.current_org.permissions.org_can_update && !orguser.permissions.is_org_owner) ?
                                        <a href="#" title="Remove User" onClick={(e)=> this.removeUser(orguser,e)} ><i className="fa fa-trash"></i>Remove User</a>
                                    : ''
                                }
                            </li>
                            <li>
                                {(this.props.current_org.permissions.org_can_update && !orguser.permissions.is_org_owner) ?
                                        <a href="#" title="Edit User Permissions" onClick={(e)=> this.editUserPermission(orguser,e)} ><i className="fa fa-cogs"></i>Edit User Permissions</a>
                                    : ''
                                }
                            </li>                            
                            <li>
                                {this.props.current_org.permissions.org_can_update ?
                                    <a href="#" title="Edit User Settings" onClick={(e)=> this.editUserSetting(orguser,e)} ><i className="fa fa-gear"></i>Edit User Settings</a>
                                    : ''
                                }
                            </li>
                                            </ul>
                                        </div>
                                    </h4>
                                    <div className="position ">{orguser.job_title}</div>
                                    <div className="company ">{orguser.company ? orguser.company.company_title : ''}</div>
                                </div>
                            
                                { orguser.user.email ?
                                    <span className="d-block mb5"><a href={"mailto:"+orguser.user.email}>{orguser.user.email}</a></span>
                                    : ''
                                }    
                        </div>
                    

                        <div className="badges">
                                {Util.badgetOwner((this.props.current_org.created_by_user_id==orguser.user_id))}
                                {Util.badgeIsAdmin(orguser.permissions.is_admin)}
                        </div>

                    </div>
                </li>
            );
        });
    }

    onDataUpdate(data) {
        console.log('onDataUpdate', data);
    }

    editUserSetting(data, e) {
        OrgUserSettingForm.showInPoup({data})
    }

    editUserPermission(data, e) {
        OrgUserPermissionForm.showInPoup({data})
    }

    removeUser(data, e) {
        $.confirm({
            title: '',
            content: 'Are you sure you want to remove ?',
            confirmButton: 'Yes',
            cancelButton: 'No',
            confirm: function(){
                OrgUserHelper.removeUser(jQuery.param(data)).then((response) => {
                    this.props.fetchOrgUsers();
                });
            }.bind(this)
        });
    }

    render() {
        const { data } = this.props.userlist;

        
        return (
            <div>
               
                <PagePanel>
                    <div className="control-toolbar1">
                        <div className="left">
                            <div className="filter-header-input-wrap">
                                <input placeholder="Find member" className="filter-header-input" defaultValue=""/>
                            </div>
                        </div>
                        <div className="middle">
                        </div>
                        <div className="right">
                            <span className="pull-right">
                                <span className="col mr10">
                                    
                                </span>
                                <span className="col icons-group">
                                    {this.props.current_org.permissions.org_can_update ?
                                        <button className="btn btn-green-bordered" onClick={()=> OrgUserInviteForm.showInPoup({})}><i className="fa fa-plus"></i>Invite new members</button>
                                        : ''
                                    }
                                </span>
                            </span>    
                        </div>
                    </div>
                    <div className="mt20">
                        

                        <ul className="list-group-grid">
                            {this.renderList(data)}
                        </ul>
                    </div>


                </PagePanel>
            </div>

        );
    }
}


export default OrganizationUsers;
