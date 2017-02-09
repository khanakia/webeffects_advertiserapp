import {
    FETCH_PROJECTS,
    CREATE_PROJECT,
    FETCH_PROJECT_CURRENT,
    FETCH_PROJECT_FORMDATA,
    FETCH_PROJECT_OFFER_REQUEST_DETAILS_LIST,
} from '../actions/action_project';



const INITIAL_STATE = {
    list: [], // List all the Projects
    current: [],  // Current Project User is Viewing
    formdata: [],
    offer_request_details_list: []
};


export default function(state = INITIAL_STATE, action) {
    let error;
    
    if(undefined==action.payload) {
        return state;
    }
    
    switch (action.type) {
        case FETCH_PROJECTS:
            return {...state, list: action.payload.data };
        case FETCH_PROJECT_CURRENT:
            return {...state, current: action.payload.data };
        case CREATE_PROJECT:
            // log("CREATE_PROJECTCREATE_PROJECTCREATE_PROJECT", 'type1')
            return {...state, current: {} };            
        case FETCH_PROJECT_FORMDATA:
            return {...state, formdata: action.payload.data };    
        case FETCH_PROJECT_OFFER_REQUEST_DETAILS_LIST:
            return {...state, offer_request_details_list: action.payload.data };    
        default:
            return state;
    }
}
