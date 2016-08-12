import {API_URL_COMPANY} from '../config.js'
import Auth from './auth.js'

export default class CompanyHelper {
	constructor() {
		
	}
	
	static store(data={}) {
		return  axios({
                    method: 'post',
                    url: API_URL_COMPANY,
                    headers: Auth.header(),
                    data : data
                  });
	}

	static update(data) {
		return  axios({
                    method: 'put',
                    url: API_URL_COMPANY,
                    headers: Auth.header(),
                    data : data
                  });
	}
}