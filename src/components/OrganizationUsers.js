import React, { Component } from 'react';
import { Link } from 'react-router';
import { If, Then, Else } from 'react-if';

import Sidebar from './Sidebar'
import PagePanel from './PagePanel'
import OrganizationAdd from './OrganizationAdd'

import OrgUserSettingForm from './org/OrgUserSettingForm'
import OrgUserPermissionForm from './org/OrgUserPermissionForm'
import OrgUserInviteForm from './org/OrgUserInviteForm'


import Auth from '../helpers/auth.js'
import OrgUserHelper from '../helpers/helper_org_user.js'


class OrganizationUsers extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.fetchOrgUsers();
    }

    renderList(orgusers) {
        return orgusers.map((orguser) => {
            console.log(orguser.office_phone)
            return (
                <li className="list-group-item" key={orguser.id}>
                    <div className="d-table w100">
                        <div className="d-table-cell xs-d-block w30 xs-w100">
                            <div className="userInfoBlock">
                                <div className="image d-inline-block mr20">
                                    <div className="avatar" style={{backgroundImage: 'url(http://localhost/aman.png)'}}>
                                    </div>
                                </div>
                                <div className="summary d-inline-block">
                                    <div className="title fw-b">{orguser.first_name +' '+ orguser.last_name}</div>
                                    <div className="position fs12">{orguser.job_title}</div>
                                    <div className="company fs12">{orguser.company_title}</div>
                                </div>
                            </div>
                        </div>
                        <div className="d-table-cell xs-d-block xs-mt20 w30 xs-w100 valign-middle contact_info">
                            <h4 className="list-group-item-heading">
                                
                                { orguser.email ?
                                    <span className="d-block fs12 mb5"><i className="fa fa-envelope w10p"></i><a href={"mailto:"+orguser.email}>{orguser.email}</a></span>
                                    : ''
                                }    
                                
                                { orguser.mobile ?
                                    <span className="d-block fs12 mb5"><i className="fa fa-mobile w10p fs14"></i>{orguser.mobile}</span>
                                    : ''
                                }    
                                
                                { orguser.office_phone ?
                                    <span className="d-block fs12 mb5"><i className="fa fa-phone w10p"></i>{orguser.office_phone}</span>
                                    : ''
                                }
                                
                            </h4>
                        </div>
                        <div className="d-table-cell xs-d-block xs-mt20 w30 xs-w100 valign-middle">
                            <h4 className="list-group-item-heading">
                                <span className="d-block fs12 mb5 lh-15p">
                                {orguser.address_line_1 ? <span>{orguser.address_line_1}<br/></span> : ''}
                                {orguser.address_line_2 ? <span>{orguser.address_line_2}<br/></span> : ''}
                                {orguser.city ? <span>{orguser.city} {orguser.zipcode} {orguser.state} <br/></span> : ''}
                                {orguser.country}
                                </span>
                            </h4>
                        </div>
                        <div className="d-table-cell xs-d-block valign-middle text-right">
                            <span className="icons-group light">
                                <button className="btn btn-plain" title="Remove User" onClick={(e)=> this.removeUser(orguser,e)} ><i className="fa fa-trash"></i></button>
                                <button className="btn btn-plain" title="Edit User Settings" onClick={(e)=> this.editUserSetting(orguser,e)} ><i className="fa fa-gear"></i></button>
                                <button className="btn btn-plain" title="Edit User Permissions" onClick={(e)=> this.editUserPermission(orguser,e)} ><i className="fa fa-cogs"></i></button>
                            </span>
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
                            <span className="title">Organization Users</span>
                        </div>
                        <div className="middle">
                        </div>
                        <div className="right">
                            <span className="pull-right">
                                <span className="col mr10">
                                    
                                </span>
                                <span className="col icons-group">
                                    <button className="btn btn-success" onClick={()=> OrgUserInviteForm.showInPoup({})}><i className="fa fa-plus mr10"></i>Invite Users</button>
                                </span>
                            </span>    
                        </div>
                    </div>
                    <div className="mt20">
                        

                        <ul className="list-group style1">
                            {this.renderList(data)}
                        </ul>
                    </div>


                </PagePanel>
            </div>

        );
    }
}


export default OrganizationUsers;
