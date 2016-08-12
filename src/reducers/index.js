import { combineReducers } from 'redux';
import OrgReducer from './reducer_orgs';
import CompaniesReducer from './reducer_company';
import TasklistReducer from './reducer_tasklist';
import TagsReducer from './reducer_tag';

import HeaderReducer from './reducer_header';



const rootReducer = combineReducers({
  org: OrgReducer, //<-- Posts
  companies: CompaniesReducer,
  tasklist: TasklistReducer,
  tags_reducer: TagsReducer,
  header: HeaderReducer

});

export default rootReducer;
