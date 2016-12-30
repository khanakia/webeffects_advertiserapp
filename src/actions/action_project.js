import axios from 'axios';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_PROJECT_CURRENT = 'FETCH_PROJECT_CURRENT';
export const FETCH_PROJECT_FORMDATA = 'FETCH_PROJECT_FORMDATA';

import {AuthHelper, ProjectHelper} from '../helpers'

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

export function fetchProjectFormdata() {
    const request = ProjectHelper.formdata();
    return {
        type: FETCH_PROJECT_FORMDATA,
        payload: request
    }
}