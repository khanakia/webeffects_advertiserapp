import {
        API_URL_PROJECT_MESSAGE, 
    } from '../config.js'

import Auth from './auth.js'

export default class ProjectMessageHelper {
    constructor() {

    }

    static index(project_id) {
        return axios({
            method: 'get',
            url: API_URL_PROJECT_MESSAGE,
            headers: Auth.header(),
            params: {
                project_id : project_id
            },
        });
    }


    // static index_not_assigned(project_id) {
    //     return axios({
    //         method: 'get',
    //         url: API_URL_PROJECT_MESSAGE_NOT_ASSIGNED,
    //         headers: Auth.header(),
    //         params: {
    //             project_id : project_id
    //         },
    //     });
    // }

    static show(id) {
        return axios({
            method: 'get',
            url: API_URL_PROJECT_MESSAGE + '/' + id,
            headers: Auth.header(),
        });
    }
    
    static store(data) {
        return axios({
            method: 'post',
            url: API_URL_PROJECT_MESSAGE,
            headers: Auth.header(),
            data: data
        });
    }

    static update(data) {
        const dataJson = URI.parseQuery(data);
        return axios({
            method: 'put',
            url: API_URL_PROJECT_MESSAGE + '/' + dataJson.id,
            headers: Auth.header(),
            data: data
        });
    }

    static save(data) {
        const dataJson = URI.parseQuery(data);
        if (dataJson.id) {
            var ajaxObj = ProjectMessageHelper.update(data);
        } else {
            var ajaxObj = ProjectMessageHelper.store(data);
        }
        return ajaxObj;
    }

    static delete(id) {
        return axios({
            method: 'delete',
            url: API_URL_PROJECT_MESSAGE + '/' + id,
            headers: Auth.header(),
        });
    }
}

