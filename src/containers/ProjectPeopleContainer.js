import { connect } from 'react-redux'
import { fetchProjects, fetchProjectUsers} from '../actions/action_project';

import ProjectPeople from '../components/ProjectPeople';

const mapStateToProps = (state) => {
    return {
        projectUsers: state.project.users.data,
        state : state
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProjectUsers: (project_id) => {
            dispatch(fetchProjectUsers(project_id)).then((response) => {
                
            });
        }
    }
}


const ProjectPeopleContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectPeople)

export default ProjectPeopleContainer
