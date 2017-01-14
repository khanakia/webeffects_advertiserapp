import {
        ROOT_HOST,
        API_URL_RESET_PWD,

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
}

