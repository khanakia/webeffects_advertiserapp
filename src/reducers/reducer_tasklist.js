import {
    FETCH_TASKLISTS_TEMPLATES,
} from '../actions/action_tasklist';


const INITIAL_STATE = {
    list_templates: [], // List all the Projects
};


export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case FETCH_TASKLISTS_TEMPLATES:
            return {...state, list_templates: action.payload.data };
        default:
            return state;
    }
}
