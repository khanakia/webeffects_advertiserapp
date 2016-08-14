import React, { Component } from 'react';
import { Link } from 'react-router';

import Auth from '../helpers/auth.js'

import Sidebar from './Sidebar'
import PagePanel from './PagePanel'

import ProjectForm from './project/ProjectForm'


class ProjectPeople extends Component {
    constructor(props, context) {
        super(props, context);

        this.projectId = this.props.params.projectId
    }

    componentDidMount() {
        
       this.props.fetchProjectUsers(this.projectId);
    }

    renderList(projectusers) {
        if(undefined==projectusers) return;
        return projectusers.map((projectuser) => {
            return (
                <li className="list-group-item" key={projectuser.id}>
                    <div className="d-table width-full">
                        <div className="d-table-cell w30">
                            <div className="userInfoBlock">
                                <div className="image">
                                    <div className="avatar" style={{backgroundImage: 'url(http://localhost/aman.png)'}}>
                                        
                                    </div>

                                </div>
                                <div className="summary">
                                    <span className="title">{projectuser.first_name} {projectuser.last_name}</span>
                                    <span className="position">{projectuser.job_title}</span>
                                    <span className="company">{projectuser.company_title}</span>
                                </div>

                            </div>
                        </div>
                        <div className="d-table-cell w30 v-align-middle contact_info">
                            <h4 className="list-group-item-heading">
                                <span className="d-block fs12 mb5"><i className="fa fa-envelope w10p"></i>{projectuser.email}</span>
                                <span className="d-block fs12 mb5"><i className="fa fa-mobile w10p fs14"></i>{projectuser.mobile}</span>
                                <span className="d-block fs12 mb5"><i className="fa fa-phone w10p"></i>{projectuser.office_phone}</span>
                            </h4>
                        </div>
                        <div className="d-table-cell w30 v-align-middle">
                            <h4 className="list-group-item-heading">
                                <span className="d-block fs12 mb5 lh-15p">
                                {projectuser.address_line_1}<br/>
                                {projectuser.address_line_2}<br/>
                                {projectuser.city} {projectuser.zipcode} {projectuser.state}, {projectuser.country}
                                </span>
                            </h4>
                        </div>
                        <div className="d-table-cell pos-r">
                            <span className="controls icons-group">
                                <button className="btn btn-link" title="Remove User from this Project" onClick={(e)=> this.editOrg(projectuser,e)} ><i className="fa fa-trash"></i></button>
                                <button className="btn btn-link" title="Edit Project Permission" onClick={(e)=> this.editUserSetting(projectuser,e)} ><i className="fa fa-gear"></i></button>
                            </span>
                        </div>

                    </div>

                </li>
            );
        });
    }

    editProject(data, e) {
        ProjectForm.showInPoup({data})
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
                                <button className="btn" onClick={()=> OrgUserInviteForm.showInPoup({})}><i className="fa fa-plus mr5"></i>Add Users</button>
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
