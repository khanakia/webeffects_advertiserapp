import React, { Component } from 'react';

export default class Util {
	constructor() {
		
	}

    static isEmpty(value) {
        if((!value || value == undefined) || (value == null) || (value == '')) {
            return true
        }
        return false;
    }   

}