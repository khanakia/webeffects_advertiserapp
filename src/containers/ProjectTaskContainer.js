import { connect } from 'react-redux'
import { fetchProjects} from '../actions/action_project';

import ProjectTask from '../components/ProjectTask';

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


const ProjectTaskContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectTask)

export default ProjectTaskContainer
