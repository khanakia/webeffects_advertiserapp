import {action_organization} from '../actions';

const {
    FETCH_ORGS,
    FETCH_ORG_CURRENT,
    FETCH_ORG_USERS,
    RESET_ORGS,
    ADD_ORG,
    FILTER_ORG_LIST,
    FILTER_ORG_USER_LIST
} = action_organization;


// const INITIAL_STATE = {
//     orgsList: { orgs: [], error: null, loading: false },
// };

const INITIAL_STATE = {
    list: { data: []},
    current: { data: []},
    userlist : { data: []},
    filter_orglist_params : [],
    filter_orguserlist_params : []
};


export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case FETCH_ORGS: // start fetching orgs and set loading = true
            // return {...state, orgsList: { orgs: [], error: null, loading: true } };
            return {...state, list: { data: action.payload.data } };
        // case FETCH_ORGS_SUCCESS: // return list of orgs and make loading = false
        //     return {...state, orgsList: { orgs: action.payload.data, error: null, loading: false } };

        case FETCH_ORG_CURRENT: // start fetching orgs and set loading = true
            // return {...state, orgsList: { orgs: [], error: null, loading: true } };
            return {...state, current: { data: action.payload } };

        case FETCH_ORG_USERS: // start fetching orgs and set loading = true
            // return {...state, orgsList: { orgs: [], error: null, loading: true } };
            return {...state, userlist: { data: action.payload.data } };

        case ADD_ORG: // return list of orgs and make loading = false
            return {...state, orgsList: { orgs: action.payload.data, error: null, loading: false } };
        case FILTER_ORG_LIST:
            return {...state, filter_orglist_params: action.payload };
        case FILTER_ORG_USER_LIST:
            return {...state, filter_orguserlist_params: action.payload };            
            
        // case FETCH_ORGS_FAILURE: // return error and make loading = false
        //     error = action.payload.data || { message: action.payload.message }; //2nd one is network or server down errors
        //     return {...state, orgsList: { orgs: [], error: error, loading: false } };
        // case RESET_ORGS: // reset postList to initial state

        //     return {...state, orgsList: { orgs: [], error: null, loading: false } };

        default:
            return state;
    }
}
