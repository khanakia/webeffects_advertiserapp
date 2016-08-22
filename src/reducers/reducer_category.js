import {
    FETCH_CATEGORIES,
    FETCH_CATEGORIES_TYPE_PROJECT,
    FETCH_CATEGORIES_TYPE_MESSAGE,
    FETCH_CATEGORIES_TYPE_FILE
} from '../actions/action_category';


const INITIAL_STATE = {
    list: [],
    type_project_list : [],
    type_message_list : [],
    type_file_list : [],
};

export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {

        case FETCH_CATEGORIES:
            return {...state, list: action.payload.data }
        case FETCH_CATEGORIES_TYPE_PROJECT:
            return {...state, type_project_list: action.payload.data }
        case FETCH_CATEGORIES_TYPE_MESSAGE:
            return {...state, type_message_list: action.payload.data }
        case FETCH_CATEGORIES_TYPE_FILE:
            return {...state, type_file_list: action.payload.data }
        default:
            return state;
    }
}
