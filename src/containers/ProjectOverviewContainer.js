import { connect } from 'react-redux'
import { fetchProjects} from '../actions/action_project';

import ProjectOverview from '../components/ProjectOverview';

const mapStateToProps = (state) => {
    return {
        projectsList: state.project.list,
        state : state
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProjects: () => {
            
            // dispatch(fetchProjects()).then((response) => {
            // });
        }
    }
}


const ProjectOverviewContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectOverview)

export default ProjectOverviewContainer
