import {
        API_URL_CATEGORY, 
    } from '../config.js'


import Auth from './auth.js'

export default class CategoryHelper {
    constructor() {

    }

    static index(project_id, object_type) {
        return axios({
            method: 'get',
            url: API_URL_CATEGORY,
            headers: Auth.header(),
            params: {
                project_id : project_id,
                object_type : object_type
            }
        });
    }

    // static show(id) {
    //     return axios({
    //         method: 'get',
    //         url: API_URL_CATEGORY + '/' + id,
    //         headers: Auth.header(),
    //     });
    // }

    static store(data) {
        return axios({
            method: 'post',
            url: API_URL_CATEGORY,
            headers: Auth.header(),
            data: data
        });
    }

    static update(data) {
        const dataJson = URI.parseQuery(data);
        return axios({
            method: 'put',
            url: API_URL_CATEGORY + '/' + dataJson.id,
            headers: Auth.header(),
            data: data
        });
    }


    static save(data) {
        const dataJson = URI.parseQuery(data);
        if (dataJson.id) {
            var ajaxObj = CategoryHelper.update(data);
        } else {
            var ajaxObj = CategoryHelper.store(data);
        }
        return ajaxObj;
    }

    static delete(id) {
        return axios({
            method: 'delete',
            url: API_URL_CATEGORY + '/' + id,
            headers: Auth.header(),
        });
    }
  
}

