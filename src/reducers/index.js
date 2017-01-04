import { combineReducers } from 'redux';
import AppdataReducer from './reducer_appdata';
import ProjectReducer from './reducer_project';

import ContactReducer from './reducer_contact';

const rootReducer = combineReducers({
  appdata: AppdataReducer,
  project: ProjectReducer,
  contact: ContactReducer
});

export default rootReducer;
