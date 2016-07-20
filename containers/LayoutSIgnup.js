import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactDOM from 'react-dom'

import {ROOT_URL, API_URL_ORG_FINDBYDOMAIN, API_URL_SIGNUP} from '../config.js'


export default class LayoutSignup extends Component {
    constructor() {
      super();
      this.state = {
        'org_id' : ''
      }
    }
    componentDidMount() {
      
    }

    handleSubmit = (e) => {
      e.preventDefault();
      // console.log(this.refs.email.value);
      axios.post('http://local.pma/api/auth/signup', {
        email: 'kamal@gmail.com',
        password: 'admin',
        org_id: window.org_id
      })
      .then(function (response) {
        // localStorage.setItem('id_token', response.data.token)
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    render() {
      // if(!this.state.org_id) return false;
        return (
          <div className="signupCt">
            <div className="signupCt-inner">
              <div className="signupform">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" className="form-control" id="firstname" placeholder="First name" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" className="form-control" id="lastname" placeholder="Last name" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="form-control" id="email" placeholder="Email address" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Password" />
                </div>
                
                <div className="checkbox">
                  <label>
                    <input type="checkbox" /> I accept terms and condition.
                  </label>
                </div>
                <button type="submit" className="btn btn-success pull-right">Create an account</button>
              </form>
              </div>
              <div className="signinoption">Already have an account <a href="#">Sign In</a> here.</div>
            </div>
          </div>
        )
    }
}
