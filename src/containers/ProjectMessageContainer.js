import { connect } from 'react-redux'
import { fetchProjectMessages} from '../actions/action_project';
import { fetchCategoriesTypeMessage} from '../actions/action_category';

import ProjectMessage from '../components/ProjectMessage';

const mapStateToProps = (state) => {
    return {
        state : state,
        projectMessages: state.project.messages,
        categoryList: state.category.type_message_list,
        current_org: state.appdata.current_org
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProjectMessages: (project_id) => {
            dispatch(fetchProjectMessages(project_id)).then((response) => {
                dispatch(fetchCategoriesTypeMessage(project_id))
            });
        }
    }
}


const ProjectMessageContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectMessage)

export default ProjectMessageContainer
