import {
        API_URL_PROJECT_IFRAMES, 
        
    } from '../config.js'


export default class ProjectIframeHelper {
    constructor() {

    }

    static delete(id) {
        return axios({
            method: 'delete',
            url: API_URL_PROJECT_IFRAMES + '/' + id,
            // headers: Auth.header(),
        });
    }

  
}

