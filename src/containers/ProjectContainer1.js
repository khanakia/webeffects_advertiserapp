import { connect } from 'react-redux'

import {PageProject1} from '../components'

import { 
    fetchProjects, 
    createProject, 
    fetchProject,
    fetchProjectRevision,
    fetchProjectFormdata,
    fetchOfferRequestDetailsList,
    fetchSnoobiData,
    fetchCompareJson
    // fetchSnoobiList,
    // fetchSnoobiGraph,
    // fetchSnoobiMostRequestedProjects
} from '../actions/action_project';
const mapStateToProps = (state) => {
    return {
        state : state,
        project: state.project.current,
        snoobi_data: state.project.snoobi_data,
        // snoobi_graph: state.project.snoobi_graph,
        // snoobi_list: state.project.snoobi_list,
        // snoobi_most_requested_projects: state.project.snoobi_most_requested_projects,
        // project_province: state.project.current.province,
        // project_plaat: state.project.current.plaat,
        // project_gebied: state.project.current.gebied,
        // project_contact: state.project.current.contact,
        project_formdata: state.project.formdata,
        project_offer_request_details_list: state.project.offer_request_details_list,
        compare_json: state.project.compare_json,
        is_new : 0,
    }
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
            dispatch(fetchProjectFormdata(window.Env.site_id))
        },

        fetchOfferRequestDetailsList: (project_id, page=1) => {

            dispatch(fetchOfferRequestDetailsList(project_id, page))
        },

        fetchProjects: () => {
            dispatch(fetchProjects()); 
        },


        fetchSnoobiData: (project_id, page=1, args) => {
            // console.log(args)
            dispatch(fetchSnoobiData(project_id, page, args));
        },

        fetchCompareJson: (project_id) => {
            dispatch(fetchCompareJson(project_id));
        },


        // fetchSnoobiList: (project_id, page=1, args) => {
        //     console.log(args)
        //     dispatch(fetchSnoobiList(project_id, page, args));
        // },

        // fetchSnoobiGraph: (project_id) => {
        //     dispatch(fetchSnoobiGraph(project_id)); 
        // },

        // fetchSnoobiMostRequestedProjects: (project_id) => {
        //     dispatch(fetchSnoobiMostRequestedProjects(project_id)); 
        // },

    }
}


const ProjectContainer1 = connect(mapStateToProps, mapDispatchToProps)(PageProject1)

export default ProjectContainer1
