import React, { Component } from 'react';
import ReactDom from 'react-dom';

import CompanyHelper from '../../helpers/helper_company.js'
import { fetchCompanies } from '../../actions/action_company';
import {store} from '../../store/index.js';

class CompanyForm extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        onDataUpdate: function(org) { },
        popup_id: '',
        settings : {},
        data : {
            id : '',
            company_title : '',
            company_website : '',
            company_email : '',
            company_industry : '',
            company_phone : '',
            company_fax : '',
            company_address_line1 : '',
            company_address_line2 : '',
            company_state : '',
            company_city : '',
            company_zipcode : '',
            company_country : '',
        }    
    }

    componentWillMount() {
        // this.props.fetchCompanies();
    }

    static showInPoup({settings={}, data={}, onDataUpdate=this.defaultProps.onDataUpdate()}) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach : true,
            message : '<div id="' + uniq + '"></div>',
            container_class : "",
            opacity: 0.5,
            onopen : function(e){
              var pid = (jQuery(e).attr('id'));
              ReactDom.render(<CompanyForm popup_id={pid} settings={settings} data={data} onDataUpdate={onDataUpdate} />, document.getElementById(uniq));
              // console.log(pid);
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

        var valid = jQuery(this.refs.form).valid();
        if (!valid) {return false};

        let data = jQuery(this.refs.form).serialize();
        // const dataJson = URI.parseQuery(data);
        // if (dataJson.id) {
        //     var ajaxObj = CompanyHelper.update(data);
        //     console.log("Update");
        // } else {
        //     var ajaxObj = CompanyHelper.store(data);
        // }

        CompanyHelper.save(data).then(function(response){
            console.log(response);
            // this.props.fetchCompanies();
            store.dispatch(fetchCompanies());
            this.hidePopup();
            
        }.bind(this));

        return false;
      
    }


    render() {
        return (
            <div>
                <div className="modal-header">
                    <h4 className="modal-title">Company Information</h4>
                </div>

                <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active"><a href="#general" aria-controls="general" role="tab" data-toggle="tab">General</a></li>
                    <li role="presentation"><a href="#address" aria-controls="address" role="tab" data-toggle="tab">Address</a></li>
                </ul>

                <div className="content-area">
                    <form className="form-horizontal control-label-left" ref='form' onSubmit={this.handleSubmit}>
                        <input type="hidden" className="form-control" ref="id" name="id" id="id" defaultValue={this.props.data.id} />
                        <div className="tab-content">
                            <div role="tabpanel" className="tab-pane active" id="general">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <label className="col-sm-2 control-label">Title</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control required" name="company_title" id="company_title" defaultValue={this.props.data.company_title} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 control-label">Email</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" name="company_email" id="company_email" defaultValue={this.props.data.company_email} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 control-label">Website</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" name="company_website" id="company_website" defaultValue={this.props.data.company_website} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 control-label">Industry</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" name="company_industry" id="company_industry" defaultValue={this.props.data.company_industry} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 control-label">Phone</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" name="company_phone" id="company_phone" defaultValue={this.props.data.company_phone} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 control-label">Fax</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" name="company_fax" id="company_fax" defaultValue={this.props.data.company_fax} />
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
                                                <input type="text" className="form-control" name="company_address_line1" id="company_address_line1" defaultValue={this.props.data.company_address_line1} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Line2</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="company_address_line2" id="company_address_line2" defaultValue={this.props.data.company_address_line2} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">State</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="company_state" id="company_state" defaultValue={this.props.data.company_state} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">City</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="company_city" id="company_city" defaultValue={this.props.data.company_city} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Zip Code</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="company_zipcode" id="company_zipcode" defaultValue={this.props.data.company_zipcode} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Country</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="company_country" id="company_country" defaultValue={this.props.data.company_country} />
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>

                            </div>
                        </div>
                        
                        <div className="modal-footer text-right">
                            <button type="submit" className="btn btn-success">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default CompanyForm;
