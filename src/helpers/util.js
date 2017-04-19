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


    static compareJsonGetClass(field_name, compare_json) {
    	let class_css = ""
    	if(undefined!==compare_json[field_name]) {
    		class_css = compare_json[field_name]['altered'] ? " altered" : ""
    	}

    	return class_css
    }

}