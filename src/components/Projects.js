import React, { Component } from 'react';
import { Link } from 'react-router';

import Sidebar from './Sidebar'
import PagePanel from './PagePanel'

import ProjectForm from './project/ProjectForm'

import {Auth, ProjectHelper} from '../helpers'
import PopupHelper from '../helpers/helper_popup'

import {API_URL_UPLOAD_PROJECT_LOGO} from '../config.js'


class ProjectsList extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
       this.props.fetchProjects();
    }

    uploadLogo(e, project) {
        e.preventDefault();
        PopupHelper.showUploadImageControl({uploadUrl:API_URL_UPLOAD_PROJECT_LOGO, object_type: 'project', object_id: project.id, image: project.logo_url})
    }


    editProject(e, data) {
        // ProjectForm.showInPoup({data})
        PopupHelper.showProjectForm({data})
    }


    deleteProject(e, data) {
        $.confirm({
            title: '',
            content: 'Are you sure you want to remove ?',
            confirmButton: 'Yes',
            cancelButton: 'No',
            confirm: function(){
                ProjectHelper.delete(data.id).then((response) => {
                    this.props.fetchProjects();
                });
            }.bind(this)
        });
    }

    // archiveProject(data, e) {
    //     $.confirm({
    //         title: '',
    //         content: 'Are you sure you want to remove ?',
    //         confirmButton: 'Yes',
    //         cancelButton: 'No',
    //         confirm: function(){
    //             OrgUserHelper.removeUser(jQuery.param(data)).then((response) => {
    //                 this.props.fetchOrgUsers();
    //             });
    //         }.bind(this)
    //     });
    // }
 
    renderList(projects) {
        return projects.map((project) => {
            return (
                <li className="list-group-item" key={project.id}>
                    <div className="d-table w100">
                        <div className="d-table-cell xs-d-block wp150 xs-w100">
                            <div className="avatar" style={{backgroundImage: "url('" + project.project_logo_url + "')"}}>
                            </div>
                        </div>
                        <div className="d-table-cell xs-d-block w20 xs-w100 valign-middle">
                            <h4 className="list-group-item-heading">
                                <Link to={'projects/'+project.id+'/overview'}>{project.project_name}</Link><br/>
                            </h4>
                        </div>
                        <div className="d-table-cell xs-d-block w10 xs-w100 valign-middle">
                            {project.start_date ?
                                    <span>Start Date: {project.project_start_date}<br/></span>
                                    : ''
                            }

                            {project.end_date ?
                                <span>End Date: {project.project_end_date}</span>
                                    : ''
                            }    
                        </div>
                        <div className="d-table-cell xs-d-block valign-middle text-right">
                            <span className="icons-group light">
                                <button className="btn btn-plain" title="Edit" onClick={(e)=> this.editProject(e, project)} ><i className="fa fa-pencil"></i></button>
                                <button className="btn btn-plain" title="Upload Logo" onClick={(e)=> this.uploadLogo(e, project)} ><i className="fa fa-picture-o"></i></button>
                                <button className="btn btn-plain" title="Move to Trash" onClick={(e)=> this.deleteProject(e, project)} ><i className="fa fa-trash"></i></button>
                            </span>
                        </div>
                    </div>

                </li>
            );
        });
    }

    render() {
        const data = this.props.projectsList;

        return (
            <div>
                <PagePanel>
                    <div className="control-toolbar1">
                        <div className="left">
                            <span className="title">Projects</span>
                        </div>
                        <div className="middle">
                        </div>
                        <div className="right">
                            <span className="pull-right">
                                <span className="col mr10">
                                    
                                </span>
                                <span className="col icons-group">
                                    <button className="btn btn-success" onClick={()=> PopupHelper.showProjectForm({})}><i className="fa fa-plus"></i></button>
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


export default ProjectsList;
