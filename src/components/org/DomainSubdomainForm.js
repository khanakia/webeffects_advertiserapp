import React, { Component } from 'react';
import ReactDom from 'react-dom';

import OrgHelper from '../../helpers/helper_org.js'

import { fetchOrgs, fetchOrgCurrent } from '../../actions/action_organization';
import {store} from '../../store/index';
import {ROOT_HOST} from '../../config'

class DomainSubdomainForm extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        onDataUpdate: function(org) {},
        
        popup_id: '',
        settings : {},
        data : {
            id: '',
            org_title: '',
        }    
    }

    componentWillMount() {

    }

    componentDidMount() {
        
    }


    static showInPoup({settings={}, data={}, onDataUpdate=this.defaultProps.onDataUpdate()}) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach : true,
            message : '<div id="' + uniq + '"></div>',
            container_class : "w500",
            opacity: 0.5,
            blur: false,
            onopen : function(e){
              var pid = (jQuery(e).attr('id'));
              ReactDom.render(<DomainSubdomainForm popup_id={pid} settings={settings} data={data} onDataUpdate={onDataUpdate} />, document.getElementById(uniq));
              console.log(pid);
              // setTimeout(() => jQuery('#'+pid).popup('hide'), 3000); 
            }
        });
    }


    hidePopup = () => {
        if (this.props.popup_id) {
            jQuery('#' + this.props.popup_id).popup('hide');
        }
    }


    handleSubmitSubdomain = (e) => {
        e.preventDefault();

        var valid = jQuery(this.refs.formSubdomain).valid();
        if (!valid) {return false};

        let data = jQuery(this.refs.formSubdomain).serialize();
        data = URI.parseQuery(data);

        if (data.id) {
            var ajaxObj = OrgHelper.updateSubdomain(data);
        } else {
            toastr.error("Organization id not found.");
        }

        ajaxObj.then(function(response) {
            if (response.data.status) {
                store.dispatch(fetchOrgs()).then((returndata) => {
                    store.dispatch(fetchOrgCurrent(returndata))
                });
                toastr.success(response.data.message);
                this.props.onDataUpdate(response.data.org)
                this.hidePopup();
            } else {
                toastr.error(response.data.message);
            }
        }.bind(this));

        return false;
    }

    handleSubmitDomain = (e) => {
        e.preventDefault();

        var valid = jQuery(this.refs.formDomain).valid();
        if (!valid) {return false};

        let data = jQuery(this.refs.formDomain).serialize();
        data = URI.parseQuery(data);

        if (data.id) {
            var ajaxObj = OrgHelper.updateDomain(data);
        } else {
            toastr.error("Organization id not found.");
            return false;
        }

        ajaxObj.then(function(response) {
            if (response.data.status) {
                store.dispatch(fetchOrgs()).then((returndata) => {
                    store.dispatch(fetchOrgCurrent(returndata))
                });
                toastr.success(response.data.message);
                this.props.onDataUpdate(response.data.org)
                this.hidePopup();
            } else {
                toastr.error(response.data.message);
            }
        }.bind(this));

        return false;
    }

    inputSubdomainChange = (e) => {
        var value = e.target.value;
        if(value) {
            value = value+'.' + ROOT_HOST;
        }
        jQuery(this.refs.input_subdomain_preview).text(value);
    }

    getInputSubdomainPreview(org_slug) {
        var value = '';
        if(org_slug) {
            value = org_slug+'.' + ROOT_HOST;
        }

        return value;
    }

    render() {
        return (
            <div>
                <div className="modal-header">
                    <h4 className="modal-title">Edit Domains</h4>
                </div>
                
                <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active"><a href="#subdomain" aria-controls="subdomain" role="tab" data-toggle="tab">SubDomain</a></li>
                    <li role="presentation"><a href="#domain" aria-controls="domain" role="tab" data-toggle="tab">Custom Domains</a></li>
                </ul>

                <div className="content-area">
                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane active" id="subdomain">
                            <form className="form" ref='formSubdomain' onSubmit={this.handleSubmitSubdomain}>
                                    <input type="hidden" className="form-control" ref="id" name="id" id="id" defaultValue={this.props.data.id} />
                                    <div className="form-group">
                                        <label className="control-label">Organization Subdomain</label>
                                            
                                        <input type="text" className="form-control required" ref="input_subdomain" name="org_subdomain" id="org_subdomain" defaultValue={this.props.data.org_slug} onChange={this.inputSubdomainChange}/>
                                        <p className="help-block" ref="input_subdomain_preview">{this.getInputSubdomainPreview(this.props.data.org_slug)}</p>
                                    
                                    </div>
                                <div className="modal-footer text-right">
                                    <button type="submit" className="btn btn-success">Save</button>
                                </div>
                            </form>
                        </div>
                        <div role="tabpanel" className="tab-pane" id="domain">
                           <form className="form" ref='formDomain' onSubmit={this.handleSubmitDomain}>
                                    <input type="hidden" className="form-control" ref="id" name="id" id="id" defaultValue={this.props.data.id} />
                                    <div className="form-group">
                                        <label className="control-label">Organization Domain</label>
                                        <input type="text" className="form-control required" name="org_domain" id="org_domain" defaultValue={this.props.data.org_domain} />
                                    </div>
                                <div className="modal-footer text-right">
                                    <button type="submit" className="btn btn-success">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default DomainSubdomainForm;