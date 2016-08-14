import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Link } from 'react-router'
import ReactDOM from 'react-dom'

import { hashHistory } from 'react-router'

import Sidebar from '../components/Sidebar'
import PagePanel from '../components/PagePanel'

import {store} from '../store/index.js';
import { fetchProject} from '../actions/action_project';


class LayoutProjectComponent extends Component {
    
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         data : []
    //     }
    // }
    componentWillMount() {
        this.props.fetchProject(this.props.params.projectId);
    }

    render() {
        // console.log("RENDERED", jQuery.isEmptyObject(this.props.projectCurrent.data));
        if (jQuery.isEmptyObject(this.props.projectCurrent)) return false;
        const data = this.props.projectCurrent;
        return (
            <div>
                <Sidebar>
                  {data.project_title}
                </Sidebar>
                <PagePanel hasSidebar="true">
                    <ul className="nav nav-pills">
                        <li><Link to={"projects/"+this.props.params.projectId+"/overview"}><i className="fa fa-bullhorn"></i> Overview</Link></li>
                        <li><Link to={"projects/"+this.props.params.projectId+"/tasklists"}><i className="fa fa-bullhorn"></i> Tasks</Link></li>
                        <li><Link to={"projects/"+this.props.params.projectId+"/files"}><i className="fa fa-check-square-o"></i> Files</Link></li>
                        <li><Link to={"projects/"+this.props.params.projectId+"/messages"}><i className="fa fa-envelope"></i> Messages</Link></li>
                        <li><Link to={"projects/"+this.props.params.projectId+"/people"}><i className="fa fa-envelope"></i> Peoples</Link></li>
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
        projectCurrent: state.project.current.data,
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
