import React, { Component } from 'react'
import { Link, hashHistory } from 'react-router'
import ReactDOM from 'react-dom'

import {ROOT_URL, SIGN_UP_URL, FORGET_PWD_URL, API_URL_SIGNIN_CONFIRM_ACCOUNT} from '../config.js'
import OrgHelper from '../helpers/helper_org.js'
import Auth from '../helpers/auth.js'
import Localstore from '../helpers/localstore.js'


export default class LayoutLogin extends Component {
    constructor() {
        super();
        this.state = {
            'org': ''
        }
    }
    componentWillMount() {
        
    }
    componentDidMount() {
        if(Auth.check()) {
            hashHistory.push('/dashboard')
            return false;
        }
        
        // OrgHelper.getOrgsByDomain(window.location.host).then((response) => {
        //     console.log(response);
        //     if(response.data) {
        //         this.setState({ 'org': response.data });
        //     } else {
        //         window.location.href = ROOT_URL;
        //     }
        // });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        var valid = jQuery(".loginForm").valid();
        if (!valid) {
            return false 
        };  
        var confirm_token = this.props.location.query.confirm_token;    

        if (confirm_token) {
            Auth.attempt_confirm_token({email: this.refs.email.value, password: this.refs.password.value, confirm_token: confirm_token}).then((response) => {
                if (response.data.token != null) {
                    // Localstore.setOrg(response.data.org)
                    // Localstore.setUser(response.data.user)
                    toastr.success(response.data.message);       
                    hashHistory.push('/dashboard')
                } else {                
                    toastr.error(response.data.message);       
                }
            });
        } else {
            Auth.attempt({email: this.refs.email.value, password: this.refs.password.value}).then((response) => {
                if (response.data.token != null) {
                    // Localstore.setOrg(response.data.org)
                    // Localstore.setUser(response.data.user)
                    toastr.success(response.data.message);       
                    hashHistory.push('/dashboard')
                } else {                
                    toastr.error(response.data.message);       
                }
            });
        }
      
    }

    render() {
        // if (!this.state.org) return false;
        // const { org } = this.state;
        // console.log(org);
        return (
            <div>
                <div className="main">
                    <div className="main_inner">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 col-md-offset-4">
                                    <div className="formstyle1Ct">
                                        <h1>Sign In </h1>
                                        <form autoComplete="off" onSubmit={this.handleSubmit} className="formstyle1 loginForm">
                                            <div className="form-group">
                                                <input type="email" className="form-control required" id="exampleInputEmail1" placeholder="Email Address" ref='email' />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control password" id="exampleInputPassword1" placeholder="Password" ref='password' />
                                            </div>
                                            <button type="submit" onClick={this.submitSigninForm} className="btn btn-success formstyle1SubmitBtn">Sign in</button>
                                            <div className="formstyle1-newaccount">
                                                <a href={FORGET_PWD_URL} className="pull-right">Forgot password?</a>
                                                <a href={SIGN_UP_URL}>Create an account</a>
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
