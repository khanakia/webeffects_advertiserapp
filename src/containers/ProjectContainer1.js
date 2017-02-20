import { connect } from 'react-redux'

import {PageProject1} from '../components'

import { fetchProjects, createProject, fetchProject, fetchProjectRevision,  fetchProjectFormdata, fetchOfferRequestDetailsList } from '../actions/action_project';
const mapStateToProps = (state) => {
    return {
        state : state,
        project: state.project.current,
        // project_province: state.project.current.province,
        // project_plaat: state.project.current.plaat,
        // project_gebied: state.project.current.gebied,
        // project_contact: state.project.current.contact,
        project_formdata: state.project.formdata,
        project_offer_request_details_list: state.project.offer_request_details_list
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        createProject: () => {
            dispatch(createProject())
        },
        fetchProject: (project_id) => {
            dispatch(fetchProject(project_id)); 
        },
        fetchProjectRevision: (project_id) => {
            dispatch(fetchProjectRevision(project_id)); 
        },

        fetchProjectFormdata: () => {
            dispatch(fetchProjectFormdata())
        },

        fetchOfferRequestDetailsList: (project_id, page=1) => {
            dispatch(fetchOfferRequestDetailsList(project_id, page))
        },

        fetchProjects: () => {
            dispatch(fetchProjects()); 
        },

    }
}


const ProjectContainer1 = connect(mapStateToProps, mapDispatchToProps)(PageProject1)

export default ProjectContainer1
