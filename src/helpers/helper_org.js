import {
        ROOT_HOST,
        API_URL_ORG, 
        API_URL_ORG_SHOWCURRENT,
        API_URL_ORG_UPDATE_CUSTOMDOMAIN_FN,
        API_URL_ORG_UPDATE_SUBDOMAIN_FN,
        API_URL_ORG_USER_INDEX, 
        API_URL_ORG_INVITE_USER,
        API_URL_GETALLORGSBYEMAIL,
        API_URL_GETORG_BYDOMAIN,
        API_URL_DOMAIN,
        API_URL_ORG_SWITCH
    } from '../config.js'


import Auth from './auth.js'
import Util from './util.js'

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
            var ajaxObj = OrgHelper.update(data);
        } else {
            var ajaxObj = OrgHelper.store(data);
        }
        return ajaxObj;
    }


    static showCurrent() {
        return axios({
            method: 'get',
            url: API_URL_ORG_SHOWCURRENT,
            headers: Auth.header(),
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

    static updateDomain(data) {
        return  axios({
            method: 'post',
            url: API_URL_ORG_UPDATE_CUSTOMDOMAIN_FN(data.id),
            headers: Auth.header(),
            data : data
        });
    }

    static updateSubdomain(data) {
        return  axios({
            method: 'post',
            url: API_URL_ORG_UPDATE_SUBDOMAIN_FN(data.id),
            headers: Auth.header(),
            data : data
        });
    }


    static switchOrg(org_id) {
        return  axios({
            method: 'post',
            url: API_URL_ORG_SWITCH + '/' + org_id,
            headers: Auth.header(),
            data : {
                switch_org_id : org_id
            }
        });
    }


    // UTILITY FUNCTIONS STARTS HERE
    
    // GET ORG LOGIN URL Based on SLUG AND CUSTOM DOMAIN
    static getLoginURL(org) {
        let url = org.subdomain_slug+'.'+ROOT_HOST;
        if (!Util.isEmpty(org.custom_domain))  {
            url = org.custom_domain;
        }

        return 'http://'+url;
    }
}

