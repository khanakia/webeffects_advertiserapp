import React, { Component } from 'react'
import { Link, hashHistory } from 'react-router'
import ReactDOM from 'react-dom'

import Auth from '../helpers/auth.js'
import HeaderPublic from './HeaderPublic'

import {API_HOST} from '../config'

class Login extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
       
        var token = this.props.location.query.token;
        var url = this.props.location.query.url;
        var token = this.props.location.query.token;
        if (token) {
            Auth.login(token)
            console.log(Auth.getToken())
            if(Auth.check()) {  
                if (url) {
                    hashHistory.push(url)
                } else {
                    hashHistory.push("/dashboard")
                }
            }    
        } else {
            if(Auth.check()) {
                hashHistory.push('/dashboard')
                return false;
            }

        }      
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        var valid = jQuery(".loginForm").valid();
        if (!valid) {
            return false 
        };        
        var token = this.props.location.query.token;
        var url = this.props.location.query.url;

        if (token) {
            if(Auth.login()) {
                if (url) {
                    hashHistory.push(url)
                }else {
                    hashHistory.push("/dashboard")
                }
                return false;
            } 
        } else {
            Auth.attempt({email: this.refs.email.value, password: this.refs.password.value}).then((response) => {
                if (response.data.token != null) {
                    hashHistory.push('/dashboard')
                } else {                
                    toastr.error(response.data.message);       
                }
            });
        }
    }

    render() {
        
        
        return (
            <div>
                <HeaderPublic  />
                <div className="loginform">
                    <div id="errordiv"></div>
                    <div className="container">
                        <div className="row">
                            <div className="formstyle1Ct">
                                <h3 className="form_title text-center">{trans.login_title}</h3>
                                <form className="form-horizontal formstyle1 loginForm" ref='form' onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label className="col-sm-12 col-xs-12">{trans.login_email_label}</label>
                                        <div className="col-sm-12 col-xs-12">
                                            <input type="email" className="form-control required" name="email" id="email" placeholder="••••••••••" ref='email'/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-12 col-xs-12">
                                            <div className="row">
                                                <div className="col-sm-5">{trans.login_wachtwoord}</div> 
                                                <div className="col-sm-7 col-xs-12 text-right"><a href="#/forgetpwd">{trans.login_wachtwoord_vergeten}</a></div>
                                            </div>
                                        </label>
                                        <div className="col-sm-12 col-xs-12">
                                            <input type="password" className="form-control required minlength" name="password" id="password"  placeholder="••••••••••" ref='password'/>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-green btn--round">{trans.login_submit_btn}</button>
                                    </div>
                                    <br/>
                                    <p className="text-center"><a target="_blank" href={API_HOST+Env.adverter_page_link}>{trans.login_ik_ben}</a></p>
                                </form>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        );
    }
}


export default Login;
