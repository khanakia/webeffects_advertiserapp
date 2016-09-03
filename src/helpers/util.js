import React, { Component } from 'react';

import Auth from './auth.js'


export default class Util {
	constructor() {
		
	}

	static badgetDefault(item, user) {
        console.info(user);
        if(item.id==user.org_default_id) {
            return (
                <span className="label label-success">Default</span>
            )
        }
    }

    static badgetPersonal(item) {
        if(item.created_by_user_id==Auth.getUserID() && item.is_personal) {
            return (
                <span className="label label-success">Personal</span>
            )
        }
    }

    static badgetOwner(bool) {
        // if(item.created_by_user_id==Auth.getUserID()) {
       	if(bool) {
            return (
                <span className="label label-success">Owner</span>
            )
        }
    }

    static badgeIsAdmin(bool) {
        if(bool) {
            return (
                <span className="label label-success">Admin</span>
            )
        }
    }


    static isEmpty(value) {
        if((!value || value == undefined) || (value == null) || (value == '')) {
            return true
        }
        return false;
    }   

}