import {API_URL_SIGNIN} from '../config.js'

export default class Auth {
	constructor() {
		
	}
	
	static attempt({email=null, password=null}) {
		return  axios.post(API_URL_SIGNIN, {
					email: email,
					password: password,
				}).then(function (response) {
					this.login(response.data.token)
				}.bind(this)).catch(function (error) {
					console.log(error);
				});
	}

	static login(token=null) {
		if(!token) return "Cannot Login";
		localStorage.setItem('token', token);
	}

	static logout() {
		localStorage.removeItem('token');
	}

	static check() {
		return this.getToken() ? true : false;
	}

	static getToken() {
		return localStorage.getItem('token');
	}

	// Header which i will add to ajax request
	static header() {
		return {'Authorization' : 'Bearer ' + Auth.getToken()}
	}

}