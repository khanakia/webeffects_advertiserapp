import { connect } from 'react-redux'

import { fetchProjectActivities } from '../actions/action_project';


import ProjectOverview from '../components/ProjectOverview';

const mapStateToProps = (state) => {
    return {
        projectActivities: state.project.activities,
        state : state
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProjectActivities: (project_id) => {
            dispatch(fetchProjectActivities(project_id)).then((response) => {
                
            });
        }
    }
}


const ProjectOverviewContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectOverview)

export default ProjectOverviewContainer
