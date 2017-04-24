import {
    FETCH_PROJECTS,
    CREATE_PROJECT,
    FETCH_PROJECT_CURRENT,
    FETCH_PROJECT_FORMDATA,
    FETCH_PROJECT_OFFER_REQUEST_DETAILS_LIST,
    FETCH_PROJECT_SNOOBI_DATA,
    FETCH_PROJECT_COMPARE_JSON,
    // FETCH_PROJECT_SNOOBI_LIST,
    // FETCH_PROJECT_SNOOBI_GRAPH,
    // FETCH_PROJECT_SNOOBI_MOST_REQUESTED_PROJECTS
} from '../actions/action_project';



const INITIAL_STATE = {
    list: [], // List all the Projects
    current: [],  // Current Project User is Viewing
    formdata: [],
    offer_request_details_list: [],
    snoobi_data: [],
    compare_json: [],
    // snoobi_list: [],
    // snoobi_graph: [],
    // snoobi_most_requested_projects: []
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
            return {...state, current: [], compare_json: [] };            
        case FETCH_PROJECT_FORMDATA:
            return {...state, formdata: action.payload.data };    
        case FETCH_PROJECT_OFFER_REQUEST_DETAILS_LIST:
            return {...state, offer_request_details_list: action.payload.data };
        case FETCH_PROJECT_SNOOBI_DATA:
            return {...state, snoobi_data: action.payload.data };
        case FETCH_PROJECT_COMPARE_JSON:
            return {...state, compare_json: action.payload.data };            
        // case FETCH_PROJECT_SNOOBI_LIST:
        //     return {...state, snoobi_list: action.payload.data };
        // case FETCH_PROJECT_SNOOBI_GRAPH:
        //     return {...state, snoobi_graph: action.payload.data };
        // case FETCH_PROJECT_SNOOBI_MOST_REQUESTED_PROJECTS:
        //     return {...state, snoobi_most_requested_projects: action.payload.data };                                    
        default:
            return state;
    }
}
