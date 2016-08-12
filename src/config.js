export const ROOT_HOST = 'react.pma';
export const ROOT_URL = 'http://react.pma';
export const API_URL = 'http://local.pma/api';

export const API_URL_SIGNIN = API_URL+'/auth/signin';
export const API_URL_SIGNUP = API_URL+'/auth/signup';

export const API_URL_ORG = API_URL+'/org';
export const API_URL_ORG_UPDATE = API_URL+'/org/update';
export const API_URL_ORG_FINDBYDOMAIN = API_URL+'/org/findbydomain';

export const API_URL_COMPANY = API_URL+'/company';
export const API_URL_COMPANY_LIST = API_URL+'/company';
// export const API_URL_COMPANY_STORE = API_URL+'/company';
// export const API_URL_COMPANY_UPDATE = API_URL+'/company/update';


export const API_URL_TASKLIST = API_URL+'/tasklist';
export const API_URL_TASKLIST_TASKS_FN = function(id=null) {
	return API_URL_TASKLIST+'/'+id+'/tasks';
};

export const API_URL_TASK = API_URL+'/tasklist';

export const API_URL_TAG = API_URL+'/tag';

