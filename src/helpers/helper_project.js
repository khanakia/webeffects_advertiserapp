import {
        API_URL_PROJECT, 
        
    } from '../config.js'



import Auth from './auth.js'

export default class ProjectHelper {
    constructor() {

    }

    static index() {
        return axios({
            method: 'get',
            url: API_URL_PROJECT,
            headers: Auth.header(),
        });
    }

    static show(id) {
        return axios({
            method: 'get',
            url: API_URL_PROJECT + '/' + id,
            headers: Auth.header(),
        });
    }

    static store(data) {
        return axios({
            method: 'post',
            url: API_URL_PROJECT,
            headers: Auth.header(),
            data: data
        });
    }

    static update(data) {
        data.start_date = moment(new Date(data.start_date)).format('YYYY-MM-DD');
        data.end_date = moment(new Date(data.end_date)).format('YYYY-MM-DD');
        return axios({
            method: 'put',
            url: API_URL_PROJECT + '/' + data.id,
            headers: Auth.header(),
            data: data
        });
    }


    // static getPeoplesOnProject(project_id) {
    //     return axios({
    //         method: 'get',
    //         params: {
    //             project_id : project_id
    //         },
    //         url: API_URL_GETALLORGSBYEMAIL,
    //     });
    // }
}

