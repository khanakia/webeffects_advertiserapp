import { combineReducers } from 'redux';
import PostsReducer from './reducer_orgs';

const rootReducer = combineReducers({
  posts: PostsReducer, //<-- Posts

});

export default rootReducer;
