import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Auth} from '../../helpers'
import { API_URL_CHANGE_PWD } from '../../config.js'

import DropdownCountries from '../controls/DropdownCountries'


class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    static defaultProps = {
        onDataUpdate: function(org) { },

        popup_id: '',
        settings : {},
        // data : {
        //     id: '',
        //     org_title: '',
        // }
    }

    componentWillMount() {
        // axios({
        //   method: 'post',
        //   url: API_URL_GET_USER ,
        //   headers: Auth.header(),
        //   data : {"token": Auth.getToken()},
        // }).then(function(response){
        //     this.setState({
        //       data : response.data
        //     });
        //   }.bind(this));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var valid = jQuery(this.refs.form).valid();
        if (!valid) {
            return false };

        let data = jQuery(this.refs.password1.value);

        axios({
          method: 'post',
          url: API_URL_CHANGE_PWD ,
          headers: Auth.header(),
          data : {"token": Auth.getToken(), "data" :data},
        }).then(function(response){
            this.setState({
              data : response.data
            });
          }.bind(this));

        // this.props.dispatch({type: 'REMOVE'});
        // this.props.fetchOrgs();

        // OrgHelper.store({
        //     name: this.refs.name.value
        // }).then(function(response) {
        //     $('#editDetailFormModal').modal('hide');
        //     this.props.fetchOrgs();
        // }.bind(this));
    }

    static showInPoup() {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message : '<div id="' + uniq + '"></div>',
            container_class : "",
            opacity: 0.5,
            blur: false,
            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                ReactDom.render(<ChangePassword popup_id={pid} />, document.getElementById(uniq));
                // console.log(pid);
                // setTimeout(() => jQuery('#'+pid).popup('hide'), 3000);
            }
        });
    }

    hidePopup = () => {
        if (this.props.popup_id) {
            jQuery('#' + this.props.popup_id).popup('hide');
        }
    }


    render() {
        const data = this.props.data

        return (
            <div>
                <div className="modal-header">
                    <h4 className="modal-title">Change Password</h4>
                </div>

                <div className="content-area">
                    <form className="form-horizontal control-label-left" ref='form' onSubmit={this.handleSubmit}>
                        <div className="tab-content">
                            <div role="tabpanel" className="tab-pane active" id="essentials">
                                <div className="row">
                                    <div className="col-md-10">
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">New Password</label>
                                            <div className="col-sm-8">
                                                <input type="password" className="form-control required" name="password" id="password" ref="password1" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Confirm New Password</label>
                                            <div className="col-sm-8">
                                                <input type="password" className="form-control required" name="confirm_password" id="confirm_password" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer text-right">
                            <button type="submit" className="btn btn-success" ref="btn_save" >Save</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default ChangePassword;
