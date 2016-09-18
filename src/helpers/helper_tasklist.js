import {API_URL_TASKLIST, API_URL_TASKLIST_TEMPLATES, API_URL_TASKLIST_TASKS_FN} from '../config.js'
import Auth from './auth.js'

export default class TasklistHelper {
	constructor() {
		
	}

    static index(project_id) {
        return axios({
            method: 'get',
            url: API_URL_TASKLIST,
            headers: Auth.header(),
            params: {
                project_id : project_id
            },
        });
    }

    static indexTemplates() {
        return axios({
            method: 'get',
            url: API_URL_TASKLIST_TEMPLATES,
            headers: Auth.header(),
        });
    }

    static tasks(id) {
        return  axios({
                    method: 'get',
                    url: API_URL_TASKLIST_TASKS_FN(id),
                    headers: Auth.header(),
                  });
    }

    static updateSortOrder(data) {
        return  axios({
            method: 'post',
            url: API_URL_TASKLIST + '/update_sort_order',
            headers: Auth.header(),
            data : data
        });
    }

    static show(id) {
        return  axios({
                method: 'get',
                url: API_URL_TASKLIST + '/' + id,
                headers: Auth.header(),
            });
    }
	
    static store(data) {
        return axios({
            method: 'post',
            url: API_URL_TASKLIST,
            headers: Auth.header(),
            data: data
        });
    }

    static update(data) {
        const dataJson = URI.parseQuery(data);
        return axios({
            method: 'put',
            url: API_URL_TASKLIST + '/' + dataJson.id,
            headers: Auth.header(),
            data: data
        });
    }

    static save(data) {
        const dataJson = URI.parseQuery(data);
        if (dataJson.id) {
            var ajaxObj = TasklistHelper.update(data);
        } else {
            var ajaxObj = TasklistHelper.store(data);
        }
        return ajaxObj;
    }

    static delete(id) {
        return axios({
            method: 'delete',
            url: API_URL_TASKLIST + '/' + id,
            headers: Auth.header(),
        });
    }


    static copy_tasks_from_template(data) {
        const dataJson = URI.parseQuery(data);
        return axios({
            method: 'post',
            url: API_URL_TASKLIST + '/copy_tasks_from_template',
            headers: Auth.header(),
            data: data
        });
    }

}