import axios from 'axios';

//Post list
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const RESET_POSTS = 'RESET_POSTS';
export const ADD_ORG = 'ADD_ORG';

import Auth from '../helpers/auth.js'
const ROOT_URL = 'http://local.pma/api';

export function fetchPosts() {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/org`,
    headers: Auth.header()
    
  });

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function fetchPostsSuccess(posts) {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts
  };
}

export function fetchPostsFailure(error) {
  return {
    type: FETCH_POSTS_FAILURE,
    payload: error
  };
}


export function addOrg(data) {
  const request = axios({
                    method: 'post',
                    url: `${ROOT_URL}/org`,
                    headers: Auth.header(),
                    data : data
                  });
  return {
    type: ADD_ORG,
    payload: request
  };
}