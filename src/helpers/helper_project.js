import {
        API_URL_PROJECT, 
        API_URL_PROJECT_FORMDATA,
        API_URL_PROJECT_UPDATE_STATUS
    } from '../config.js'


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

    static showRevision(id) {
        return axios({
            method: 'get',
            url: API_URL_PROJECT + '/' + id + '/show_revision',
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
        const dataJson = URI.parseQuery(data);

        return axios({
            method: 'put',
            url: API_URL_PROJECT + '/' + dataJson.id,
            headers: Auth.header(),
            data: data
        });
    }


    static save(data) {
        return axios({
            method: 'post',
            url: API_URL_PROJECT + '/save',
            headers: Auth.header(),
            data: data
        });
    }

     static saveRevision(data) {
        return axios({
            method: 'post',
            url: API_URL_PROJECT + '/save_revision',
            headers: Auth.header(),
            data: data
        });
    }


    static delete(id) {
        return axios({
            method: 'delete',
            url: API_URL_PROJECT + '/' + id,
            headers: Auth.header(),
        });
    }


    // static getOfferRequestDetails(project_id, date=null) {
    //     return axios({
    //         method: 'post',
    //         url: API_URL_PROJECT + '/' + project_id + '/offer_request_details',
    //         data: {
    //             date: date
    //         },
    //         headers: Auth.header(),
    //     });
    // }

    static getOfferRequestDetails(project_id, page=1) {
        return axios({
            method: 'post',
            url: API_URL_PROJECT + '/' + project_id + '/offer_request_details',
            data: {
                page: page
            },
            headers: Auth.header(),
        });
    }

    static updateContact(project_id, contact_id) {
        return axios({
            method: 'post',
            url: API_URL_PROJECT + '/' + project_id + '/update_contact',
            headers: Auth.header(),
            data: {
                contact_id: contact_id
            }
        });
    }

    static formdata(site_id) {
        return axios({
            method: 'post',
            data: {
                site_id: site_id
            },
            url: API_URL_PROJECT_FORMDATA,
            headers: Auth.header(),
        });
    }

    static updateStatus(project_id,project_status_id) {
        return axios({
            method: 'post',
            url: API_URL_PROJECT + '/' + project_id + '/update_status',
            headers: Auth.header(),
            data: {
                project_status_id: project_status_id
            }
        });
    }



    static getSnoobiData(project_id, page=1, args={}) {
        console.log(args)
        return axios({
            method: 'post',
            url: API_URL_PROJECT + '/' + project_id + '/snoobi',
            data: {
                page: page,
                args: args,
                site_id: Env.site_id
            },
            headers: Auth.header(),
        });
    }


    // static getSnoobiList(project_id, page=1, args={}) {
    //     console.log(args)
    //     return axios({
    //         method: 'post',
    //         url: API_URL_PROJECT + '/' + project_id + '/snoobi',
    //         data: {
    //             page: page,
    //             args: args,
    //         },
    //         headers: Auth.header(),
    //     });
    // }


    // static getSnoobiGraph(project_id) {
    //     return axios({
    //         method: 'post',
    //         data: {
    //             site_id: Env.site_id
    //         },
    //         url: API_URL_PROJECT + '/' + project_id + '/snoobi/graph',
    //         headers: Auth.header(),
    //     });
    // }

    // static getSnoobiMostRequestedProjects(project_id) {
    //     return axios({
    //         method: 'post',
    //         url: API_URL_PROJECT + '/' + project_id + '/snoobi/get_most_offer_requested_projects',
    //         headers: Auth.header(),
    //     });
    // }
}