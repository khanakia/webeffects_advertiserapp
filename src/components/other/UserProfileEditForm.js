import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Auth} from '../../helpers'
import { API_URL_GET_USER } from '../../config.js'
import UserHelper from '../../helpers/helper_user.js'

import DropdownCountries from '../controls/DropdownCountries'


class UserProfileEditForm extends Component {
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
        if (!valid) { return false };

        let param = jQuery(this.refs.form).serialize();

        UserHelper.update(param).then(function(response){
            if (response.data.STATUS=="FAILED") {
                toastr.error(response.data.error_message.email);
            } else {
                toastr.success('User Information Updated.')
                this.hidePopup()
            }
            
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


    hidePopup = () => {
        if (this.props.popup_id) {
            jQuery('#' + this.props.popup_id).popup('hide');
        }
    }


    render() {
        const data = this.props.data
        console.log(data)

        return (
            <div>
                <div className="modal-header">
                    <h4 className="modal-title">Edit your details</h4>
                </div>


                <form className="form-horizontal control-label-left" ref='form' onSubmit={this.handleSubmit}>
                    <div className="content-area">
                        <ul className="nav nav-tabs" role="tablist">
                            <li role="presentation" className="active"><a href="#essentials" aria-controls="essentials" role="tab" data-toggle="tab">Essentials</a></li>
                            <li role="presentation"><a href="#address" aria-controls="address" role="tab" data-toggle="tab">Address</a></li>
                            <li role="presentation"><a href="#localization" aria-controls="localization" role="tab" data-toggle="tab">Localization</a></li>
                        </ul>
                        <div className="tab-content mt10">
                            <div role="tabpanel" className="tab-pane active" id="essentials">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">First Name</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control required" name="first_name" id="first_name" defaultValue={data.first_name} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Last Name</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control required" name="last_name" id="last_name" defaultValue={data.last_name} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Email</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control required" name="email" id="email" defaultValue={data.email} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Phone</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="mobile" id="mobile" defaultValue={data.mobile} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Office Phone</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="office_phone" id="office_phone" defaultValue={data.office_phone} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" className="tab-pane" id="address">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Line1</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="address_line_1" id="address_line_1" defaultValue={data.address_line_1} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Line2</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="address_line_2" id="address_line_2" defaultValue={data.address_line_2} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">City</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="city" id="city" defaultValue={data.city} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">State</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="state" id="state" defaultValue={data.state} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Zip Code</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="zipcode" id="zipcode" defaultValue={data.zipcode} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Country</label>
                                            <div className="col-sm-9">
                                                <DropdownCountries name="country" defaultValue={this.props.data.country} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" className="tab-pane" id="localization">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Date Format</label>
                                            <div className="col-sm-9">
                                                <select className="form-control required" name="localization_dateformat" id="localization_dateformat" defaultValue={data.localization_dateformat}>
                                                    <option value="1">mm/dd/yyyy</option>
                                                    <option value="2">dd.mm.yyyy</option>
                                                    <option value="3">dd-mm-yyyy</option>
                                                    <option value="4">yyyy/mm/dd</option>
                                                    <option value="5">yyyy-mm-dd</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Time Format</label>
                                            <div className="col-sm-9">
                                                <select className="form-control required" name="localization_timeformat" id="localization_timeformat" defaultValue={data.localization_timeformat}>
                                                    <option value="1">12 hour clock</option>
                                                    <option value="2">24 hour clock</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        {/*<div className="form-group">
                                            <label className="col-sm-3 control-label">Time Zone</label>
                                            <div className="col-sm-9">
                                                <select className="form-control required" name="time_zone" id="time_zone" defaultValue={data.time_zone}>
                                                    <optgroup label="GMT -11">
                                                        <option example="Current time: 11/08/2016 22:17" value="10">Midway Island</option>
                                                        <option example="Current time: 11/08/2016 22:17" value="11">Samoa</option>
                                                    </optgroup>
                                                    <optgroup label="GMT -10">
                                                        <option example="Current time: 11/08/2016 23:17" value="1">Hawaii</option>
                                                    </optgroup>
                                                </select>
                                            </div>
                                        </div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer text-right">
                        <button type="submit" className="btn btn-blue-link">Update Profile</button>
                    </div>
                </form>
            </div>
        );
    }
}


export default UserProfileEditForm;
