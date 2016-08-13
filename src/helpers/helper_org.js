import {
        API_URL_ORG, 
        API_URL_ORG_USER_INDEX, 
        API_URL_ORG_INVITE_USER,
        API_URL_GETALLORGSBYEMAIL,
        API_URL_GETORG_BYDOMAIN
    } from '../config.js'
import Auth from './auth.js'

export default class OrgHelper {
    constructor() {

    }

    static index() {
        return axios({
            method: 'get',
            url: API_URL_ORG,
            headers: Auth.header(),
        });
    }

    static show(id) {
        return axios({
            method: 'get',
            url: API_URL_ORG + '/' + id,
            headers: Auth.header(),
        });
    }

    static store(data) {
        return axios({
            method: 'post',
            url: API_URL_ORG,
            headers: Auth.header(),
            data: data
        });
    }

    static update(data) {
        return axios({
            method: 'put',
            url: API_URL_ORG + '/' + data.id,
            headers: Auth.header(),
            data: data
        });
    }


    static inviteUsers(data) {
        return axios({
            method: 'post',
            url: API_URL_ORG_INVITE_USER,
            headers: Auth.header(),
            data: data
        });
    }

    static getAllOrgsByEmail(email) {
        return axios({
            method: 'get',
            params: {
                email : email
            },
            url: API_URL_GETALLORGSBYEMAIL,
        });
    }


    static getOrgsByDomain(domain) {
        return axios({
            method: 'get',
            params: {
                domain : domain
            },
            url: API_URL_GETORG_BYDOMAIN,
        });
    }

}
