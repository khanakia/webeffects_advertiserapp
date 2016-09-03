import {
    FETCH_COMPANIES,
    FILTER_COMPANY_LIST
} from '../actions/action_company';


const INITIAL_STATE = {
    list: { data: [] },
    filter_companylist_params : []
};

export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {

        case FETCH_COMPANIES:
            return {...state, list: { data: action.payload.data } };
		case FILTER_COMPANY_LIST:
            return {...state, filter_companylist_params: action.payload };            
        default:
            return state;
    }
}
