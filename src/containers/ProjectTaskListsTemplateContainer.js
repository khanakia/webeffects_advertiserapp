import { connect } from 'react-redux'
import { fetchTasklists_Templates } from '../actions/action_tasklist';

import ProjectTaskListsTemplate from '../components/ProjectTaskListsTemplate';

const mapStateToProps = (state) => {
    return {
        projectsTasklists: state.tasklist.list_templates,
        state : state
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchTasklists_Templates: () => {
            dispatch(fetchTasklists_Templates()).then((response) => {
            });
        }
    }
}


const ProjectTaskListsTemplateContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectTaskListsTemplate)

export default ProjectTaskListsTemplateContainer
