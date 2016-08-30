import { API_URL_ORGUSER } from '../config.js'
import Auth from './auth.js'

export default class OrgUserHelper {
    constructor() {

    }

    static index() {
        return axios({
            method: 'get',
            url: API_URL_ORGUSER,
            headers: Auth.header(),
        });
    }

    static show(id) {
        return axios({
            method: 'get',
            url: API_URL_ORGUSER + '/' + id,
            headers: Auth.header(),
        });
    }

    static store(data) {
        return axios({
            method: 'post',
            url: API_URL_ORGUSER,
            headers: Auth.header(),
            data: data
        });
    }

    static update(data) {
        const dataJson = URI.parseQuery(data);
        return axios({
            method: 'put',
            url: API_URL_ORGUSER + '/' + dataJson.id,
            headers: Auth.header(),
            data: data
        });
    }

    static updatePermission(data) {
        return axios({
            method: 'post',
            url: API_URL_ORGUSER + '/update_permission',
            headers: Auth.header(),
            data: data
        });
    }

    static removeUser(data) {
        return axios({
            method: 'post',
            url: API_URL_ORGUSER + '/remove_user',
            headers: Auth.header(),
            data: data
        });
    }
}
