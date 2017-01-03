import React, { Component } from 'react';

import ContentWrapper from './shared/ContentWrapper'

import {ROOT_URL, API_URL_CHANGE_PWD} from '../config.js'
import Auth from '../helpers/auth.js'
import Localstore from '../helpers/localstore.js'
import UserHelper from '../helpers/helper_user.js'

class Account extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
      
    }

    tabsFn() {
        $(".tab-pane").hide();
        $(".tab-pane:first").show();

        $('.nav-tabs li a').click(function (e) {     
            var href = $(this).attr('href');    
            $('.tab_drawer_heading').removeClass('d_active');
            $('.tab_drawer_heading a[href="'+href+'"]').closest('h3').addClass('d_active');

            $('.tab-pane').hide();
            $('.tab-pane'+href).show();
        })

        $('.tab_drawer_heading a').click(function (e) {     
            var href = $(this).attr('href');
            if($('.tab-pane'+href).hasClass("active")) {
                return false;
            }
            $('.nav-tabs li').removeClass('active');
            $('.nav-tabs li a[href="'+href+'"]').closest('li').addClass('active');


            $('.tab-pane').slideUp();
            $('.tab-pane'+href).slideDown();
        })

    }

    handleSubmit = (e) => {
        e.preventDefault();
        var valid = jQuery(this.refs.form).valid();
        if (!valid) { return false };

        let param = jQuery(this.refs.form).serialize();

        // let data1 = jQuery(this.refs.password1.value);
        // let confirm = jQuery(this.refs.confirm1.value);
        // console.log(data);
        // if (data!=confirm) {
        //     toastr.error('Please insert confirm password same as password.');
        //     return false
        // };
        UserHelper.changePassword(param).then(function(response){
            if (response.data.STATUS=="FAILED") {
                toastr.error(response.data.error_message.password);
            } else {
                toastr.success('Password changed successfully.')
            }
        }.bind(this));
    }

    render() {
        
        
        return (
            <div className="p20">
                <ContentWrapper hasSidebar={true}>
                    <div className="page-panel">
                        <div className="page-panel__heading">Account instellingen</div>
                        <div className="page-panel__inner">
                            <div className="page-panel__inner__left">
                                  <ul className="nav nav-tabs nav-tabs--vertical" role="tablist">
                                    <li role="presentation" className="active">
                                        <a href="#home" aria-controls="home" role="tab" data-toggle="tab">Uw gegevens</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Wachtwoord wijzigen</a>
                                    </li>
                                  </ul>
                            </div>
                            <div className="page-panel__inner__content">                                 
                                <div className="tab-content">
                                    <h3 className="d_active tab_drawer_heading">
                                        <a href="#home" aria-controls="home" role="tab" data-toggle="tab">Uw gegevens</a>
                                    </h3>
                                    <div role="tabpanel" className="tab-pane active" id="home">
                                        <div className="form-group">
                                            <label className="mb15">Bedrijfsnaam</label>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className="iconc-buildings"></i>
                                                        </span>
                                                        <input type="text" className="form-control" name="bedrijfsnaam" defaultValue="Marie Aubain" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="tab_drawer_heading">
                                        <a href="#profile" aria-controls="home" role="tab" data-toggle="tab">Wachtwoord wijzigen</a>
                                    </h3>
                                    <div role="tabpanel" className="tab-pane" id="profile">
                                        <div className="formstyle1Ct">
                                            <h3 className="form_title text-center">Change Password</h3>
                                            <form className="form-horizontal formstyle1 ChangepwdForm" ref='form' onSubmit={this.handleSubmit}>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label className="col-sm-12">Old Password</label>
                                                            <div className="col-sm-12">
                                                                <input type="password" className="form-control required" name="oldpassword" id="oldpassword"  placeholder="••••••••••" />
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <label className="col-sm-12">New Password</label>
                                                            <div className="col-sm-12">
                                                                <input type="password" className="form-control required" name="password" id="password"  placeholder="••••••••••" />
                                                                <div className="passworderror errordiv"></div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-sm-12"><div className="row"><div className="col-sm-12">Confirm New Password</div></div></label>
                                                            <div className="col-sm-12">
                                                                <input type="password" className="form-control required updatePassword" name="password_confirmation" id="password_confirmation" placeholder="••••••••••"/>
                                                                <div className="passwordconfirmerror errordiv"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-green btn--round">Update Password</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="page-panel__inner__right">
                            </div>
                        </div>
                    </div>
                </ContentWrapper>
            </div>
        );
    }
}


export default Account;
