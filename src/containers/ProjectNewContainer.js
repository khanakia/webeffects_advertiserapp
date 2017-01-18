import { connect } from 'react-redux'

import {PageProject} from '../components'

import { fetchProject, fetchProjectFormdata, fetchOfferRequestDetailsList } from '../actions/action_project';
const mapStateToProps = (state) => {
    return {
        state : state,
        
        
        project_formdata: state.project.formdata,
        
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
       
        fetchProjectFormdata: () => {
            dispatch(fetchProjectFormdata())
        },

       

    }
}


const ProjectNewContainer = connect(mapStateToProps, mapDispatchToProps)(PageProject)

export default ProjectNewContainer