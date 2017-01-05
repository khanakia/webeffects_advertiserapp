import {
        API_URL_PROJECT_PARKINGS, 
        
    } from '../config.js'


export default class ProjectParkingHelper {
    constructor() {

    }

    static index() {
        return axios({
            method: 'get',
            url: API_URL_PROJECT_PARKINGS,
            headers: Auth.header(),
        });
    }

    static show(id) {
        return axios({
            method: 'get',
            url: API_URL_PROJECT_PARKINGS + '/' + id,
            headers: Auth.header(),
        });
    }

    static store(data) {
        return axios({
            method: 'post',
            url: API_URL_PROJECT_PARKINGS,
            headers: Auth.header(),
            data: data
        });
    }

    static update(data) {
        const dataJson = URI.parseQuery(data);

        return axios({
            method: 'put',
            url: API_URL_PROJECT_PARKINGS + '/' + dataJson.id,
            headers: Auth.header(),
            data: data
        });
    }


    static save(data) {
        const dataJson = URI.parseQuery(data);
        if (dataJson.id) {
            var ajaxObj = ProjectHelper.update(data);
        } else {
            var ajaxObj = ProjectHelper.store(data);
        }
        return ajaxObj;
    }


    static delete(id) {
        return axios({
            method: 'delete',
            url: API_URL_PROJECT_PARKINGS + '/' + id,
            headers: Auth.header(),
        });
    }

}

