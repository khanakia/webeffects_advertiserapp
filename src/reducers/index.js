import { combineReducers } from 'redux';
import PostsReducer from './reducer_orgs';
import CompaniesReducer from './reducer_company';
import HeaderReducer from './reducer_header';



const rootReducer = combineReducers({
  posts: PostsReducer, //<-- Posts
  companies: CompaniesReducer,
  header: HeaderReducer

});

export default rootReducer;
