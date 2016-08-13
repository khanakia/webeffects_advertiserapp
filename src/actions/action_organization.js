import axios from 'axios';

//Post list
export const FETCH_ORGS = 'FETCH_ORGS';
export const FETCH_ORG_CURRENT = 'FETCH_ORG_CURRENT';
export const FETCH_ORG_USERS = 'FETCH_ORG_USERS';

// export const FETCH_ORGS_SUCCESS = 'FETCH_ORGS_SUCCESS';
// export const FETCH_ORGS_FAILURE = 'FETCH_ORGS_FAILURE';
// export const RESET_ORGS = 'RESET_ORGS';
export const ADD_ORG = 'ADD_ORG';

import Auth from '../helpers/auth.js'
// const ROOT_URL = 'http://local.pma/api';
import OrgHelper from '../helpers/helper_org'
import OrgUserHelper from '../helpers/helper_org_user'


export function fetchOrgs() {
    const request = OrgHelper.index();
    return {
        type: FETCH_ORGS,
        payload: request
    };
}

// response = axios response
export function fetchOrgCurrent(response) {
    const org_id = Auth.getOrgID();
    console.log('FETCH_ORG_CURRENT', response);
    // var single = {};
    // if(response.payload.data) {
    //     single = (response.payload.data[0])
    // }
    return {
        type: FETCH_ORG_CURRENT,
        payload: _.find(response.payload.data, { 'id': org_id })
    };
}


export function fetchOrgUsers() {
    const request = OrgUserHelper.index();
    return {
        type: FETCH_ORG_USERS,
        payload: request
    };
}

// export function fetchOrgs() {
//   const request = axios({
//     method: 'get',
//     url: `${ROOT_URL}/org`,
//     headers: Auth.header()

//   });

//   return {
//     type: FETCH_ORGS,
//     payload: request
//   };
// }

// export function fetchOrgsSuccess(posts) {
//   return {
//     type: FETCH_ORGS_SUCCESS,
//     payload: posts
//   };
// }

// export function fetchOrgsFailure(error) {
//   return {
//     type: FETCH_ORGS_FAILURE,
//     payload: error
//   };
// }


// export function addOrg(data) {
//     const request = axios({
//         method: 'post',
//         url: `${ROOT_URL}/org`,
//         headers: Auth.header(),
//         data: data
//     });
//     return {
//         type: ADD_ORG,
//         payload: request
//     };
// }
