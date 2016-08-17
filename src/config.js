export const ROOT_HOST = 'react.pma';
export const ROOT_URL = 'http://react.pma';

export const SIGN_UP_URL = ROOT_URL + '/#/signup';

export const API_HOST = 'http://local.pma';
export const API_URL = 'http://local.pma/api';

export const API_HOST_ORGS_IMAGES = 'http://local.pma/uploads/orgs/';
export const API_HOST_USERS_IMAGES = 'http://local.pma/uploads/users/';

export const API_URL_SIGNIN = API_URL+'/auth/signin';
export const API_URL_SIGNUP = API_URL+'/auth/signup';

export const API_URL_PUBLIC = API_URL+'/public';
export const API_URL_GETALLORGSBYEMAIL = API_URL_PUBLIC+'/findorgs_byemail';
export const API_URL_GETORG_BYDOMAIN = API_URL_PUBLIC+'/findorgs_bydomain';

export const API_URL_USER = API_URL+'/user';

export const API_URL_ORG = API_URL+'/org';



// export const API_URL_ORG_USER_INDEX = API_URL_ORG+'/user_index';
export const API_URL_ORG_INVITE_USER = API_URL_ORG+'/user_invite';
// export const API_URL_ORG_UPDATE = API_URL+'/org/update';



export const API_URL_ORGUSER = API_URL+'/org_user';

// export const API_URL_ORG_UPDATE_DOMAIN = API_URL_ORG+'/domainupdate';

export const API_URL_ORG_LOGO = API_URL+'/uploadlogo';
export const API_URL_ORG_FAVICON = API_URL+'/uploadfavicon';
export const API_URL_USER_LOGO = API_URL+'/profileimage';

export const API_URL_PROJECT = API_URL+'/project';
export const API_URL_PROJECT_USER = API_URL+'/project_user';

export const API_URL_COMPANY = API_URL+'/company';
// export const API_URL_COMPANY_LIST = API_URL+'/company';
// export const API_URL_COMPANY_STORE = API_URL+'/company';
// export const API_URL_COMPANY_UPDATE = API_URL+'/company/update';

export const API_URL_GET_USER = API_URL+'/user/view';

export const API_URL_TASKLIST = API_URL+'/tasklist';
export const API_URL_TASKLIST_TASKS_FN = function(id=null) {
	return API_URL_TASKLIST+'/'+id+'/tasks';
};

export const API_URL_TASK = API_URL+'/task';

export const API_URL_TAG = API_URL+'/tag';

