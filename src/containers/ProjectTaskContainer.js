import { connect } from 'react-redux'
import { fetchProjectTask} from '../actions/action_project';

import ProjectTask from '../components/ProjectTask';

const mapStateToProps = (state) => {
    return {
        projectTask: state.project.task,
        state : state
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProjectTask: (id) => {
            dispatch(fetchProjectTask(id)).then((response) => {
            });
        }
    }
}


const ProjectTaskContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectTask)

export default ProjectTaskContainer
