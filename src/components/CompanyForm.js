import React, { Component } from 'react';
import ReactDom from 'react-dom';

import CompanyHelper from '../helpers/helper_company.js'


class CompanyForm extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props.data);
        // this.data = this.props.data;

        var defaults = {
            // popup_id : '',

            company_title : '',
            company_website : '',
            company_email : ''
        }

        this.data = $.extend({}, defaults, this.props.data);
    }

    componentWillMount() {
        // this.props.fetchCompanies();
    }

    static showInPoup(data={},props={}) {
        // this.parentProps = props
        
        Controls.showpopup({
            detach : true,
            message : '<div id="abc"></div>',
            opacity: 0.5,
            onopen : function(e){
              var pid = (jQuery(e).attr('id'));
              ReactDom.render(<CompanyForm popup_id={pid} {...props} />, document.getElementById('abc'));
              console.log(pid);
              // setTimeout(() => jQuery('#'+pid).popup('hide'), 3000); 
            }
        });
    }

    hidePopup = () => {
        if(this.props.popup_id) {
            jQuery('#'+this.props.popup_id).popup('hide');
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();

        let data = jQuery(this.refs.form).serialize();
        console.log(data);

        // var valid = jQuery("#orgForm").valid();
        // if (!valid) {return false};

        CompanyHelper.store(data).then(function(response){
            console.log(response);
            this.props.fetchCompanies();
            this.hidePopup();
            
        }.bind(this));

        return false;
      
    }


    render() {
        return (
            <div>
                <form className="form-horizontal" ref='form' onSubmit={this.handleSubmit}>
                    <ul className="nav nav-tabs" role="tablist">
                        <li role="presentation" className="active"><a href="#general" aria-controls="general" role="tab" data-toggle="tab">General</a></li>
                        <li role="presentation"><a href="#address" aria-controls="address" role="tab" data-toggle="tab">Address</a></li>
                    </ul>

                    <div className="tab-content mt30">
                        <div role="tabpanel" className="tab-pane active" id="general">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Title</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name="company_title" id="company_title" defaultValue={this.data.company_title} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Email</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name="company_email" id="company_email" defaultValue={this.data.company_email} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Website</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name="company_website" id="company_website" defaultValue={this.data.company_website} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Industry</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name="company_industry" id="company_industry" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Phone</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name="company_phone" id="company_phone" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Fax</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name="company_fax" id="company_fax" />
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div role="tabpanel" className="tab-pane" id="address">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Line1</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name="company_address_line1" id="company_address_line1" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Line2</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name="company_address_line2" id="company_address_line2" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">State</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name="company_state" id="company_state" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">City</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name="company_city" id="company_city" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Zip Code</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name="company_zipcode" id="company_zipcode" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Country</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name="company_country" id="company_country" />
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="text-right">
                        <button type="submit" className="btn btn-success">Save</button>
                    </div>
                </form>

            </div>
        );
    }
}


export default CompanyForm;
