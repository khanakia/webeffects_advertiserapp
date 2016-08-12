export const FETCH_TASKLIST = 'FETCH_TASKLIST';
export const FETCH_TASKLIST_TASKS = 'FETCH_TASKLIST_TASKS';

export function fetchTasklist(data) {
  return {
    type: FETCH_TASKLIST,
    payload: data
  };
}


export function fetchTasklist_Tasks(data) {
  return {
    type: FETCH_TASKLIST_TASKS,
    payload: data
  };
}
