import { connect } from 'react-redux'

import { fetchProjects } from '../actions/action_project';

import {App} from '../components'
const mapStateToProps = (state) => {
    return {
        state : state,
        project_list: state.project.list,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProjects: () => {
            dispatch(fetchProjects()); 
        },
    }
}


const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer
