import {
	FETCH_COMPANIES
} from '../actions/action_company';


	const INITIAL_STATE = { companiesList: {companies: [], error:null, loading: false},  
						};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_COMPANIES:// start fetching posts and set loading = true
    return { ...state, companiesList: {companies:[], error: null, loading: true} }; 
  // case FETCH_COMPANIES_SUCCESS:// return list of posts and make loading = false
  //   return { ...state, companiesList: {companies: action.payload.data, error:null, loading: false} };
  // case FETCH_COMPANIES_FAILURE:// return error and make loading = false
  //   error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
  //   return { ...state, companiesList: {companies: [], error: error, loading: false} };
  // case RESET_COMPANIES:// reset postList to initial state
  //   return { ...state, companiesList: {companies: [], error:null, loading: false} };

  default:
    return state;
  }
}
