import {
        ROOT_HOST,
        API_URL_USER,
        API_URL_CHANGE_PWD,
        API_URL_CHANGE_PWD_FIRSTLOGIN,
        API_URL_UPDATE_USER,
        API_URL_USER_DISABLE_REMINDER,
        API_URL_USER_ENABLE_REMINDER
    } from '../config.js'


import Auth from './auth.js'

export default class UserHelper {
    constructor() {

    }


    static showCurrent() {
        return axios({
            method: 'get',
            url: API_URL_USER + '/show_current',
            headers: Auth.header(),
        });
    }

    static changePasswordFirstlogin(param) {
        return axios({
            method: 'post',
            url: API_URL_CHANGE_PWD_FIRSTLOGIN ,
            headers: Auth.header(),
            data : param,
        });
    }

    static changePassword(param) {
        return axios({
            method: 'post',
            url: API_URL_CHANGE_PWD ,
            headers: Auth.header(),
            data : param,
        });
    }

    static update(param) {
        return axios({
            method: 'post',
            url: API_URL_UPDATE_USER ,
            headers: Auth.header(),
            data : param,
        });
    }

    static disableEmailReminder() {
        return axios({
            method: 'post',
            url: API_URL_USER_DISABLE_REMINDER ,
            headers: Auth.header(),
            // data : param,
        });
    }

    static enableEmailReminder() {
        return axios({
            method: 'post',
            url: API_URL_USER_ENABLE_REMINDER ,
            headers: Auth.header(),
            // data : param,
        });
    }
   
}

