import { connect } from 'react-redux'
import { fetchProjectTasklist} from '../actions/action_project';

import ProjectTaskList from '../components/ProjectTaskList';

const mapStateToProps = (state) => {
    return {
        projectTasklist: state.project.tasklist,
        state : state
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProjectTasklist:(id) => {
            dispatch(fetchProjectTasklist(id)).then((response) => {
            });
        }
    }
}


const ProjectTaskListContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectTaskList)

export default ProjectTaskListContainer
