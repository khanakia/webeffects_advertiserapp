import { connect } from 'react-redux'
import { fetchProjects} from '../actions/action_project';

import ProjectFiles from '../components/ProjectFiles';

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


const ProjectFilesContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectFiles)

export default ProjectFilesContainer
