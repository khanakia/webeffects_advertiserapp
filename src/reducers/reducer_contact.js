import {
    FETCH_CONTACTS,    
} from '../actions/action_contact';



const INITIAL_STATE = {
    list: [], // List all the Projects
};


export default function(state = INITIAL_STATE, action) {
    let error;
    
    if(undefined==action.payload) {
        return state;
    }
    
    switch (action.type) {
        case FETCH_CONTACTS:
            return {...state, list: action.payload.data };
        default:
            return state;
    }
}
