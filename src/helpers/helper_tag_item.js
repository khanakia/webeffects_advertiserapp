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

}