import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router'
import {ROOT_URL, RESET_PWD_AJAX_URL} from '../config.js'
import Auth from '../helpers/auth.js'
import Localstore from '../helpers/localstore.js'
import HeaderPublic from './HeaderPublic'


import ChangePasswordForm from 'components/Forms/ChangePasswordForm'

class ResetPassword extends Component {
    constructor(props, context) {
        super(props, context);
    }

    onDataUpdate = (response) => {
            
            if(response.status=="ok") {
                toastr.success(trans.resetpwd_reset_successfully)
                hashHistory.push("/")
            } else {
                toastr.error(trans[response.message])
            }
    }

    render() {
        var token = this.props.location.query.token;    
        var email = this.props.location.query.email;    

        return (
            <div>
                <HeaderPublic />
                <div className="loginform">
                    <div className="container">
                       <ChangePasswordForm layout="layout3" onDataUpdate={this.onDataUpdate} token={token} email={email} />
                    </div>    
                </div>
            </div>
        );
    }
}


export default ResetPassword;
