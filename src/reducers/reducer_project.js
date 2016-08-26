import {
    FETCH_PROJECTS,
    FETCH_PROJECT_CURRENT,
    FETCH_PROJECT_USERS,
    FETCH_PROJECT_MESSAGES,
    FETCH_PROJECT_MESSAGE,
    FETCH_PROJECT_FILES,
    FETCH_PROJECT_FILE,
    FETCH_PROJECT_FILES_BROWSER_FORM_LIST,
    FETCH_TASKLISTS,
    FETCH_TASKLIST_TASKS,
    FETCH_PROJECT_TASKLIST, 
    FETCH_PROJECT_TASK, 
    FETCH_COMMENTS
} from '../actions/action_project';



const INITIAL_STATE = {
    list: [], // List all the Projects
    current: [],  // Current Project User is Viewing
    users : [],  // User Under Each Project it will be like that id_1 : {USERS}, id_2 : {USERS}
    tasklists : [],
    tasklist : [],
    task : [],
    messages : [],
    messages_current : [],
    files : [],
    files_current : [],
    files_browser_form_list : [],
    comments : []
};


export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case FETCH_PROJECTS:
            return {...state, list: action.payload.data };
        case FETCH_PROJECT_CURRENT:
            return {...state, current: action.payload.data };
        case FETCH_PROJECT_USERS:
            
            // var project_id = 'id_'+state.current.id;
            // var copy = Object.assign({}, state.users.data); // First Create a Copy of object and then mutate
            // copy[project_id] = action.payload.data;
            // return {...state, users: copy};

            return {...state, users: action.payload.data};
        case FETCH_TASKLISTS:
            return {...state, tasklists: action.payload.data };
        case FETCH_PROJECT_TASKLIST:
            return {...state, tasklist: action.payload.data };
        case FETCH_PROJECT_TASK:
            return {...state, task: action.payload.data };    
        case FETCH_PROJECT_MESSAGES:
            return {...state, messages: action.payload.data };    
        case FETCH_PROJECT_MESSAGE:
            return {...state, messages_current: action.payload.data };
        
        case FETCH_PROJECT_FILES:
            return {...state, files: action.payload.data };
        case FETCH_PROJECT_FILE:
            return {...state, files_current: action.payload.data };
        case FETCH_PROJECT_FILES_BROWSER_FORM_LIST:
            return {...state, files_browser_form_list: action.payload.data };
        case FETCH_COMMENTS:
            return {...state, comments: action.payload.data };                   
        default:
            return state;
    }
}
