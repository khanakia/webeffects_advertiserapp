import {API_URL_COMPANY} from '../config.js'
import Auth from './auth.js'

export default class CompanyHelper {
	constructor() {
		
	}
	
	static index() {
        return axios({
            method: 'get',
            url: API_URL_COMPANY,
            headers: Auth.header(),
        });
    }

    static show(id) {
        return axios({
            method: 'get',
            url: API_URL_COMPANY + '/' + id,
            headers: Auth.header(),
        });
    }

    static store(data) {
        return axios({
            method: 'post',
            url: API_URL_COMPANY,
            headers: Auth.header(),
            data: data
        });
    }

    static update(data) {
        const dataJson = URI.parseQuery(data);
        return axios({
            method: 'put',
            url: API_URL_COMPANY + '/' + dataJson.id,
            headers: Auth.header(),
            data: data
        });
    }

    static save(data) {
        const dataJson = URI.parseQuery(data);
        if (dataJson.id) {
            var ajaxObj = CompanyHelper.update(data);
        } else {
            var ajaxObj = CompanyHelper.store(data);
        }
        return ajaxObj;
    }


    static delete(id) {
        return axios({
            method: 'delete',
            url: API_URL_COMPANY + '/' + id,
            headers: Auth.header(),
        });
    }
}