import {
        API_URL_PROJECT_USER, 
        
    } from '../config.js'



import Auth from './auth.js'

export default class ProjectUserHelper {
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


    // static index_not_assigned(project_id) {
    //     return axios({
    //         method: 'get',
    //         url: API_URL_PROJECT_USER_NOT_ASSIGNED,
    //         headers: Auth.header(),
    //         params: {
    //             project_id : project_id
    //         },
    //     });
    // }

    static store(data) {
        return axios({
            method: 'post',
            url: API_URL_PROJECT_USER,
            headers: Auth.header(),
            data: data
        });
    }

    static delete(id) {
        return axios({
            method: 'delete',
            url: API_URL_PROJECT_USER + '/' + id,
            headers: Auth.header(),
        });
    }
}

