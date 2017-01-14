import React, { Component } from 'react';

import ContentWrapper from './shared/ContentWrapper'

import {ROOT_URL, API_URL_CHANGE_PWD} from '../config.js'

import {Auth, Localstore, UserHelper, ContactHelper, ProjectHelper} from '../helpers'

import ChangePasswordForm from 'components/Forms/ChangePasswordForm'

import ContactPersonInput from './ContactPersonInput'
import ProjectContactInput from './ProjectContactInput'

class Account extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.fetchContacts()
        this.tabsFn()
    }

    componentDidUpdate() {
        // this.tabsFn()
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

            $('.tab_drawer_heading').removeClass('d_active');
            $('.tab_drawer_heading a[href="'+href+'"]').closest('h3').addClass('d_active');


            $('.tab-pane').slideUp();
            $('.tab-pane'+href).slideDown();
        })

    }

    // handleSubmitChangePassword = (e) => {
    //     e.preventDefault();
    //     var valid = jQuery(this.refs.form).valid();
    //     if (!valid) { return false };

    //     let param = jQuery(this.refs.form).serialize();

    //     // let data1 = jQuery(this.refs.password1.value);
    //     // let confirm = jQuery(this.refs.confirm1.value);
    //     // console.log(data);
    //     // if (data!=confirm) {
    //     //     toastr.error('Please insert confirm password same as password.');
    //     //     return false
    //     // };
    //     UserHelper.changePassword(param).then(function(response){
    //         if (response.data.STATUS=="FAILED") {
    //             toastr.error(response.data.error_message.password);
    //         } else {
    //             toastr.success('Password changed successfully.')
    //         }
    //     }.bind(this));
    // }

    handleSumbit() {
        var _this = this;
        let data = jQuery(_this.refs.form_contactperson).serialize();    

        ContactHelper.saveAll(data).then((response) => {
            _this.props.fetchContacts();
        })

    }

    handleCancel() {
        jQuery.confirm({
            title: trans.account_confirm_title,
            content: trans.account_confirm_content,
            closeIcon: true,
            buttons: {
                cancelAction: {
                    text: trans.account_confirm_cancel,
                    action: function () {
                        jQuery(".jconfirm").hide()
                    }
                },
                deleteAction: {
                    text: trans.account_confirm_delete,
                    action: function () {
                        window.location.reload()
                        jQuery(".jconfirm").hide()
                    }
                }
            }
        })
    }

    onContactItemChange = (item, project_id) => {
        console.log(item)
        ProjectHelper.updateContact(project_id, item.id)
    }

    // _render_tabPassword() {
    //     return (
    //         <div>
    //             <div className="formstyle1Ct changepwdCt">
    //                 <form className="form-horizontal formstyle1 ChangepwdForm" ref='form' onSubmit={this.handleSubmitChangePassword}>
    //                     <div className="row">
    //                         <div className="col-md-12">
    //                             <div className="form-group">
    //                                 <label className="col-sm-12">{trans.account_uw_oude_wachtwoord}</label>
    //                                 <div className="col-sm-12">
    //                                     <div className="input-group">
    //                                         <div className="input-group-addon"><i className="fa fa-key" aria-hidden="true"></i></div>
    //                                         <input type="password" className="form-control required" name="oldpassword" id="oldpassword"  placeholder="••••••••••" />
    //                                     </div>
    //                                 </div>
    //                             </div>

    //                             <div className="form-group">
    //                                 <label className="col-sm-12">{trans.account_uw_nieuwe_wachtwoord}</label>
    //                                 <div className="col-sm-12">
    //                                     <div className="input-group">
    //                                         <div className="input-group-addon"><i className="fa fa-key" aria-hidden="true"></i></div>
    //                                         <input type="password" className="form-control required" name="password" id="password"  placeholder="••••••••••" />
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             <div className="form-group">
    //                                 <label className="col-sm-12"><div className="row"><div className="col-sm-12">{trans.account_noogmaals}</div></div></label>
    //                                 <div className="col-sm-12">
    //                                     <div className="input-group">
    //                                         <div className="input-group-addon"><i className="fa fa-key" aria-hidden="true"></i></div>
    //                                         <input type="password" className="form-control required updatePassword" name="password_confirmation" id="password_confirmation" placeholder="••••••••••"/>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="text-right">
    //                         <button type="submit" className="btn btn-green btn--round">{trans.account_bevestig_btn}</button>
    //                     </div>
    //                 </form>
    //             </div>
    //         </div>
    //     )
    // }

    _render_tabGegevens() {
        return (
            <div>
                <form ref="form_contactperson">
                    <div className="form-group">
                        <label className="mb15">{trans.account_bedrijfsnaam_label}</label>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="iconc-buildings"></i>
                                    </span>
                                    <input type="text" className="form-control" name="company_name" defaultValue={this.props.current_user.company_name}  />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>{trans.account_contactpersonen}</label>
                        
                            <ContactPersonInput items={this.props.contact_list} />
                    </div>
                </form>

                <div className="form-group">
                    <label>{trans.account_locatie_contactpersonen}</label>
                    <ProjectContactInput onItemChange={this.onContactItemChange} items={this.props.project_list}  contact_list={this.props.contact_list}/>
                </div>
            </div>
        )
    }

    _render_rightBlock() {
        return (
            <div className="block-right">
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
            <div className="p20">
                <ContentWrapper hasSidebar={true}>
                    <div className="page-panel">
                        <div className="page-panel__heading">{trans.account_title}</div>
                        <div className="page-panel__inner">
                            <div className="page-panel__inner__left">
                                  <ul className="nav nav-tabs nav-tabs--vertical" role="tablist">
                                    <li role="presentation" className="active">
                                        <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">{trans.account_link_gegevens}</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#changepassword" aria-controls="changepassword" role="tab" data-toggle="tab">{trans.account_link_wachtwoord_wijzigen}</a>
                                    </li>
                                  </ul>
                            </div>
                            <div className="page-panel__inner__content">                                 
                                <div className="tab-content">
                                    <h3 className="d_active tab_drawer_heading">
                                        <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">{trans.account_link_gegevens}</a>
                                    </h3>
                                    <div role="tabpanel" className="tab-pane active" id="profile">
                                        {this._render_tabGegevens()}
                                    </div>

                                    <h3 className="tab_drawer_heading">
                                        <a href="#changepassword" aria-controls="changepassword" role="tab" data-toggle="tab">{trans.account_link_wachtwoord_wijzigen}</a>
                                    </h3>
                                    <div role="tabpanel" className="tab-pane " id="changepassword">
                                        {/*this._render_tabPassword()*/}
                                        <ChangePasswordForm layout="layout2" />
                                    </div>                                    
                                </div>

                                <div className="visible-xs visible-sm twoBtnStyle">
                                    <button ref="annuleren" type="button" className="btn btn-plain" onClick={()=>{this.handleCancel()}}>{trans.account_link_annuleren}</button>
                                    <button ref="submit" type="button" className="btn btn-plain" onClick={()=>{this.handleSumbit()}}>{trans.account_link_opslaan}</button>
                                </div>
                            </div>
                            <div className="page-panel__inner__right">
                                {this._render_rightBlock()}
                            </div>
                        </div>
                    </div>
                </ContentWrapper>
            </div>
        );
    }
}


export default Account;
