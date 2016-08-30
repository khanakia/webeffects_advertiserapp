import { connect } from 'react-redux'
import { fetchProjectTasklists } from '../actions/action_project';

import ProjectTaskLists from '../components/ProjectTaskLists';

const mapStateToProps = (state) => {
    return {
        projectsTasklists: state.project.tasklists,
        state : state
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProjectTasklists: (project_id) => {
            dispatch(fetchProjectTasklists(project_id)).then((response) => {
            });
        }
    }
}


const ProjectTaskListsContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectTaskLists)

export default ProjectTaskListsContainer
