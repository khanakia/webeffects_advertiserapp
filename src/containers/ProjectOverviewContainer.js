import { connect } from 'react-redux'

import { fetchProjects } from '../actions/action_project';

import {ProjectOverview} from '../components'
const mapStateToProps = (state) => {
    return {
        state : state,
        project_list: state.project.list,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProjects: () => {
            dispatch(fetchProjects()); 
        },
    }
}


const ProjectOverviewContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectOverview)

export default ProjectOverviewContainer
