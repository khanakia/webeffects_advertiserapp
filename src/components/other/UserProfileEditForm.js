import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Auth} from '../../helpers'
import { API_URL_GET_USER } from '../../config.js'

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
        if (!valid) {
            return false };
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

        return (
            <div>
                <div className="modal-header">
                    <h4 className="modal-title">Edit your details</h4>
                </div>


                <form className="form-horizontal control-label-left" ref='form' onSubmit={this.handleSubmit}>
                    <div className="content-area">
                        <ul className="nav nav-tabs" role="tablist">
                            <li role="presentation" className="active"><a href="#essentials" aria-controls="essentials" role="tab" data-toggle="tab">Essentials</a></li>
                            <li role="presentation"><a href="#details" aria-controls="details" role="tab" data-toggle="tab">Details</a></li>
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
                                                <input type="text" className="form-control required" name="fname" id="fname" defaultValue={data.fname} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Last Name</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control required" name="lname" id="lname" defaultValue={data.lname} />
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
                                                <input type="text" className="form-control" name="phone" id="phone" defaultValue={data.phone} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" className="tab-pane" id="details">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Office Phone</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="office_phone" id="office_phone" defaultValue={data.office_phone} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Cell Phone</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="cell_phone" id="cell_phone" defaultValue={data.cell_phone} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Home Phone</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="home_phone" id="home_phone" defaultValue={data.home_phone} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Fax</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="fax" id="fax" defaultValue={data.fax} />
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
                                                <input type="text" className="form-control" name="line1" id="line1" defaultValue={data.line1} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Line2</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="line2" id="line2" defaultValue={data.line2} />
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
                                                <input type="text" className="form-control" name="zip_code" id="zip_code" defaultValue={data.zip_code} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Country</label>
                                            <div className="col-sm-9">
                                                <DropdownCountries name="company_country" defaultValue={this.props.data.company_country} />
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
                                                <select className="form-control required" name="dateFormat" id="dateFormat" defaultValue={data.dateFormat}>
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
                                                <select className="form-control required" name="timeFormat" id="timeFormat" defaultValue={data.timeFormat}>
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
