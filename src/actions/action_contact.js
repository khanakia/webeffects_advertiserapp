export const FETCH_CONTACTS = 'FETCH_CONTACTS';

import {ContactHelper} from '../helpers'

export function fetchContacts() {
    const request = ContactHelper.index();
    return {
        type: FETCH_CONTACTS,
        payload: request
    };
}

