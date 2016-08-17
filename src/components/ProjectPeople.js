import React, { Component } from 'react';
import { Link } from 'react-router';

import {Auth, Util} from '../helpers'
import ProjectUserHelper from '../helpers/helper_project_user.js'


import Sidebar from './Sidebar'
import PagePanel from './PagePanel'

import ProjectUsersEditForm from './project/ProjectUsersEditForm'
import ProjectUserPermissionForm from './project/ProjectUserPermissionForm'


class ProjectPeople extends Component {
    constructor(props, context) {
        super(props, context);

        this.projectId = this.props.params.projectId
    }

    componentDidMount() {
        
       this.props.fetchProjectUsers(this.projectId);

       // ProjectUsersEditForm.showInPoup({data : {project_id : 1}})
               // ProjectUserPermissionForm.showInPoup({})

    }

    editProject(data, e) {
        ProjectForm.showInPoup({data})
    }

    editUserPermission(data, e) {
        ProjectUserPermissionForm.showInPoup({data})
    }

    removeUser(data, e) {
        $.confirm({
            title: '',
            content: 'Are you sure you want to remove ?',
            confirmButton: 'Yes',
            cancelButton: 'No',
            confirm: function(){
                ProjectUserHelper.delete(data.id).then((response) => {
                    this.props.fetchProjectUsers(this.projectId);
                });
            }.bind(this)
        });
    }

    renderList(projectusers) {
        if(undefined==projectusers) return;
        return projectusers.map((projectuser) => {
            return (
                <li className="list-group-item" key={projectuser.id}>
       
                    <div className="d-table w100">
                        <div className="d-table-cell xs-d-block w30 xs-w100">
                            <div className="userInfoBlock">
                                <div className="image d-inline-block mr20">
                                    <div className="avatar" style={{backgroundImage: 'url(http://localhost/aman.png)'}}>
                                    </div>
                                </div>
                                <div className="summary d-inline-block">
                                    <div className="title fw-b">{projectuser.user_id} {projectuser.first_name +' '+ projectuser.last_name}</div>
                                    <div className="position fs12">{projectuser.job_title}</div>
                                    <div className="company fs12">{projectuser.company_title}</div>
                                </div>
                            </div>
                        </div>
                        <div className="d-table-cell xs-d-block xs-mt20 w30 xs-w100 valign-middle contact_info">
                            <h4 className="list-group-item-heading">
                                
                                { projectuser.email ?
                                    <span className="d-block fs12 mb5"><i className="fa fa-envelope w10p"></i><a href={"mailto:"+projectuser.email}>{projectuser.email}</a></span>
                                    : ''
                                }    
                                
                                { projectuser.mobile ?
                                    <span className="d-block fs12 mb5"><i className="fa fa-mobile w10p fs14"></i>{projectuser.mobile}</span>
                                    : ''
                                }    
                                
                                { projectuser.office_phone ?
                                    <span className="d-block fs12 mb5"><i className="fa fa-phone w10p"></i>{projectuser.office_phone}</span>
                                    : ''
                                }
                                
                            </h4>
                        </div>
                        <div className="d-table-cell xs-d-block xs-mt20 w20 xs-w100 valign-middle">
                            <h4 className="list-group-item-heading">
                                <span className="d-block fs12 mb5 lh-15p">
                                {projectuser.address_line_1 ? <span>{projectuser.address_line_1}<br/></span> : ''}
                                {projectuser.address_line_2 ? <span>{projectuser.address_line_2}<br/></span> : ''}
                                {projectuser.city ? <span>{projectuser.city} {projectuser.zipcode} {projectuser.state} <br/></span> : ''}
                                {projectuser.country}
                                </span>
                            </h4>
                        </div>

                        <div className="d-table-cell xs-d-block valign-middle">
                                
                                
                                
                                
                        </div>
                        <div className="d-table-cell xs-d-block valign-middle text-right">
                            <span className="icons-group light">
                                {(this.props.current_org.permissions.org_can_update) ?
                                    <span>
                                        <button className="btn btn-plain" title="Remove User" onClick={(e)=> this.removeUser(projectuser,e)} ><i className="fa fa-trash"></i></button>
                                        <button className="btn btn-plain" title="Edit User Permissions" onClick={(e)=> this.editUserPermission(projectuser,e)} ><i className="fa fa-cogs"></i></button>
                                    </span>    
                                    : ''
                                }
                            </span>
                        </div>
                    </div>

                </li>
            );
        });
    }


   
    render() {
        const data = this.props.projectUsers['id_'+this.projectId];
        
        return (
            <div>
                <div className="control-toolbar1">
                    <div className="left">
                        <span className="title">Users on this Project</span>
                    </div>
                    <div className="middle">
                    </div>
                    <div className="right">
                        <span className="pull-right">
                            <span className="col mr10">
                                
                            </span>
                            <span className="col icons-group">
                                <button className="btn btn-success" onClick={()=> ProjectUsersEditForm.showInPoup({data : {project_id : this.projectId}})}><i className="fa fa-plus mr5"></i>Add Users</button>
                            </span>
                        </span>    
                    </div>
                </div>
                <div className="mt20">
                    
                    <ul className="list-group style1">
                        {this.renderList(data)}
                    </ul>
                </div>
            </div>

        );
    }
}


export default ProjectPeople;
