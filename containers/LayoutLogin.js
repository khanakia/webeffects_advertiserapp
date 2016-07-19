import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactDOM from 'react-dom'

import {ROOT_URL, API_URL_ORG_FINDBYDOMAIN, API_URL_SIGNIN} from '../config.js'


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
      // console.log(this.refs.email.value);
      jQuery.ajax({
                type: "POST",
                url: 'http://local.pma/api/auth/signin',
                dataType : "JSON",
                success: function(data){
                  
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
                <div className="col-md-6 col-md-offset-3">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label>Email address</label>
                      <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" ref='email'  />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" ref='password' />
                    </div>
                    
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" /> Check me out
                      </label>
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                  </form>
                </div>
              </div>
            </div> 
          </div>
        )
    }

}
