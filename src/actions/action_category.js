//Post list
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORIES_TYPE_PROJECT = 'FETCH_CATEGORIES_TYPE_PROJECT';
export const FETCH_CATEGORIES_TYPE_MESSAGE = 'FETCH_CATEGORIES_TYPE_MESSAGE';
export const FETCH_CATEGORIES_TYPE_FILE = 'FETCH_CATEGORIES_TYPE_FILE';

import { CategoryHelper } from '../helpers'


export function fetchCategories(project_id, type='') {
    const request = CategoryHelper.index(project_id, type);
    return {
        type: FETCH_CATEGORIES,
        payload: request
    };
}

export function fetchCategoriesTypeProjects(project_id) {
    const request = CategoryHelper.index(project_id,'project');
    return {
        type: FETCH_CATEGORIES_TYPE_PROJECT,
        payload: request
    };
}

export function fetchCategoriesTypeMessage(project_id) {
    const request = CategoryHelper.index(project_id,'message');
    return {
        type: FETCH_CATEGORIES_TYPE_MESSAGE,
        payload: request
    };
}


export function fetchCategoriesTypeFile(project_id) {
    const request = CategoryHelper.index(project_id,'file');
    return {
        type: FETCH_CATEGORIES_TYPE_FILE,
        payload: request
    };
}
