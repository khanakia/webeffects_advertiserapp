import {
    FETCH_PROJECTS,
    FETCH_PROJECT,
    FETCH_PROJECT_USERS,
    FETCH_TASKLISTS
} from '../actions/action_project';



const INITIAL_STATE = {
    list: [], // List all the Projects
    current: { data: []},  // Current Project User is Viewing
    users : {},  // User Under Each Project it will be like that id_1 : {USERS}, id_2 : {USERS}
    tasklists : [],
};


export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case FETCH_PROJECTS:
            return {...state, list: action.payload.data };
        case FETCH_PROJECT:
            return {...state, current: { data: action.payload.data } };
        case FETCH_PROJECT_USERS:
            var project_id = 'id_'+state.current.data.id;
            var copy = Object.assign({}, state.users.data); // First Create a Copy of object and then mutate
            copy[project_id] = action.payload.data;
            // return {...state, users: {data: copy}};
            return {...state, users: copy};
        case FETCH_TASKLISTS:
            return {...state, tasklists: action.payload.data };
        default:
            return state;
    }
}
