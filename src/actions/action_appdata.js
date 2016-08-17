import * as Helpers from '../helpers'

export const FETCH_APPDATA_CURRENTORG = 'FETCH_APPDATA_CURRENTORG';
export const FETCH_APPDATA_CURRENTUSER = 'FETCH_APPDATA_CURRENTUSER';


export function fetchCurrentOrg(response) {
    const request = Helpers.Auth.getCurrentOrg()
    return {
        type: FETCH_APPDATA_CURRENTORG,
        payload: request
    };
}


export function fetchCurrentUser(response) {
    const request = Helpers.Auth.getCurrentUser()
    return {
        type: FETCH_APPDATA_CURRENTUSER,
        payload: request
    };
}
