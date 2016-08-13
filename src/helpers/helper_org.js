import {API_URL_ORG, API_URL_DOMAIN, API_URL_ORG_UPDATE} from '../config.js'
import Auth from './auth.js'

export default class OrgHelper {
	constructor() {
		
	}
	
    static index() {
        return  axios({
                    method: 'get',
                    url: API_URL_ORG,
                    headers: Auth.header(),
                  });
    }

	static show(id) {
        return  axios({
                    method: 'get',
                    url: API_URL_ORG + '/' + id,
                    headers: Auth.header(),
                  });
    }
    
    static store(data) {
        return  axios({
                    method: 'post',
                    url: API_URL_ORG,
                    headers: Auth.header(),
                    data : data
                  });
    }

    static update(data) {
        return  axios({
                    method: 'put',
                    url: API_URL_ORG + '/' + data.id,
                    headers: Auth.header(),
                    data : data
                  });
    }

    static updatedomain(data) {
        return  axios({
                    method: 'post',
                    url: API_URL_DOMAIN,
                    headers: Auth.header(),
                    data : data
                  });
    }
}