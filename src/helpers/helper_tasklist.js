import {API_URL_TASKLIST,API_URL_TASKLIST_TASKS_FN} from '../config.js'
import Auth from './auth.js'

export default class TasklistHelper {
	constructor() {
		
	}

    static index() {
        return  axios({
                    method: 'get',
                    url: API_URL_TASKLIST,
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

    static show(id) {
        return  axios({
                    method: 'get',
                    url: API_URL_TASKLIST + '/' + id,
                    headers: Auth.header(),
                  });
    }
	
	static store({org_title=null}) {
		return  axios({
                    method: 'post',
                    url: API_URL_TASKLIST,
                    headers: Auth.header(),
                    data : data
                  });
	}

	static update(data) {
		return  axios({
                    method: 'put',
                    url: API_URL_TASKLIST,
                    headers: Auth.header(),
                    data : data
                  });
	}
}