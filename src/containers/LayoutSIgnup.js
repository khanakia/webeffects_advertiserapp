import React, { Component } from 'react'
import { Link, hashHistory } from 'react-router'
import ReactDOM from 'react-dom'

import {ROOT_URL, API_URL_ORG_FINDBYDOMAIN, API_URL_SIGNUP} from '../config.js'


export default class LayoutSignup extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        var signupformEl = jQuery(".signupform");
        var $valid = jQuery(signupformEl).valid();

        if(!$valid) {
            return false;
        }

        var formdata = signupformEl.serialize();
        axios.post(API_URL_SIGNUP, {
            signupdata : formdata,
        })
        .then(function (response) {
            toastr.success(response.data.message);       
            hashHistory.push('/')
        })
        .catch(function (error) {
        var array = jQuery.map(error.data, function(value, index) {
            return value;
        });
        toastr.error(array[0]);
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
                        <h1>Sign up</h1>
                        <form className="formstyle1 signupform" onSubmit={this.handleSubmit}>
                          <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control required" name="firstname" id="firstname" placeholder="First name" />
                          </div>
                          <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control required" name="lastname" id="lastname" placeholder="Last name" />
                          </div>
                          <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" className="form-control required" name="email" id="email" placeholder="Email address" />
                          </div>
                          <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control required" name="password" id="password" placeholder="Password" />
                          </div>
                          <button type="submit" className="btn btn-success formstyle1SubmitBtn">Create an account</button>
                          <div className="formstyle1-newaccount">
                            Already have an account <a href="#">Sign In</a> here.
                          </div>

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
