import React, { Component } from 'react';

import {ROOT_URL, RESET_PWD_AJAX_URL} from '../config.js'
import Auth from '../helpers/auth.js'
import Localstore from '../helpers/localstore.js'

class ForgetPassword extends Component {
    constructor(props, context) {
        super(props, context);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        var resetpwdFormEl = jQuery(".ForgetpwdForm");
        var password_value = jQuery("#password").val();
        var password_confirmation = jQuery("#password_confirmation").val();
        var haserror = 0;
        
        function countUpperCaseChars(str) {
          var count=0,len=str.length;
          for(var i=0;i<len;i++) {
            if(/[A-Z]/.test(str.charAt(i))) count++;
          }
          return count;
        }
        var pwduppercase = countUpperCaseChars(password_value);
        console.log(pwduppercase);

        if( password_value.length === 0) {
            haserror = 1;
            jQuery("#password").addClass( "required error" );
            jQuery( ".passworderror" ).html( "<ul><li class='errorli'>Required Field</li><li class='errorli'>Must be more than 6 characters</li><li class='errorli'>Must be an uppercase letter</li></ul>" );
        }
        if( password_value.length >= 1 && password_value.length <= 5 && pwduppercase <= 1) {
            haserror = 1;
            jQuery("#password").addClass( "required error" );
            jQuery( ".passworderror" ).html( "<ul><li class='validli'>Required Field</li><li class='errorli'>Must be more than 6 characters</li><li class='errorli'>Must be an uppercase letter</li></ul>" );
        }
        if( password_value.length >= 1 && password_value.length <= 5 && pwduppercase >= 1) {
            haserror = 1;
            jQuery("#password").addClass( "required error" );
            jQuery( ".passworderror" ).html( "<ul><li class='validli'>Required Field</li><li class='errorli'>Must be more than 6 characters</li><li class='validli'>Must be an uppercase letter</li></ul>" );
        }

        if( password_value.length >= 1 && password_value.length >= 5 && pwduppercase <= 1) {
            jQuery("#password").removeClass( "error" );
            jQuery("#password").addClass( "valid" );
            jQuery( ".passworderror" ).html( "<ul><li class='validli'>Required Field</li><li class='validli'>Must be more than 6 characters</li><li class='errorli'>Must be an uppercase letter</li></ul>" );
        }

        if( password_value.length >= 1 && password_value.length >= 5 && pwduppercase >= 1) {
            jQuery("#password").removeClass( "error" );
            jQuery("#password").addClass( "valid" );
            jQuery( ".passworderror" ).html( "<ul><li class='validli'>Required Field</li><li class='validli'>Must be more than 6 characters</li><li class='validli'>Must be an uppercase letter</li></ul>" );
        }

        if( password_value !== password_confirmation) {
            haserror = 1;
            jQuery("#password_confirmation").addClass( "required error" );
            jQuery( ".passwordconfirmerror" ).html( "<ul><li class='errorli'>Password Confirm</li></ul>" );
        }
        if( password_confirmation.length >= 1 && password_value === password_confirmation) {
            jQuery("#password_confirmation").removeClass( "error" );
            jQuery("#password_confirmation").addClass( "valid" );
            jQuery( ".passwordconfirmerror" ).html( "<ul><li class='validli'>Password Confirm</li></ul>" );
        }
        if( password_confirmation.length === 0) {
            haserror = 1;
            jQuery("#password_confirmation").addClass( "required error" );
            jQuery( ".passwordconfirmerror" ).html( "<ul><li class='errorli'>Password Confirm</li></ul>" );
        }

        console.log(haserror);
        if (haserror) {
            jQuery(".errordiv").show();
            return false;
        }else {
            jQuery(".errordiv").hide();
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
                    <div className="row formstyle1Ct">    
                        <h3 className="form_title text-center">Eigen wachtwoord aanmaken</h3>
                        <form className="form-horizontal formstyle1 ForgetpwdForm" ref='form' onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="col-sm-12">Nieuw wachtwoord</label>
                                        <div className="col-sm-12">
                                            <input type="password" className="form-control required" name="password" id="password"  placeholder="••••••••••" />
                                            <div className="passworderror errordiv"></div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-12"><div className="row"><div className="col-sm-12">Herhaal uw nieuwe wachtwoord</div></div></label>
                                        <div className="col-sm-12">
                                            <input type="password" className="form-control required updatePassword" name="password_confirmation" id="password_confirmation" placeholder="••••••••••"/>
                                            <div className="passwordconfirmerror errordiv"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-grey btn--round">Bevesigen</button>
                            </div>
                        </form>
                    </div>
                </div>    
            </div>
        );
    }
}


export default ForgetPassword;
