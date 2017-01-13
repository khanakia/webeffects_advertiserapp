import React, { Component } from 'react';

import {ROOT_URL, RESET_PWD_API} from '../config.js'
import Auth from '../helpers/auth.js'
import Localstore from '../helpers/localstore.js'


class ResetPassword extends Component {
    constructor(props, context) {
        super(props, context);
    }

    handleSubmit = (e) => {
        e.preventDefault();


        var valid = jQuery(".loginForm").valid();
        if (!valid) {
            return false 
        };        

        var email = jQuery("#email").val();
        var ajaxObj =  axios.post(RESET_PWD_API, {
            email: email,
            domain: ROOT_URL
        })
        .then(function (response) {
            toastr.success(response.data.message);       
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    render() {
        
        
        return (
            <div className="loginform">
                <div id="errordiv"></div>
                <div className="container">
                    <div className="row">    
                        <div className="formstyle1Ct">
                            <h3 className="form_title text-center">{trans.reset_title}</h3>
                            <form className="form-horizontal formstyle1 loginForm" ref='form' onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="col-sm-12">{trans.reset_email_label}</label>
                                            <div className="col-sm-12">
                                                <input type="email" className="form-control required" name="email" id="email" placeholder="••••••••••" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-green btn--round">{trans.reset_submit_btn}</button>
                                </div>
                            </form>
                        </div>    
                    </div>
                </div>    
            </div>
        );
    }
}


export default ResetPassword;
