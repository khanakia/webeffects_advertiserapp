export const FETCH_APPDATA_CURRENTUSER = 'FETCH_APPDATA_CURRENTUSER';

export function fetchCurrentUser(response) {
    const request = Auth.getCurrentUser()
    return {
        type: FETCH_APPDATA_CURRENTUSER,
        payload: request
    };
}
