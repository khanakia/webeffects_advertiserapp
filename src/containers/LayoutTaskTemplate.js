import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router'

import {store} from '../store/index.js';
import { fetchProject, fetchProjectTasklists } from '../actions/action_project';
import { fetchTags} from '../actions/action_tag';


import Sidebar from '../components/Sidebar'
import PagePanel from '../components/PagePanel'

import TasklistSidebar from '../components/project_todo/TasklistSidebar'

class LayoutTaskTemplateComponent extends Component {
    
    componentWillMount() {
        // this.props.fetchProject(this.props.params.projectId);
        // this.props.fetchProjectTasklists(this.props.params.projectId);
        this.props.fetchTags()  // Required to fetch the reason we are using it everywhere so we need to load tags data first
    }

    render() {
        // console.log("RENDERED", jQuery.isEmptyObject(this.props.projectCurrent.data));
        // if (jQuery.isEmptyObject(this.props.projectCurrent)) return false;
        // const data = this.props.projectCurrent;
        // const project_url_suffix = "projects/"+data.id;

        return (
            <div>
                <Sidebar>

                    <div className="box-info">
                        <h3>Tasklist</h3>
                        {/*<TasklistSidebar data={this.props.projectsTasklists} project_id={this.props.params.projectId} />*/}
                    </div>

                  <div id="childrenSidebar">

                  </div>
                </Sidebar>
                <PagePanel hasSidebar="true">
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
        state : state,
        projectCurrent: state.project.current,
        projectsTasklists: state.project.tasklists,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProject: (project_id) => {
            dispatch(fetchProject(project_id)); 
        },

        fetchTags: () => {
            dispatch(fetchTags())
        },

        fetchProjectTasklists: (project_id) => {
            dispatch(fetchProjectTasklists(project_id)).then((response) => {
            });
        }
    }
}

const LayoutTaskTemplate = connect(mapStateToProps, mapDispatchToProps)(LayoutTaskTemplateComponent)

export default LayoutTaskTemplate
