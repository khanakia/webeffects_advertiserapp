import {API_URL_TAG_ITEM} from '../config.js'
import Auth from './auth.js'

export default class TagItemHelper {
	constructor() {
		
	}

	static store(data) {
		return  axios({
	            method: 'post',
	            url: API_URL_TAG_ITEM,
	            headers: Auth.header(),
	            data : data
	        });
	}


	// static remove(data) {
	// 	return  axios({
	//             method: 'post',
	//             url: API_URL_TAG_ITEM + '/remove',
	//             headers: Auth.header(),
	//             data : data
	//         });
	// }

	static delete(id) {
        return axios({
            method: 'delete',
            url: API_URL_TAG_ITEM + '/' + id,
            headers: Auth.header(),
        });
    }

}