export const FETCH_TASKLISTS_TEMPLATES = 'FETCH_TASKLISTS_TEMPLATES';

import {Auth, TasklistHelper, TaskHelper } from '../helpers'


// export const FETCH_TASKLIST = 'FETCH_TASKLIST';
// export const FETCH_TASKLIST_TASKS = 'FETCH_TASKLIST_TASKS';

// export function fetchTasklist(data) {
//   return {
//     type: FETCH_TASKLIST,
//     payload: data
//   };
// }


// export function fetchTasklist_Tasks(data) {
//   return {
//     type: FETCH_TASKLIST_TASKS,
//     payload: data
//   };
// }


export function fetchTasklists_Templates(data) {
	const request = TasklistHelper.indexTemplates();
    return {
        type: FETCH_TASKLISTS_TEMPLATES,
        payload: request
    };
}
