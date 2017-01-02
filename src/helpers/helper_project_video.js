import {
        API_URL_PROJECT_VIDEOS, 
        
    } from '../config.js'


export default class ProjectVideoHelper {
    constructor() {

    }

    static delete(id) {
        return axios({
            method: 'delete',
            url: API_URL_PROJECT_VIDEOS + '/' + id,
            // headers: Auth.header(),
        });
    }

  
}

