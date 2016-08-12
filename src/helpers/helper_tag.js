import {API_URL_TAG} from '../config.js'
import Auth from './auth.js'

export default class TagHelper {
	constructor() {
		
	}

    static index() {
        return  axios({
                    method: 'get',
                    url: API_URL_TAG,
                    headers: Auth.header(),
                  });
    }

    static tasks(id) {
        return  axios({
                    method: 'get',
                    url: '',
                    headers: Auth.header(),
                  });
    }

    static show(id) {
        return  axios({
                    method: 'get',
                    url: API_URL_TAG + '/' + id,
                    headers: Auth.header(),
                  });
    }
	
	static store(data) {
		return  axios({
                    method: 'post',
                    url: API_URL_TAG,
                    headers: Auth.header(),
                    data : data
                  });
	}

	static update(data) {
		return  axios({
                    method: 'put',
                    url: API_URL_TAG + '/' + data.id,
                    headers: Auth.header(),
                    data : data
                  });
	}
}