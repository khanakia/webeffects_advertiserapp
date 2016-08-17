import React, { Component } from 'react';
import ReactDom from 'react-dom';
import OrgHelper from '../helpers/helper_org.js'
import { API_URL_GET_USER } from '../config.js'
import Auth from '../helpers/auth.js'

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
        var valid = jQuery("#editDetailForm").valid();
        if (!valid) {
            return false };
        // this.props.dispatch({type: 'REMOVE'});
        // this.props.fetchOrgs();

        OrgHelper.store({
            name: this.refs.name.value
        }).then(function(response) {
            $('#editDetailFormModal').modal('hide');
            this.props.fetchOrgs();
        }.bind(this));
    }

    static showInPoup({settings={}, data={}, onDataUpdate=this.defaultProps.onDataUpdate()}) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message : '<div id="' + uniq + '"></div>',
            container_class : "",
            opacity: 0.5,
            blur: false,
            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                ReactDom.render(<UserProfileEditForm popup_id={pid} settings={settings} data={data} onDataUpdate={onDataUpdate} />, document.getElementById(uniq));
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
                    <h4 className="modal-title">Edit User Details</h4>
                </div>
                
                <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active"><a href="#essentials" aria-controls="essentials" role="tab" data-toggle="tab">Essentials</a></li>
                    <li role="presentation"><a href="#details" aria-controls="details" role="tab" data-toggle="tab">Details</a></li>
                    <li role="presentation"><a href="#address" aria-controls="address" role="tab" data-toggle="tab">Address</a></li>
                    <li role="presentation"><a href="#localization" aria-controls="localization" role="tab" data-toggle="tab">Localization</a></li>
                </ul>

                <div className="content-area">
                    <form className="form-horizontal control-label-left" ref='form' onSubmit={this.handleSubmit}>
                        <div className="tab-content">
                            <div role="tabpanel" className="tab-pane active" id="essentials">
                                <div className="row">
                                    <br/>
                                    <div className="col-md-3">
                                        <label>Email*</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <input type="text" className="email form-control" defaultValue={data.email} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <label>Name*</label>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input type="text" className="fname form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input type="text" className="lname form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" className="tab-pane" id="details">
                                <div className="row">
                                    <br/>
                                    <div className="col-md-3">
                                        <label>Job Title</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <input type="text" className="job_title form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <label>Office Phone</label>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <input type="text" className="office_phone form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <input type="text" className="office_phone_ext form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <label>Cell Phone</label>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <select name="country" className="select_country form-control">
                                                <option value="">Select Country</option>
                                                <option value="AF">Afghanistan</option>
                                                <option value="AL">Albania</option>
                                                <option value="DZ">Algeria</option>
                                                <option value="AS">American Samoa</option>
                                                <option value="AD">Andorra</option>
                                                <option value="AG">Angola</option>
                                                <option value="AI">Anguilla</option>
                                                <option value="AG">Antigua &amp; Barbuda</option>
                                                <option value="AR">Argentina</option>
                                                <option value="AA">Armenia</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <input type="text" className="prefix form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <input type="text" className="number form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <label>Home Phone</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <input type="text" className="home_phone form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <label>Fax</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <input type="text" className="fax form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" className="tab-pane" id="address">
                                <div className="row">
                                    <br/>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <input type="text" className="fax form-control" placeholder="Line1" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="fax form-control" placeholder="Line2" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="fax form-control" placeholder="City" />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <input type="text" className="fax form-control" placeholder="State/Country" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="fax form-control" placeholder="Zip/Post Code" />
                                        </div>
                                        <div className="form-group">
                                            <select name="country" className="select_country form-control">
                                                <option value="">Select Country</option>
                                                <option value="AF">Afghanistan</option>
                                                <option value="AL">Albania</option>
                                                <option value="DZ">Algeria</option>
                                                <option value="AS">American Samoa</option>
                                                <option value="AD">Andorra</option>
                                                <option value="AG">Angola</option>
                                                <option value="AI">Anguilla</option>
                                                <option value="AG">Antigua &amp; Barbuda</option>
                                                <option value="AR">Argentina</option>
                                                <option value="AA">Armenia</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" className="tab-pane" id="localization">
                                <div className="row">
                                    <br/>
                                    <div className="col-md-3">
                                        <label>Language</label>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <select name="country" className="select_country form-control">
                                                <option value="">Select Language</option>
                                                <option value="AF">Afghanistan</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <label>Date Format</label>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <select name="country" className="select_date_format form-control">
                                                <option value="1" selected="">dd/mm/yyyy</option>
                                                <option value="2">mm/dd/yyyy</option>
                                                <option value="3">dd.mm.yyyy</option>
                                                <option value="4">yyyy-mm-dd</option>
                                                <option value="5">yyyy.mm.dd</option>
                                                <option value="6">mm.dd.yyyy</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <label>Time Format</label>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <select name="country" className="select_hour_format form-control">
                                                <option value="1" example="eg. 11:17AM">12 Hour Format (h:mmtt)</option>
                                                <option value="2" example="eg. 11:17" selected="">24 Hour Format (HH:MM)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <label>Calendar Start</label>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <select name="country" className="select_calender form-control">
                                                <option value="no">Calendars start on a Monday</option>
                                                <option value="yes" selected="">Calendars start on a Sunday</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <label>Time Zone</label>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <select name="country" className="select_time_zone form-control">
                                                <optgroup label="GMT -11">
                                                    <option example="Current time: 11/08/2016 22:17" value="10">Midway Island</option>
                                                    <option example="Current time: 11/08/2016 22:17" value="11">Samoa</option>
                                                </optgroup>
                                                <optgroup label="GMT -10">
                                                    <option example="Current time: 11/08/2016 23:17" value="1">Hawaii</option>
                                                </optgroup>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default UserProfileEditForm;
