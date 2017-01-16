import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router'
import {ROOT_URL, API_URL_FORGOT_PWD} from '../config.js'
import Auth from '../helpers/auth.js'
import Localstore from '../helpers/localstore.js'
import HeaderPublic from './HeaderPublic'


class ForgotPassword extends Component {
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
        var ajaxObj =  axios.post(API_URL_FORGOT_PWD, {
            email: email,
            domain: ROOT_URL,
            request_site_id: Env.site_id
        })
        .then(function (response) {
            if(response.data.status=="ok") {
                toastr.success(trans.reset_email_sent)
                hashHistory.push("/")
            } else {
                toastr.error(trans[response.data.message])
            }
        });
       

    }

    render() {
        
        
        return (
            <div>
                <HeaderPublic />
                <div className="loginform">
                    <div id="errordiv"></div>
                    <div className="container">
                        <div className="row">    
                            <div className="formstyle1Ct">
                                <h3 className="form_title text-center">{trans.forgotpwd_title}</h3>
                                <form className="form-horizontal formstyle1 loginForm" ref='form' onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="col-sm-12">{trans.forgotpwd_email_label}</label>
                                                <div className="col-sm-12">
                                                    <input type="email" className="form-control required" name="email" id="email" placeholder="••••••••••" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-green btn--round">{trans.forgotpwd_submit_btn}</button>
                                    </div>
                                </form>
                            </div>    
                        </div>
                    </div>    
                </div>
            </div>
        );
    }
}


export default ForgotPassword;
