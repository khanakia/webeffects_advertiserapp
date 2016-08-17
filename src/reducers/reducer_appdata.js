import {action_appdata} from '../actions';

const {
    FETCH_APPDATA_CURRENTORG,
    FETCH_APPDATA_CURRENTUSER
} = action_appdata;


const INITIAL_STATE = {
    current_org: [],
    current_user: [],
};


export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case FETCH_APPDATA_CURRENTORG:
            return {...state, current_org: action.payload.data };
        case FETCH_APPDATA_CURRENTUSER:
            return {...state, current_user: action.payload.data };

        default:
            return state;
    }
}
