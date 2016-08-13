import axios from 'axios';
import Auth from '../helpers/auth.js'
import {API_URL_COMPANY} from '../config.js'

//Post list
export const FETCH_COMPANIES = 'FETCH_COMPANIES';

import CompanyHelper from '../helpers/helper_company'


export function fetchCompanies() {
    const request = CompanyHelper.index();
    return {
        type: FETCH_COMPANIES,
        payload: request
    };
}