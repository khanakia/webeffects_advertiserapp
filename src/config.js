import Env from './env.json'
import language from './translation';

const env_current = Env[Env.current]
const trans = language[Env.site_id];

export const ROOT_HOST = env_current.root_host;
export const ROOT_URL = env_current.root_url;
export const API_HOST = env_current.api_host;
export const API_URL = env_current.api_url;
export const PUBLIC_SITE_URL = env_current.public_site_url;

export const OBJECT_TYPE_PROJECT = 'project';

export const SIGN_UP_URL = ROOT_URL + '/#/signup';
export const FORGET_PWD_URL = ROOT_URL + '/#/forgetpwd';
export const RESET_PWD_URL = ROOT_URL + '/#/resetpwd';
export const RESET_PWD_AJAX = API_URL + '/postReset';
export const FORGET_PWD_AJAX = API_URL + '/postEmail';

export const API_URL_PUBLIC = API_URL+'/public';

// export const API_URL_SIGNIN = API_URL+'/auth/signin';
export const API_URL_SIGNIN = API_URL + '/login';

export const API_URL_SIGNIN_CONFIRM_ACCOUNT = API_URL+'/auth/signin_confirm_account';
export const API_URL_SIGNUP = API_URL+'/auth/signup';

// export const API_URL_CHANGE_PWD = API_URL+'/changepwd';
export const API_URL_CHANGE_PWD_FIRSTLOGIN = API_URL + '/changepassword_firstlogin';
export const API_URL_CHANGE_PWD = API_URL + '/changepassword';

export const API_URL_FORGOT_PWD = API_URL+'/forgotpassword';
export const API_URL_RESET_PWD = API_URL+'/resetpassword';



export const API_URL_UPDATE_USER = API_URL+'/user/update';

export const API_URL_USER = API_URL+'/user';
export const API_URL_USER_DISABLE_REMINDER = API_URL_USER + '/disable_email_reminder';
export const API_URL_USER_ENABLE_REMINDER = API_URL_USER + '/enable_email_reminder';
export const API_URL_CONTACTS = API_URL+'/contacts';

export const API_URL_PROJECT = API_URL+'/projects';



export const API_URL_ATTACHMENTS = API_URL+'/attachments';
export const API_URL_ATTACHMENTS_UPLOAD = API_URL_ATTACHMENTS+'/upload';

export const API_URL_ATTACHMENT_MAPPINGS = API_URL+'/attachment_mappings';

export const  API_URL_PROJECT_ROOMS = API_URL+'/project_rooms';
export const API_URL_PROJECT_VIDEOS = API_URL+'/project_videos';
export const API_URL_PROJECT_IFRAMES = API_URL+'/project_iframes';
export const API_URL_PROJECT_FORMDATA = API_URL_PROJECT +'/formdata';
export const API_URL_PROJECT_PARKINGS = API_URL_PROJECT +'/project_parkings';

export const PROJECT_STATUSES = {
	"1" : {
		'title' : trans.project_status_gepubliceerd,
		'icon_class' : 'iconc iconc-published color-green',
	},

	"2" : {
		'title' : 'Nieuw',
		'icon_class' : 'iconc iconc-concept',
	},

	"3" : {
		'title' : 'Ter goedkeuring',
		'icon_class' : 'iconc iconc-uploaded color-red',
	},

	"4" : {
		'title' : 'Wachten op depubliceren',
		'icon_class' : 'iconc iconc-uploaded color-red',
	},

	"5" : {
		'title' : 'Uitgeschakeld',
		'icon_class' : 'iconc iconc-uploaded color-red',
	},


}





