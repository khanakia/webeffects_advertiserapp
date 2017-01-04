import {
        API_URL_CONTACTS, 
    } from '../config.js'


export default class ContactHelper {
    constructor() {

    }

    static index() {
        return axios({
            method: 'get',
            url: API_URL_CONTACTS,
            headers: Auth.header(),
        });
    }

    static show(id) {
        return axios({
            method: 'get',
            url: API_URL_CONTACTS + '/' + id,
            headers: Auth.header(),
        });
    }

    static store(data) {
        return axios({
            method: 'post',
            url: API_URL_CONTACTS,
            headers: Auth.header(),
            data: data
        });
    }

    static update(data) {
        const dataJson = URI.parseQuery(data);

        return axios({
            method: 'put',
            url: API_URL_CONTACTS + '/' + dataJson.id,
            headers: Auth.header(),
            data: data
        });
    }

    static saveAll(data) {
        return axios({
            method: 'post',
            url: API_URL_CONTACTS + '/saveall',
            headers: Auth.header(),
            data: data
        });
    }


    static save(data) {
        const dataJson = URI.parseQuery(data);
        if (dataJson.id) {
            var ajaxObj = ContactHelper.update(data);
        } else {
            var ajaxObj = ContactHelper.store(data);
        }
        return ajaxObj;
    }


    static delete(id) {
        return axios({
            method: 'delete',
            url: API_URL_CONTACTS + '/' + id,
            headers: Auth.header(),
        });
    }


}

