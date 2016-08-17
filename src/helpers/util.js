import React, { Component } from 'react';

import Auth from './auth.js'


export default class Util {
	constructor() {
		
	}

	static badgetDefault(item) {
        if(item.is_default) {
            return (
                <span className="label label-success ml10">Default</span>
            )
        }
    }

    static badgetOwner(bool) {
        // if(item.created_by_user_id==Auth.getUserID()) {
       	if(bool) {
            return (
                <span className="label label-success ml10">Owner</span>
            )
        }
    }

    static badgeIsAdmin(bool) {
        if(bool) {
            return (
                <span className="label label-success ml10">Admin</span>
            )
        }
    }

}