import React, { Component } from 'react'
import { Link, hashHistory } from 'react-router'
import ReactDOM from 'react-dom'

import {ROOT_URL, SIGN_UP_URL} from '../config.js'
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
            hashHistory.push('/')
            return false;
        }
        
        OrgHelper.getOrgsByDomain(window.location.host).then((response) => {
            console.log(response);
            if(response.data) {
                this.setState({ 'org': response.data });
            } else {
                window.location.href = ROOT_URL;
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var valid = jQuery(".loginForm").valid();
        if (!valid) {
            return false 
        };
       
        Auth.attempt({email: this.refs.email.value, password: this.refs.password.value}).then((response) => {
            console.log(response);
            if (response.data.token != null) {
                // Localstore.setOrg(response.data.org)
                // Localstore.setUser(response.data.user)
                hashHistory.push('/')
            }
        });
      
    }

    render() {
        if (!this.state.org) return false;
        const { org } = this.state;
        console.log(org);
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <div className="loginFormCt">
                                <a href="#" className="loginForm-logo"><img src={org.logo_url} /></a>
                                <h1>Sign in to {org.org_title}</h1>
                                <form onSubmit={this.handleSubmit} className="loginForm">
                                    <div className="form-group">
                                        <label>Email address</label>
                                        <input type="email" className="form-control required" id="exampleInputEmail1" placeholder="Email" ref='email' />
                                    </div>
                                    <div className="form-group">
                                        <label className="passLabel">Password
                                            <a href="#" className="pull-right">Forgot password?</a>
                                        </label>
                                        <input type="password" className="form-control password" id="exampleInputPassword1" placeholder="Password" ref='password' />
                                    </div>
                                    <button type="submit" onClick={this.submitSigninForm} className="btn btn-success loginSubmitBtn">Sign in</button>
                                </form>
                                <div className="loginForm-newaccount">
                                    New user? <a href={SIGN_UP_URL}>Create an account</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
