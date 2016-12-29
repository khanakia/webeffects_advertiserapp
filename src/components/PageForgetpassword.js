import React, { Component } from 'react';

import {ROOT_URL, RESET_PWD_AJAX_URL} from '../config.js'
import Auth from '../helpers/auth.js'
import Localstore from '../helpers/localstore.js'

class PageForgetpassword extends Component {
    constructor(props, context) {
        super(props, context);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        var resetpwdFormEl = jQuery(".ForgetpwdForm");
        var password_value = jQuery("#password").val();
        var password_confirmation = jQuery("#password_confirmation").val();

        jQuery(".errordiv").show();
        if( password_value.length === 0) {
           jQuery( ".passworderror" ).html( "<ul><li class='errorli'>Required Field</li><li class='errorli'>Must be more than 6 characters</li></ul>" );
           return false; 
        }
        if( password_value.length >= 1 && password_value.length <= 5) {
           jQuery( ".passworderror" ).html( "<ul><li class='validli'>Required Field</li><li class='errorli'>Must be more than 6 characters</li></ul>" );
            return false;
        }
        if( password_value.length >= 1 && password_value.length >= 5) {
           jQuery( ".passworderror" ).html( "<ul><li class='validli'>Required Field</li><li class='validli'>Must be more than 6 characters</li></ul>" );
            return false;
        }
        if( password_value !== password_confirmation) {
           jQuery( ".passwordconfirmerror" ).html( "<ul><li class='errorli'>Password Confirm</li></ul>" );
           return false;
        }
        if( password_value === password_confirmation) {
           jQuery( ".passwordconfirmerror" ).html( "<ul><li class='validli'>Password Confirm</li></ul>" );
            return false;
        }

        jQuery( "#password" ).change(function() {
            if( jQuery(this).val().length >= 1 && jQuery(this).val().length <= 5) {
               jQuery( ".passworderror" ).html( "<ul><li class='validli'>Required Field</li><li class='validli'>Must be more than 6 characters</li></ul>" );
                return false;
            }
        });

        var confirm_token = this.props.location.query.confirm_token;    
        var confirm_email = this.props.location.query.email;    
        var formdata = resetpwdFormEl.serialize();
        var password = jQuery("#password").val();
        var ajaxObj =  axios.post(RESET_PWD_AJAX_URL, {
            _token: confirm_token,  
            confirm_email: confirm_email,
            confirm_token: confirm_token,
            formdata: formdata,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });


        // var valid = jQuery(".ForgetpwdForm").valid();
        // if (!valid) {
        //     return false 
        // };        
    }

    render() {
        
        
        return (
            <div className="loginform">
                <div className="container">
                    <div className="row">    
                        <div className="row">
                            <form className="form-horizontal formstyle1 ForgetpwdForm" ref='form' onSubmit={this.handleSubmit}>
                                <h3 className="form_title text-center">Change password</h3>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="col-sm-12">New Password</label>
                                            <div className="col-sm-12">
                                                <input type="password" className="form-control required" name="password" id="password"  placeholder="••••••••••" />
                                                <div className="passworderror errordiv"></div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-12"><div className="row"><div className="col-sm-12">Confirm New Password</div></div></label>
                                            <div className="col-sm-12">
                                                <input type="password" className="form-control required updatePassword" name="password_confirmation" id="password_confirmation" placeholder="••••••••••"/>
                                                <div className="passwordconfirmerror errordiv"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-green">Update Password</button>
                                </div>
                            </form>
                        </div>    
                    </div>
                </div>    
            </div>
        );
    }
}


export default PageForgetpassword;
