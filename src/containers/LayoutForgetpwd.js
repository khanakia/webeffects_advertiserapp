import React, { Component } from 'react'
import { Link, hashHistory } from 'react-router'
import ReactDOM from 'react-dom'

import {ROOT_URL, FORGET_PWD_AJAX} from '../config.js'
import OrgHelper from '../helpers/helper_org.js'
import Auth from '../helpers/auth.js'
import Localstore from '../helpers/localstore.js'


export default class LayoutForgetpwd extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        var forgetpwdFormEl = jQuery(".forgetpwdForm");
        var valid = jQuery(".forgetpwdForm").valid();
        if (!valid) {
            return false 
        }

        var formdata = forgetpwdFormEl.serialize();
        var email = jQuery("#email").val();
        var ajaxObj =  axios.post(FORGET_PWD_AJAX, {
            email: email,
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
            <div>        
                <div className="main">
                    <div className="main_inner">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 col-md-offset-4">
                                    <div className="formstyle1Ct">
                                        <h1>Reset Password</h1>
                                        <form onSubmit={this.handleSubmit} className="formstyle1 forgetpwdForm" role="form" method="POST">
                                            <div className="form-group">
                                                <input type="email" className="form-control required" id="email" placeholder="Email Address" ref='email' name='email' />
                                            </div>
                                            <button type="submit" className="btn btn-success formstyle1SubmitBtn">Submit Here</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        )
    }
}
