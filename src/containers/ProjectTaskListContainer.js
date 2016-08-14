import { connect } from 'react-redux'
import { fetchProjects} from '../actions/action_project';

import ProjectTaskList from '../components/ProjectTaskList';

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


const ProjectTaskListContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectTaskList)

export default ProjectTaskListContainer
