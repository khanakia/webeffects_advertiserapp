import { connect } from 'react-redux'

import { 
    fetchProjects,
    fetchProjectFormdata,
 } from '../actions/action_project';

import {ProjectOverview} from '../components'
const mapStateToProps = (state) => {
    return {
        state : state,
        project_list: state.project.list,
        project_formdata: state.project.formdata,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProjects: (args) => {
            dispatch(fetchProjects(args)); 
        },

         fetchProjectFormdata: () => {
            dispatch(fetchProjectFormdata(window.Env.site_id))
        },
    }
}


const ProjectOverviewContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectOverview)

export default ProjectOverviewContainer
