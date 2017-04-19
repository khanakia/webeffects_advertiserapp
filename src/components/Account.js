import React, { Component } from 'react';

import ContentWrapper from './shared/ContentWrapper'

import {ROOT_URL, API_URL_CHANGE_PWD} from '../config.js'

import {Auth, Localstore, UserHelper, ContactHelper, ProjectHelper} from '../helpers'

import ChangePasswordForm from 'components/Forms/ChangePasswordForm'


class Account extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        // this.props.fetchContacts()
        this.tabsFn()
    }

    componentDidUpdate() {
        // this.tabsFn()
    }

    tabsFn() {
        var _this = this;
        // $(".tab-pane").hide();
        // $(".tab-pane:first").show();
        $(".tab_drawer_heading.d_active").find("i").removeClass("iconc-chevron-down").addClass("iconc-chevron-up");

        $('.nav-tabs li a').click(function (e) {     
            var href = $(this).attr('href');    
            $('.tab_drawer_heading').removeClass('d_active');
            $('.tab_drawer_heading a[href="'+href+'"]').closest('h3').addClass('d_active');

            $('.tab-pane').hide();
            $('.tab-pane'+href).show();

            // if(href=="#changepassword") {
            //     jQuery(_this.refs.block_right).hide();
            // } else {
            //     jQuery(_this.refs.block_right).show();
            // }
        })

        $('.tab_drawer_heading a').click(function (e) {     
            var href = $(this).attr('href');
            if($('.tab-pane'+href).hasClass("active")) {
                return false;
            }
            $('.nav-tabs li').removeClass('active');
            $('.nav-tabs li a[href="'+href+'"]').closest('li').addClass('active');

            $('.tab_drawer_heading').removeClass('d_active');
            $('.tab_drawer_heading a[href="'+href+'"]').closest('h3').addClass('d_active');


            $('.tab-pane').slideUp();
            $('.tab-pane'+href).slideDown();
            $(".tab_drawer_heading").find("i").addClass("iconc-chevron-down").removeClass("iconc-chevron-up");
            $(".tab_drawer_heading.d_active").find("i").removeClass("iconc-chevron-down").addClass("iconc-chevron-up");

            // if(href=="#changepassword") {
            //     jQuery(_this.refs.block_right).hide();
            // } else {
            //     jQuery(_this.refs.block_right).show();
            // }
        })

    }

  

    
    _render_rightBlock() {
        return (
            <div className="block-right" ref="block_right">
                <div className="block-info">
                    <label>{trans.account_bewerkingen_label}</label>
                    <div className="d-table w100 mt20">
                        <div className="d-table-cell v-align-middle">
                            <button ref="submit" type="button" className="btn btn-green btn--round" onClick={()=>{this.handleSumbit()}}>{trans.account_link_opslaan}</button>
                        </div>
                        <div className="d-table-cell v-align-middle">
                            <button ref="annuleren" type="button" className="btn btn-plain" onClick={()=>{this.handleCancel()}}>{trans.account_link_annuleren}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
         
        
        return (
            <div className="p20 xs-p0">
                <ContentWrapper hasSidebar={true}>
                    <div className="page-panel">
                        <div className="page-panel__heading">{trans.account_title}</div>
                        <div className="page-panel__inner">
                            <div className="page-panel__inner__left">
                                  <ul className="nav nav-tabs nav-tabs--vertical" role="tablist">
                                    {/*<li role="presentation" className="active">
                                        <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">{trans.account_link_gegevens} <i className="iconc-chevron"></i></a>
                                    </li>*/}
                                    <li role="presentation" className="active">
                                        <a href="#changepassword" aria-controls="changepassword" role="tab" data-toggle="tab">{trans.account_link_wachtwoord_wijzigen} <i className="iconc-chevron"></i></a>
                                    </li>
                                  </ul>
                            </div>
                            <div className="page-panel__inner__content">                                 
                                <div className="tab-content">
                                    {/*<h3 className="d_active tab_drawer_heading">
                                                                            <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">{trans.account_link_gegevens} <i className="iconc-chevron-down"></i></a>
                                                                        </h3>
                                                                        <div role="tabpanel" className="tab-pane active" id="profile">
                                                                            {this._render_tabGegevens()}
                                                                            <div className="visible-xs visible-sm twoBtnStyle">
                                                                                <button ref="annuleren" type="button" className="btn btn-plain" onClick={()=>{this.handleCancel()}}>{trans.account_link_annuleren}</button>
                                                                                <button ref="submit" type="button" className="btn btn-plain" onClick={()=>{this.handleSumbit()}}>{trans.account_link_opslaan}</button>
                                                                            </div>
                                                                        </div>*/}

                                    <h3 className="tab_drawer_heading d_active">
                                        <a href="#changepassword" aria-controls="changepassword" role="tab" data-toggle="tab">{trans.account_link_wachtwoord_wijzigen} <i className="iconc-chevron-down"></i></a>
                                    </h3>
                                    <div role="tabpanel" className="tab-pane active" id="changepassword">
                                        {/*this._render_tabPassword()*/}
                                        <ChangePasswordForm layout="layout2" />
                                    </div>                                    
                                </div>
                            </div>
                            <div className="page-panel__inner__right">
                                {/*this._render_rightBlock()*/}
                            </div>
                        </div>
                    </div>
                </ContentWrapper>
            </div>
        );
    }
}


export default Account;
