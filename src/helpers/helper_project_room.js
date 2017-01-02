import {
        API_URL_PROJECT_ROOMS, 
        
    } from '../config.js'


export default class ProjectRoomHelper {
    constructor() {

    }

    static delete(id) {
        return axios({
            method: 'delete',
            url: API_URL_PROJECT_ROOMS + '/' + id,
            // headers: Auth.header(),
        });
    }

  
}

