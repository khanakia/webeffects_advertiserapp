import {
        API_URL_ATTACHMENTS, 
    } from '../config.js'


export default class AttachmentHelper {
    constructor() {

    }

    static index() {
        return axios({
            method: 'get',
            url: API_URL_ATTACHMENTS,
            headers: Auth.header(),
        });
    }

    static show(id) {
        return axios({
            method: 'get',
            url: API_URL_ATTACHMENTS + '/' + id,
            headers: Auth.header(),
        });
    }

    static store(data) {
        return axios({
            method: 'post',
            url: API_URL_ATTACHMENTS,
            headers: Auth.header(),
            data: data
        });
    }

    static update(data) {
        const dataJson = URI.parseQuery(data);

        return axios({
            method: 'put',
            url: API_URL_ATTACHMENTS + '/' + dataJson.id,
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
            url: API_URL_ATTACHMENTS + '/' + id,
            headers: Auth.header(),
        });
    }


    static updateTitle(attachment_id, title) {
        return axios({
            method: 'post',
            url: API_URL_ATTACHMENTS + '/' + attachment_id + '/update_title',
            headers: Auth.header(),
            data: {
                title: title
            }
        });
    }

}

