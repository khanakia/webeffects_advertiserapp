import {
	FETCH_TAGS, FILTER_TAGS, SELECT_TAG
} from '../actions/action_tag';


  const INITIAL_STATE = { list: {data: []},
              newTag:{tag:null, error: null, loading: false}, 
              activeTag:{tag: [], tasks:[], error:null, loading: false}, 
              deletedTag: {tag: null, error:null, loading: false},
              filterTags: {tag_title: null},
              selectedTags: {tags: []}
            };
export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_TAGS:
    return { ...state, list: {data:action.payload.data} };

  case FILTER_TAGS:
    return { ...state, filterTags: action.payload }; 

  case SELECT_TAG:
    
    return { ...state, selectedTags: {tags:[...state.selectedTags.tags, action.payload]} };    

  default:
    return state;
  }
}
