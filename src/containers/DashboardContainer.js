import { connect } from 'react-redux'

import { fetchProjectActivities } from '../actions/action_project';


import Dashboard from '../components/Dashboard';

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


const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard)

export default DashboardContainer
