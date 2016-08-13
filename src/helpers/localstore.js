/*
 * HOW TO USE
 *  Localstore.setOrg(2)
	Localstore.setUser({id: 1, name: 'aman'})
	console.log(Localstore.getItem('org'))
*/

export default class localstore {
	static setOrg(org={}) {
		localStorage.setItem('org', JSON.stringify(org));
	}

	static setUser(user={}) {
		localStorage.setItem('user', JSON.stringify(user));
	}

	static getItem(itemname) {
		return JSON.parse(localStorage.getItem(itemname))
	}

	static clear() {
		localStorage.removeItem('org')
		localStorage.removeItem('user')
	}
}