import {AppdataAction} from '../actions';

const {
    FETCH_APPDATA_CURRENTUSER
} = AppdataAction;


const INITIAL_STATE = {
    current_user: [],
};


export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case FETCH_APPDATA_CURRENTUSER:
            return {...state, current_user: action.payload.data };

        default:
            return state;
    }
}
