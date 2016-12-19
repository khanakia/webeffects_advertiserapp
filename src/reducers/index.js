import { combineReducers } from 'redux';
import AppdataReducer from './reducer_appdata';
import ProjectReducer from './reducer_project';

const rootReducer = combineReducers({
  appdata: AppdataReducer,
  project: ProjectReducer,
});

export default rootReducer;
