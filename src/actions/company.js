import axios from 'axios';
import Auth from '../helpers/auth.js'
import {ROOT_URL, API_URL_COMPANY_LIST} from '../config.js'

//Post list
export const FETCH_COMPANIES = 'FETCH_COMPANIES';
export const FETCH_COMPANIES_SUCCESS = 'FETCH_COMPANIES_SUCCESS';
export const FETCH_COMPANIES_FAILURE = 'FETCH_COMPANIES_FAILURE';
export const RESET_COMPANIES = 'RESET_COMPANIES';

export function fetchCompanies() {
  const request = axios({
    method: 'get',
    url: API_URL_COMPANY_LIST,
    headers: Auth.header()
  });

  return {
    type: FETCH_COMPANIES,
    payload: request
  };
}

export function fetchCompaniesSuccess(companies) {
  return {
    type: FETCH_COMPANIES_SUCCESS,
    payload: companies
  };
}

export function fetchCompaniesFailure(error) {
  return {
    type: FETCH_COMPANIES_FAILURE,
    payload: error
  };
}