import axios from 'axios';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const FETCH_PROJECT_CURRENT = 'FETCH_PROJECT_CURRENT';
export const FETCH_PROJECT_FORMDATA = 'FETCH_PROJECT_FORMDATA';
export const FETCH_PROJECT_OFFER_REQUEST_DETAILS_LIST='FETCH_PROJECT_OFFER_REQUEST_DETAILS_LIST'

export const FETCH_PROJECT_SNOOBI_DATA='FETCH_PROJECT_SNOOBI_DATA'
export const FETCH_PROJECT_COMPARE_JSON='FETCH_PROJECT_COMPARE_JSON'
// export const FETCH_PROJECT_SNOOBI_LIST='FETCH_PROJECT_SNOOBI_LIST'
// export const FETCH_PROJECT_SNOOBI_GRAPH='FETCH_PROJECT_SNOOBI_GRAPH'
// export const FETCH_PROJECT_SNOOBI_MOST_REQUESTED_PROJECTS='FETCH_PROJECT_SNOOBI_MOST_REQUESTED_PROJECTS'


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

export function fetchProjectFormdata(site_id) {
    const request = ProjectHelper.formdata(site_id);
    return {
        type: FETCH_PROJECT_FORMDATA,
        payload: request
    }
}



export function fetchOfferRequestDetailsList(project_id, page) {
    const request = ProjectHelper.getOfferRequestDetails(project_id, page);
    return {
        type: FETCH_PROJECT_OFFER_REQUEST_DETAILS_LIST,
        payload: request
    }
}


export function fetchSnoobiData(project_id, page, args={}) {
    const request = ProjectHelper.getSnoobiData(project_id, page, args);
    return {
        type: FETCH_PROJECT_SNOOBI_DATA,
        payload: request
    }
}

export function fetchCompareJson(project_id) {
    const request = ProjectHelper.compare_json(project_id);
    return {
        type: FETCH_PROJECT_COMPARE_JSON,
        payload: request
    }
}

// export function fetchSnoobiList(project_id, page, args={}) {
//     const request = ProjectHelper.getSnoobiList(project_id, page, args);
//     return {
//         type: FETCH_PROJECT_SNOOBI_LIST,
//         payload: request
//     }
// }

// export function fetchSnoobiGraph(project_id) {
//     const request = ProjectHelper.getSnoobiGraph(project_id);
//     return {
//         type: FETCH_PROJECT_SNOOBI_GRAPH,
//         payload: request
//     }
// }

// export function fetchSnoobiMostRequestedProjects(project_id) {
//     const request = ProjectHelper.getSnoobiMostRequestedProjects(project_id);
//     return {
//         type: FETCH_PROJECT_SNOOBI_MOST_REQUESTED_PROJECTS,
//         payload: request
//     }
// }