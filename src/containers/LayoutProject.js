import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router'

import {store} from '../store/index.js';
import { fetchProject} from '../actions/action_project';

import Sidebar from '../components/Sidebar'
import PagePanel from '../components/PagePanel'

class LayoutProjectComponent extends Component {
    
    componentWillMount() {
        this.props.fetchProject(this.props.params.projectId);
    }

    render() {
        // console.log("RENDERED", jQuery.isEmptyObject(this.props.projectCurrent.data));
        if (jQuery.isEmptyObject(this.props.projectCurrent)) return false;
        const data = this.props.projectCurrent;
        const project_url_suffix = "projects/"+data.id;

        return (
            <div>
                <Sidebar>
                  {data.project_title}

                  <div id="childrenSidebar">

                  </div>
                </Sidebar>
                <PagePanel hasSidebar="true">
                    <ul className="nav nav-pills">
                        <li><Link to={project_url_suffix + "/overview"}><i className="fa fa-bullhorn"></i> Overview</Link></li>
                        <li><Link to={project_url_suffix + "/tasklists"}><i className="fa fa-bullhorn"></i> Tasks</Link></li>
                        <li><Link to={project_url_suffix + "/files"}><i className="fa fa-check-square-o"></i> Files</Link></li>
                        <li><Link to={project_url_suffix + "/messages"}><i className="fa fa-envelope"></i> Messages</Link></li>
                        <li><Link to={project_url_suffix + "/people"}><i className="fa fa-envelope"></i> Peoples</Link></li>
                    </ul>

                    <div className="project_children pt30">
                        {this.props.children}
                    </div>
                </PagePanel>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        projectCurrent: state.project.current,
        state : state
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProject: (project_id) => {
            dispatch(fetchProject(project_id)); 
        }
    }
}

const LayoutProjectContainer = connect(mapStateToProps, mapDispatchToProps)(LayoutProjectComponent)

export default LayoutProjectContainer
