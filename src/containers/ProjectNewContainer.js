import { connect } from 'react-redux'

import {PageProject1} from '../components'

import { fetchProject, fetchProjectFormdata, fetchOfferRequestDetailsList } from '../actions/action_project';
const mapStateToProps = (state) => {
    return {
        state : state,
        
        is_new : 1,
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


const ProjectNewContainer = connect(mapStateToProps, mapDispatchToProps)(PageProject1)

export default ProjectNewContainer
