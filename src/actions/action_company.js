import { API_URL_COMPANY } from '../config.js'

//Post list
export const FETCH_COMPANIES = 'FETCH_COMPANIES';

export const FILTER_COMPANY_LIST = 'FILTER_COMPANY_LIST';


import CompanyHelper from '../helpers/helper_company'


export function fetchCompanies() {
    const request = CompanyHelper.index();
    return {
        type: FETCH_COMPANIES,
        payload: request
    };
}



export function filterCompanyList(data) {
  return {
    type: FILTER_COMPANY_LIST,
    payload: data
  };
}
