import {
    FETCH_COMPANIES
} from '../actions/action_company';


const INITIAL_STATE = {
    list: { data: [] },
};

export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {

        case FETCH_COMPANIES:
            return {...state, list: { data: action.payload.data } };
        default:
            return state;
    }
}
