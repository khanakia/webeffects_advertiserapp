import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactDOM from 'react-dom'

import {ROOT_URL, API_URL_ORG_FINDBYDOMAIN, API_URL_SIGNIN, API_URL} from '../config.js'


export default class LayoutLogin extends Component {
    constructor() {
      super();
      this.state = {
        'org_id' : ''
      }
    }
    componentDidMount() {
      axios.get(API_URL_ORG_FINDBYDOMAIN, {
        params : {
          domain: window.location.host,

        }
      }).then(function (response) {
        // localStorage.setItem('id_token', response.data.token)
        const org_id = response.data.org_id;
        if(!org_id) {
          window.location.href = ROOT_URL;
        }
        this.setState({'org_id' : org_id});
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      var valid = jQuery(".loginForm").valid();
      if (!valid) {return false};
      // console.log(this.refs.email.value);
      jQuery.ajax({
                type: "POST",
                url: 'http://local.pma/api/auth/signin',
                dataType : "JSON",
                data: {'email': this.refs.email.value, 'password': this.refs.password.value},
                success: function(data){
                  if (data.token!=null) {
                    window.location.href = API_URL;
                  } else {
                    window.location.href = '/#/login';
                  }
                }
            });
      // axios.post('http://local.pma/api/auth/signin', {
      //   email: 'kamal@gmail.com',
      //   password: 'admin',
      //   // org_id: window.org_id
      // })
      // .then(function (response) {
      //   // localStorage.setItem('id_token', response.data.token)
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
    }

    render() {
      if(!this.state.org_id) return false;
        return (
          <div>
            <div className="container">
              <div className="row">
                <div className="col-md-4 col-md-offset-4">
                  <div className="loginFormCt">
                    <a href="#" className="loginForm-logo"><img src="/public/images/button-lg-demo.png" /></a>
                    <h1>Sign in to PMA</h1>
                    <form onSubmit={this.handleSubmit} className="loginForm">
                      <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control required" id="exampleInputEmail1" placeholder="Email" ref='email'  />
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
                      New in PMA? <a href="#">Create an account</a>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          </div>
        )
    }

}
