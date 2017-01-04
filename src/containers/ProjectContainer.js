import { connect } from 'react-redux'

import {PageProject} from '../components'

import { fetchProject, fetchProjectFormdata, fetchOfferRequestDetailsList } from '../actions/action_project';
const mapStateToProps = (state) => {
    return {
        state : state,
        project: state.project.current,
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

        fetchOfferRequestDetailsList: (project_id) => {
            dispatch(fetchOfferRequestDetailsList(project_id))
        }

    }
}


const ProjectContainer = connect(mapStateToProps, mapDispatchToProps)(PageProject)

export default ProjectContainer
