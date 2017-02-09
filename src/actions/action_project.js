import axios from 'axios';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const FETCH_PROJECT_CURRENT = 'FETCH_PROJECT_CURRENT';
export const FETCH_PROJECT_FORMDATA = 'FETCH_PROJECT_FORMDATA';
export const FETCH_PROJECT_OFFER_REQUEST_DETAILS_LIST='FETCH_PROJECT_OFFER_REQUEST_DETAILS_LIST'

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


export function createProject() {
    
    return {
        type: CREATE_PROJECT,
        payload: 'new'
    };
}

export function fetchProjectRevision(project_id) {
    const request = ProjectHelper.showRevision(project_id);
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



export function fetchOfferRequestDetailsList(project_id, date) {
    const request = ProjectHelper.getOfferRequestDetails(project_id, date);
    return {
        type: FETCH_PROJECT_OFFER_REQUEST_DETAILS_LIST,
        payload: request
    }
}