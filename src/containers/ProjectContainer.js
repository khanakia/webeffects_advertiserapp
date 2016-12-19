import { connect } from 'react-redux'

import {PageProject} from '../components'

import { fetchProject } from '../actions/action_project';
const mapStateToProps = (state) => {
    return {
        state : state,
        project: state.project.current,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProject: (project_id) => {
            dispatch(fetchProject(project_id)); 
        },
    }
}


const ProjectContainer = connect(mapStateToProps, mapDispatchToProps)(PageProject)

export default ProjectContainer
