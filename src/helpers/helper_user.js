import {
        ROOT_HOST,
        API_URL_USER, 
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

   
}

