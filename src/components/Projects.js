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
                    <div className="w100 item-inner">
                        <div className="image text-center">
                            <div className="avatar d-inline-block" style={{backgroundImage: "url('" + project.project_logo_url + "')"}}>
                            </div>
                        </div>
                        <div className="text-center">
                            <h4 className="list-group-item-heading">
                                <Link to={'projects/'+project.id+'/overview'}>{project.project_name}</Link>
                                <div className="dropdown d-inline-block">
                                    <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button"><i className="fa fa-chevron-down"></i></a>
                                    <ul className="text-left dropdown-menu dropdown-menu-right">
                                        <li>
                                            <a href="javascript:void(0)" title="Edit" onClick={(e)=> this.editProject(e, project)} ><i className="fa fa-pencil"></i>Edit</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)" title="Upload Logo" onClick={(e)=> this.uploadLogo(e, project)} ><i className="fa fa-picture-o"></i>Upload Logo</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)" title="Move to Trash" onClick={(e)=> this.deleteProject(e, project)} ><i className="fa fa-trash"></i>Move to Trash</a>
                                        </li>
                                    </ul>
                                </div>
                            </h4>
                        </div>
                        <div className="text-center date-view fs12">
                            {project.start_date ? <span className="mx5">Start Date: {project.project_start_date}</span> : null}

                            {project.end_date ? <span className="mx5">End Date: {project.project_end_date}</span> : null}
                        </div>
                    </div>

                </li>
            );
        });
    }

    filterChange(e) {
        var value = e.target.value;
        this.props.filterProjectList({
            project_name : value
        });
    }

    render() {
        const data = this.props.projectsList;

        return (
            <div>
                <PagePanel>
                    <div className="control-toolbar1">
                        <div className="left">
                            <div className="filter-header-input-wrap">
                                <input placeholder="Find a project" className="filter-header-input" defaultValue="" onChange={(e)=>this.filterChange(e)}/>
                            </div>
                        </div>
                        <div className="middle">
                        </div>
                        <div className="right">
                            <span className="pull-right">
                                <span className="col mr10">
                                    
                                </span>
                                <span className="col icons-group">
                                    <button className="btn btn-green-bordered" onClick={()=> PopupHelper.showProjectForm({})}><i className="fa fa-plus"></i>Create new project</button>
                                </span>
                            </span>    
                        </div>
                    </div>
                    <div className="mt20">
                        <ul className="list-group-grid project-list">
                            {this.renderList(data)}
                        </ul>
                    </div>
                </PagePanel>
            </div>

        );
    }
}


export default ProjectsList;
