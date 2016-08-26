import { connect } from 'react-redux'
import { fetchProjectMessage} from '../actions/action_project';
// import { fetchCategoriesTypeMessage} from '../actions/action_category';

import ProjectMessage from '../components/ProjectMessage';

const mapStateToProps = (state) => {
    return {
        state : state,
        current_org: state.appdata.current_org,
        projectMessagesCurrent: state.project.messages_current,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProjectMessage: (id) => {
            dispatch(fetchProjectMessage(id)).then((response) => {
                // dispatch(fetchCategoriesTypeFile(project_id))
            });
        }
    }
}


const ProjectMessageContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectMessage)

export default ProjectMessageContainer
