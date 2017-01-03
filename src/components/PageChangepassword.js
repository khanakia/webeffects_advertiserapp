import React, { Component } from 'react';

import {ROOT_URL, API_URL_CHANGE_PWD} from '../config.js'
import Auth from '../helpers/auth.js'
import Localstore from '../helpers/localstore.js'

class PageChangepassword extends Component {
    constructor(props, context) {
        super(props, context);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        var resetpwdFormEl = jQuery(".ChangepwdForm");

        var valid = jQuery(".ChangepwdForm").valid();
        if (!valid) {
            return false 
        };        

        var formdata = resetpwdFormEl.serialize();
        var ajaxObj =  axios.post(API_URL_CHANGE_PWD, {
            formdata: formdata,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });


    }

    render() {
        
        
        return (
            <div className="loginform">
                <div className="container">
                    <div className="row">    
                        <div className="row">
                            <form className="form-horizontal formstyle1 ChangepwdForm" ref='form' onSubmit={this.handleSubmit}>
                                <h3 className="form_title text-center">Change Password</h3>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="col-sm-12">Old Password</label>
                                            <div className="col-sm-12">
                                                <input type="password" className="form-control required" name="oldpassword" id="oldpassword"  placeholder="••••••••••" />
                                            </div>
                                        </div>

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
                                    <button type="submit" className="btn btn-green btn--round">Update Password</button>
                                </div>
                            </form>
                        </div>    
                    </div>
                </div>    
            </div>
        );
    }
}


export default PageChangepassword;
