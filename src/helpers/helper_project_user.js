import {
        API_URL_PROJECT_USER, 
        
    } from '../config.js'



import Auth from './auth.js'

export default class ProjectHelper {
    constructor() {

    }

    static index(project_id) {
        return axios({
            method: 'get',
            url: API_URL_PROJECT_USER,
            headers: Auth.header(),
            params: {
                project_id : project_id
            },
        });
    }

}

