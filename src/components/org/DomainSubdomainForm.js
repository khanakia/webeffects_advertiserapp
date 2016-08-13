import React, { Component } from 'react';
import ReactDom from 'react-dom';

import DomainHelper from '../../helpers/helper_org.js'

import { fetchOrgs, fetchOrgCurrent } from '../../actions/action_organization';
import {store} from '../../store/index.js';


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


    handleSubmit = (e) => {
        e.preventDefault();

        let data = jQuery(this.refs.form).serialize();
        data = URI.parseQuery(data);

        var valid = jQuery(this.refs.form).valid();
        if (!valid) {return false};


        if (data.id) {
            var ajaxObj = DomainHelper.updatedomain(data);
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

    render() {
        return (
            <div>
                <form className="form" ref='form' onSubmit={this.handleSubmit}>
                    <input type="hidden" className="form-control" ref="id" name="id" id="id" defaultValue={this.props.data.id} />
                    <div className="row">
                        <div className="col-md-8">
                            <h4>Domain</h4>
                            <div className="form-group">
                                <label className="col-sm-12 control-label">Organization Domain</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control required" name="org_domain" id="org_domain" defaultValue={this.props.data.org_domain} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-12 control-label">Organization Subdomain</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control required" name="org_subdomain" id="org_subdomain" defaultValue={this.props.data.org_slug} />
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


export default DomainSubdomainForm;