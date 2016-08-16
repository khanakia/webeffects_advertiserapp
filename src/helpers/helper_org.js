import {
        ROOT_HOST,
        API_URL_ORG, 
        API_URL_ORG_USER_INDEX, 
        API_URL_ORG_INVITE_USER,
        API_URL_GETALLORGSBYEMAIL,
        API_URL_GETORG_BYDOMAIN,
        API_URL_DOMAIN
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
        const dataJson = URI.parseQuery(data);
        return axios({
            method: 'put',
            url: API_URL_ORG + '/' + dataJson.id,
            headers: Auth.header(),
            data: data
        });
    }

    static save(data) {
        const dataJson = URI.parseQuery(data);
        if (dataJson.id) {
            var ajaxObj = CompanyHelper.update(data);
        } else {
            var ajaxObj = CompanyHelper.store(data);
        }
        return ajaxObj;
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

    static updateDomain(data) {
        return  axios({
            method: 'post',
            url: API_URL_ORG + '/' + data.id + '/update_domain',
            headers: Auth.header(),
            data : data
        });
    }

    static updateSubdomain(data) {
        return  axios({
            method: 'post',
            url: API_URL_ORG + '/' + data.id + '/update_subdomain',
            headers: Auth.header(),
            data : data
        });
    }


    // UTILITY FUNCTIONS STARTS HERE
    
    // GET ORG LOGIN URL Based on SLUG AND CUSTOM DOMAIN
    static getLoginURL(org) {
        let url = org.org_slug+'.'+ROOT_HOST;
        if (org.org_domain)  {
            url = org.org_domain;
        }

        return 'http://'+url;
    }
}

