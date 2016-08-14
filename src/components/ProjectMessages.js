import React, { Component } from 'react';
import { Link } from 'react-router';

import Auth from '../helpers/auth.js'

import Sidebar from './Sidebar'
import PagePanel from './PagePanel'

import ProjectForm from './project/ProjectForm'


class ProjectMessages extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
       // this.props.fetchProjects();
    }

    renderList(projects) {
        return projects.map((project) => {
            return (
                <li className="list-group-item" key={project.id}>
                    <h4 className="list-group-item-heading">
                            {project.project_title}<br/>

                            <span>Start Date: {project.start_date}</span><br/>
                            <span>End Date: {project.start_date}</span>
                    </h4>

                    <span className="controls icons-group">
                        <button className="btn btn-plain" title="Edit" onClick={(e)=> this.editProject(project,e)} ><i className="fa fa-pencil"></i></button>
                        <button className="dropdown-toggle btn btn-plain" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-cog" aria-hidden="true"></span> <span className="caret"></span></button>
                        <ul className="dropdown-menu dropdown-menu-right">
                          <li><Link to="organization">Project Setting</Link></li>
                          <li><Link to="organization/companies">Archive Project</Link></li>
                          <li><Link to="organization/peoples">Delete Project</Link></li>
                        </ul>
                    </span>
                </li>
            );
        });
    }

    editProject(data, e) {
        ProjectForm.showInPoup({data})
    }
   
    render() {
        // const { data } = this.props.projectsList;

        return (
            <div>
               Messages
            </div>

        );
    }
}


export default ProjectMessages;
