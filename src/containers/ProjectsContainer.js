import { connect } from 'react-redux'
import { fetchProjects} from '../actions/action_project';

import Projects from '../components/Projects';

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
            
            dispatch(fetchProjects()).then((response) => {
            });
        }
    }
}


const ProjectsContainer = connect(mapStateToProps, mapDispatchToProps)(Projects)

export default ProjectsContainer
