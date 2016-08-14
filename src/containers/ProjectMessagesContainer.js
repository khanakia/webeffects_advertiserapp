import { connect } from 'react-redux'
import { fetchProjects} from '../actions/action_project';

import ProjectMessages from '../components/ProjectMessages';

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


const ProjectMessagesContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectMessages)

export default ProjectMessagesContainer
