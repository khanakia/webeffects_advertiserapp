import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactDOM from 'react-dom'

import {ROOT_URL, API_URL_ORG_FINDBYDOMAIN, API_URL_SIGNUP} from '../config.js'


export default class LayoutSignup extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        var signupFormEl = jQuery(".signupCt .signupform");
        var $valid = jQuery(signupFormEl).valid();

        if(!$valid) {
            return false;
        }

        var formdata = signupFormEl.serialize();
        axios.post(API_URL_SIGNUP, {
            signupdata : formdata,
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
          <div className="signupCt">
            <div className="signupCt-inner">
              <div className="signup-form">
                <form className="signupform" onSubmit={this.handleSubmit}>
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
                  <button type="submit" className="btn btn-success pull-right">Create an account</button>
                </form>
              </div>
              <div className="signin-option">Already have an account <a href="#">Sign In</a> here.</div>
            </div>
          </div>
        )
    }
}
