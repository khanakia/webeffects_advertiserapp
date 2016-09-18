import { connect } from 'react-redux'
import { fetchProjects, fetchProjectUsers, filterProjectPeopleList} from '../actions/action_project';

import ProjectPeople from '../components/ProjectPeople';

const filterList = (items, filterParams) => {
    return _.filter(items, function(item) {
        if(filterParams.fullname.toLowerCase() && item.user.fullname.toLowerCase() && item.user.fullname.toLowerCase().indexOf(filterParams.fullname) === -1) {
            return false;
        }
        return true;
    })
}

const mapStateToProps = (state) => {
    return {
        state : state,
        current_org: state.appdata.current_org,
        // projectUsers: state.project.users,
        projectUsers: filterList(state.project.users, state.project.filter_projectuserlist_params),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProjectUsers: (project_id) => {
            dispatch(fetchProjectUsers(project_id)).then((response) => {
                
            });
        },

        filterProjectPeopleList: (data) => {
            dispatch(filterProjectPeopleList(data))
        },
    }
}


const ProjectPeopleContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectPeople)

export default ProjectPeopleContainer
