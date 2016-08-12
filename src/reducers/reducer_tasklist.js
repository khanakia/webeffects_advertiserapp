import {
	FETCH_TASKLIST, FETCH_TASKLIST_TASKS
} from '../actions/action_tasklist';


  const INITIAL_STATE = { tasklistList: {tasklists: [], error:null, loading: false},  
              newTasklist:{tasklist:null, error: null, loading: false}, 
              activeTasklist:{tasklist: [], tasks:[], error:null, loading: false}, 
              deletedTasklist: {tasklist: null, error:null, loading: false},
            };
export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_TASKLIST:
    return { ...state, activeTasklist: {tasklist:action.payload.data, tasks:[]} };
  case FETCH_TASKLIST_TASKS:
    return { ...state, activeTasklist : {tasklist:state.activeTasklist.tasklist, tasks : action.payload.data}};

  default:
    return state;
  }
}
