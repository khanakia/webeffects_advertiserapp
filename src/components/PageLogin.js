import React, { Component } from 'react';

import Auth from '../helpers/auth.js'


class PageLogin extends Component {
    constructor(props, context) {
        super(props, context);
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
        
        
        return (
            <div className="loginform">
            <div id="errordiv"></div>
                <div className="container">
                    <div className="row">    
                        <div className="row">
                            <form className="form-horizontal formstyle1 loginForm" ref='form' onSubmit={this.handleSubmit}>
                                <h3 className="form_title text-center">Login Page</h3>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="col-sm-12">E-mailadres</label>
                                            <div className="col-sm-12">
                                                <input type="email" className="form-control required" name="email" id="email" placeholder="e-mailadres" ref='email'/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-12"><div className="row"><div className="col-sm-6">Password</div> <div className="col-sm-6 text-right"><a href="#">Forget Password?</a></div></div></label>
                                            <div className="col-sm-12">
                                                <input type="password" className="form-control required minlength" name="password" id="password"  placeholder="••••••••••" ref='password'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-green">Login</button>
                                </div>
                            </form>
                        </div>    
                    </div>
                </div>    
            </div>
        );
    }
}


export default PageLogin;
