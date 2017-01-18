import { connect } from 'react-redux'

import { fetchProjects } from '../actions/action_project';
import { fetchCurrentUser } from '../actions/action_appdata';

import {App} from '../components'


const mapStateToProps = (state) => {
    return {
        state : state,
        project_list: state.project.list,
        current_user: state.appdata.current_user,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fethcInitialData: () => {
            
            dispatch(fetchCurrentUser()).then((response) => {
                // console.log("fetched")
            });
            dispatch(fetchProjects()); 
        },

        // fetchProjects: () => {
        //     dispatch(fetchProjects()); 
        // },
    }
}


const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer
