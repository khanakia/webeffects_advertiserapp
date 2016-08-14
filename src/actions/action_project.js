import axios from 'axios';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_PROJECT = 'FETCH_PROJECT';

export const FETCH_PROJECT_USERS = 'FETCH_PROJECT_USERS';

export const FETCH_TASKLISTS = 'FETCH_TASKLISTS';
export const FETCH_TASKLIST_TASKS = 'FETCH_TASKLIST_TASKS';

import Auth from '../helpers/auth.js'

import ProjectHelper from '../helpers/helper_project.js'
import ProjectUserHelper from '../helpers/helper_project_user.js'
import TasklistHelper from '../helpers/helper_tasklist.js'

export function fetchProjects() {
    const request = ProjectHelper.index();
    return {
        type: FETCH_PROJECTS,
        payload: request
    };
}

export function fetchProject(project_id) {
    const request = ProjectHelper.show(project_id);
    return {
        type: FETCH_PROJECT,
        payload: request
    };
}


export function fetchProjectUsers(project_id) {
    const request = ProjectUserHelper.index(project_id);
    return {
        type: FETCH_PROJECT_USERS,
        payload: request
    };
}




export function fetchTasklists(project_id) {
    const request = TasklistHelper.index(project_id);
    return {
        type: FETCH_TASKLISTS,
        payload: request
    };
}


export function fetchTasklist_Tasks(data) {
    return {
        type: FETCH_TASKLIST_TASKS,
        payload: data
    };
}
