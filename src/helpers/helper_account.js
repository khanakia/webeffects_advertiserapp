import { Link, hashHistory } from 'react-router'
import {
        ROOT_HOST,
        API_URL_RESET_PWD,
        API_URL_USER_SWITCH_SITE

    } from '../config.js'


import Auth from './auth.js'

export default class AccountHelper {
    constructor() {

    }
    static resetPassword(param) {
        return axios({
            method: 'post',
            url: API_URL_RESET_PWD ,
            // headers: Auth.header(),
            data : param,
        });
    }

    static switch_site(project_id=null) {
        return axios({
            method: 'post',
            url: API_URL_USER_SWITCH_SITE ,
            headers: Auth.header(),
            data : {
                token: Auth.getToken(),
                project_id: project_id
            },
            }).then((response) => {
                window.location.href = response.data.url;
            }).catch(function (error) {
                toastr.error(trans.request_failed)
            });
    }
}

