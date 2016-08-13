import React, { Component } from 'react';
import { Link } from 'react-router';

import Sidebar from './Sidebar'
import PagePanel from './PagePanel'
import OrganizationAdd from './OrganizationAdd'

import OrgUserSettingForm from './org/OrgUserSettingForm'
import OrgUserInviteForm from './org/OrgUserInviteForm'


import Auth from '../helpers/auth.js'


class OrganizationUsers extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.fetchOrgUsers();
    }

    renderList(orgusers) {
        return orgusers.map((orguser) => {
            return (
                <li className="list-group-item" key={orguser.id}>
                    <div className="d-table width-full">
                        <div className="d-table-cell w30">
                            <div className="userInfoBlock">
                                <div className="image">
                                    <div className="avatar" style={{backgroundImage: 'url(http://localhost/aman.png)'}}>
                                        
                                    </div>

                                </div>
                                <div className="summary">
                                    <span className="title">{orguser.first_name} {orguser.last_name}</span>
                                    <span className="position">{orguser.job_title}</span>
                                    <span className="company">{orguser.company_title}</span>
                                </div>

                            </div>
                        </div>
                        <div className="d-table-cell w30 v-align-middle contact_info">
                            <h4 className="list-group-item-heading">
                                <span className="d-block fs12 mb5"><i className="fa fa-envelope w10p"></i>{orguser.email}</span>
                                <span className="d-block fs12 mb5"><i className="fa fa-mobile w10p fs14"></i>{orguser.mobile}</span>
                                <span className="d-block fs12 mb5"><i className="fa fa-phone w10p"></i>{orguser.office_phone}</span>
                            </h4>
                        </div>
                        <div className="d-table-cell w30 v-align-middle">
                            <h4 className="list-group-item-heading">
                                <span className="d-block fs12 mb5 lh-15p">
                                {orguser.address_line_1}<br/>
                                {orguser.address_line_2}<br/>
                                {orguser.city} {orguser.zipcode} {orguser.state}, {orguser.country}
                                </span>
                            </h4>
                        </div>
                        <div className="d-table-cell pos-r">
                            <span className="controls icons-group">
                                <button className="btn btn-link" title="Remove User" onClick={(e)=> this.editOrg(orguser,e)} ><i className="fa fa-trash"></i></button>
                                <button className="btn btn-link" title="Edit User Settings" onClick={(e)=> this.editUserSetting(orguser,e)} ><i className="fa fa-gear"></i></button>
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
                                    <button className="btn btn-plain" onClick={()=> OrgUserInviteForm.showInPoup({})}><i className="fa fa-plus"></i></button>
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
