import {
        API_URL_PROJECT_ACTIVITY, 
        
    } from '../config.js'



import Auth from './auth.js'

export default class ProjectActivityHelper {
    constructor() {

    }

    static index() {
        return axios({
            method: 'get',
            url: API_URL_PROJECT_ACTIVITY,
            headers: Auth.header(),
        });
    }

}

