import React, { Component } from 'react';
import { Link } from 'react-router';

import {Auth, Util, ProjectUserHelper} from '../helpers'
import PopupHelper from '../helpers/helper_popup'


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
                    <div className="w100">
                        <div className="image text-center">
                            <div className="avatar d-inline-block" style={{backgroundImage: "url('" + projectuser.user.profile_image_url +"')"}}>
                            </div>
                        </div>
                        <div className="text-center">
                            <h4 className="list-group-item-heading">
                                {projectuser.user.fullname}
                                {(this.props.current_org.permissions.org_can_update) ?
                                    <div className="dropdown d-inline-block">
                                        <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button"><i className="fa fa-chevron-down"></i></a>
                                        <ul className="text-left dropdown-menu dropdown-menu-right">
                                            <li>
                                                <a href="javascript:void(0)" title="Remove User" onClick={(e)=> this.removeUser(projectuser,e)} ><i className="fa fa-trash"></i>Remove User</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0)" title="Edit User Permissions" onClick={(e)=> this.editUserPermission(projectuser,e)} ><i className="fa fa-cogs"></i>Edit User Permissions</a>
                                            </li>
                                        </ul>
                                    </div>
                                : null}
                            </h4>
                        </div>
                        <div className="position fs12">{projectuser.job_title}</div>
                        <div className="company fs12">{projectuser.company_title}</div>
                    </div>
                </li>
            );
        });
    }


   
    render() {
        // const data = this.props.projectUsers['id_'+this.projectId];
        const data = this.props.projectUsers;
        
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
                                <button className="btn btn-success" onClick={()=> PopupHelper.showProjectUsersEditForm({data : {project_id : this.projectId}})}><i className="fa fa-plus mr5"></i>Add Users</button>
                            </span>
                        </span>
                    </div>
                </div>
                <div className="mt20">
                    
                    <ul className="list-group-grid project-peoples">
                        {this.renderList(data)}
                    </ul>
                </div>
            </div>

        );
    }
}


export default ProjectPeople;
