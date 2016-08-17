import React, { Component } from 'react';
import { Link } from 'react-router';

import Auth from '../helpers/auth.js'

import Sidebar from './Sidebar'
import PagePanel from './PagePanel'

import ProjectForm from './project/ProjectForm'


class ProjectsList extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
       this.props.fetchProjects();
    }

    renderList(projects) {
        return projects.map((project) => {
            return (
                <li className="list-group-item" key={project.id}>
                    <div className="d-table w100">
                        <div className="d-table-cell xs-d-block w20 xs-w100 valign-middle">
                            <h4 className="list-group-item-heading">
                                <Link to={'projects/'+project.id+'/overview'}>{project.project_title}</Link><br/>
                            </h4>
                        </div>
                        <div className="d-table-cell xs-d-block w10 xs-w100 valign-middle">
                            {project.start_date ?
                                    <span>Start Date: {project.start_date}<br/></span>
                                    : ''
                            }

                            {project.end_date ?
                                <span>End Date: {project.end_date}</span>
                                    : ''
                            }    
                        </div>
                        <div className="d-table-cell xs-d-block valign-middle text-right">
                            <span className="icons-group light">
                                <button className="btn btn-plain" title="Edit" onClick={(e)=> this.editProject(project,e)} ><i className="fa fa-pencil"></i></button>
                                <button className="dropdown-toggle btn btn-plain" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-cog" aria-hidden="true"></span> <span className="caret"></span></button>
                                <ul className="dropdown-menu dropdown-menu-right">
                                  <li><Link to="organization">Project Setting</Link></li>
                                  <li><Link to="organization/companies">Archive Project</Link></li>
                                  <li><Link to="organization/peoples">Delete Project</Link></li>
                                </ul>
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

    deleteProject(data, e) {
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

    archiveProject(data, e) {
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
                                    <button className="btn btn-success" onClick={()=> ProjectForm.showInPoup({}, {},this.props)}><i className="fa fa-plus"></i></button>
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
