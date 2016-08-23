import axios from 'axios';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_PROJECT_CURRENT = 'FETCH_PROJECT_CURRENT';

export const FETCH_PROJECT_USERS = 'FETCH_PROJECT_USERS';

export const FETCH_TASKLISTS = 'FETCH_TASKLISTS';
export const FETCH_TASKLIST_TASKS = 'FETCH_TASKLIST_TASKS';

export const FETCH_PROJECT_MESSAGES = 'FETCH_PROJECT_MESSAGES';
export const FETCH_PROJECT_MESSAGE = 'FETCH_PROJECT_MESSAGE';

export const FETCH_PROJECT_FILES = 'FETCH_PROJECT_FILES';
export const FETCH_PROJECT_FILE = 'FETCH_PROJECT_FILE';
export const FETCH_PROJECT_FILES_BROWSER_FORM_LIST = 'FETCH_PROJECT_FILES_BROWSER_FORM_LIST'

export const FETCH_COMMENTS = 'FETCH_COMMENTS'

// import Auth from '../helpers/auth.js'
// import ProjectHelper from '../helpers/helper_project.js'
// import ProjectUserHelper from '../helpers/helper_project_user.js'
// import TasklistHelper from '../helpers/helper_tasklist.js'

import {Auth, ProjectHelper, ProjectMessageHelper, ProjectFileHelper, ProjectUserHelper, TasklistHelper, CommentHelper} from '../helpers'

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
        type: FETCH_PROJECT_CURRENT,
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

export function fetchProjectMessages(project_id) {
    const request = ProjectMessageHelper.index(project_id);
    return {
        type: FETCH_PROJECT_MESSAGES,
        payload: request
    };
}

export function fetchProjectMessage(id) {
    const request = ProjectMessageHelper.show(id);
    return {
        type: FETCH_PROJECT_MESSAGE,
        payload: request
    };
}



export function fetchProjectFiles(project_id) {
    const request = ProjectFileHelper.index(project_id);
    return {
        type: FETCH_PROJECT_FILES,
        payload: request
    };
}

export function fetchProjectFile(id) {
    const request = ProjectFileHelper.show(id);
    return {
        type: FETCH_PROJECT_FILE,
        payload: request
    };
}

export function fetchProjectFilesBrowserFormList(project_id, extraParams={}) {
    const request = ProjectFileHelper.index(project_id, extraParams);
    return {
        type: FETCH_PROJECT_FILES_BROWSER_FORM_LIST,
        payload: request
    };
}


export function fetchComments(project_id, object_type, object_id) {
    const request = CommentHelper.index(project_id, object_type, object_id);
    return {
        type: FETCH_COMMENTS,
        payload: request
    };
}