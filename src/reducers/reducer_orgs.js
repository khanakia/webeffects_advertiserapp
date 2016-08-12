import {
    FETCH_ORGS,
    FETCH_ORG_CURRENT,
    RESET_ORGS,
    ADD_ORG
} from '../actions/action_organization';


// const INITIAL_STATE = {
//     orgsList: { orgs: [], error: null, loading: false },
// };

const INITIAL_STATE = {
    list: { data: []},
    current: { data: []},
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

        case ADD_ORG: // return list of orgs and make loading = false
            return {...state, orgsList: { orgs: action.payload.data, error: null, loading: false } };

        // case FETCH_ORGS_FAILURE: // return error and make loading = false
        //     error = action.payload.data || { message: action.payload.message }; //2nd one is network or server down errors
        //     return {...state, orgsList: { orgs: [], error: error, loading: false } };
        // case RESET_ORGS: // reset postList to initial state

        //     return {...state, orgsList: { orgs: [], error: null, loading: false } };

        default:
            return state;
    }
}
