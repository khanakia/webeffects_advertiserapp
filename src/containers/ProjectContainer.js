import { connect } from 'react-redux'

import {PageProject} from '../components'

import { fetchProject, fetchProjectFormdata } from '../actions/action_project';
const mapStateToProps = (state) => {
    return {
        state : state,
        project: state.project.current,
        project_formdata: state.project.formdata,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProject: (project_id) => {
            dispatch(fetchProject(project_id)); 
        },

        fetchProjectFormdata: () => {
            dispatch(fetchProjectFormdata())
        }
    }
}


const ProjectContainer = connect(mapStateToProps, mapDispatchToProps)(PageProject)

export default ProjectContainer
