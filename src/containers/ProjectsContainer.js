import { connect } from 'react-redux'
import { fetchProjects, filterProjectList } from '../actions/action_project';

import Projects from '../components/Projects';

const filterList = (items, filterParams) => {
    return _.filter(items, function(item) {
        if(filterParams.project_name.toLowerCase() && item.project_name.toLowerCase() && item.project_name.toLowerCase().indexOf(filterParams.project_name) === -1) {
            return false;
        }
        return true;
    })
}

const mapStateToProps = (state) => {
    return {
        projectsList: filterList(state.project.list, state.project.filter_projectlist_params),
        state : state
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProjects: () => {
            
            dispatch(fetchProjects()).then((response) => {
            });
        },

        filterProjectList: (data) => {
            dispatch(filterProjectList(data))
        },
    }
}


const ProjectsContainer = connect(mapStateToProps, mapDispatchToProps)(Projects)

export default ProjectsContainer
