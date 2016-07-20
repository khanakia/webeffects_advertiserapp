import {
	FETCH_POSTS_SUCCESS
} from '../actions/organizations';

export default function (state = "Header1", action) {
  switch(action.type) {
  case FETCH_POSTS_SUCCESS:// start fetching posts and set loading = true
    return "Header Changed"
  default:
    return state;
  }
}
