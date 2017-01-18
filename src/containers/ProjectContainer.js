import { connect } from 'react-redux'

import {PageProject} from '../components'

import { fetchProjects, fetchProject, fetchProjectFormdata, fetchOfferRequestDetailsList } from '../actions/action_project';
const mapStateToProps = (state) => {
    return {
        state : state,
        project: state.project.current,
        project_province: state.project.current.province,
        project_plaat: state.project.current.plaat,
        project_gebied: state.project.current.gebied,
        project_contact: state.project.current.contact,
        project_formdata: state.project.formdata,
        project_offer_request_details_list: state.project.offer_request_details_list
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
        },

        fetchOfferRequestDetailsList: (project_id, date=null) => {
            dispatch(fetchOfferRequestDetailsList(project_id, date))
        },

        fetchProjects: () => {
            dispatch(fetchProjects()); 
        },

    }
}


const ProjectContainer = connect(mapStateToProps, mapDispatchToProps)(PageProject)

export default ProjectContainer
