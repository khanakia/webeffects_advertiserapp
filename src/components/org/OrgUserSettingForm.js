import React, { Component } from 'react';
import ReactDom from 'react-dom';

import OrgUserHelper from '../../helpers/helper_org_user.js'

import { fetchOrgUsers } from '../../actions/action_organization';
import {store} from '../../store/index.js';
import DropdownCompanies from '../controls/DropdownCompanies'


class OrgUserSettingForm extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        onDataUpdate: function(org) { },
        
        popup_id: '',
        settings : {},
        data : {
            id: '',
            job_title: '',
            company_id : '',
        }    
    }

    componentWillMount() {

    }

    componentDidMount() {
        var elems = document.querySelectorAll('.js-switch');
        for (var i = 0; i < elems.length; i++) {
          var switchery = new Switchery(elems[i], { size: 'small' });
        }
        
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
              ReactDom.render(<OrgUserSettingForm popup_id={pid} settings={settings} data={data} onDataUpdate={onDataUpdate} />, document.getElementById(uniq));
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

        var valid = jQuery(this.refs.form).valid();
        if (!valid) {return false};

        let data = jQuery(this.refs.form).serialize();
        // data = URI.parseQuery(data);
        
        var ajaxObj = OrgUserHelper.update(data);

        ajaxObj.then(function(response) {
            console.log(response);
            store.dispatch(fetchOrgUsers()).then((response1) => {
                
            });
            this.props.onDataUpdate(response.data.org)
            this.hidePopup();
        }.bind(this));

        return false;
    }


    render() {
        return (
            <div>
                <div className="modal-header">
                    <h4 className="modal-title">Edit User Setting on this Organization</h4>
                </div>
                <form className="form" ref='form' onSubmit={this.handleSubmit}>
                    <input type="hidden" className="form-control" ref="id" name="id" id="id" defaultValue={this.props.data.id} />
                    <div className="content-area">
                            
                            <div className="form-group">
                                <label className="control-label">Job Title</label>
                                <div className="">
                                    <input type="text" className="form-control required" name="job_title" id="job_title" defaultValue={this.props.data.job_title} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Company</label>
                                <div className="">
                                    <DropdownCompanies name="company_id" defaultValue={this.props.data.company_id} />
                                </div>
                            </div>
                    </div>

                    <div className="modal-footer text-right">
                        <button type="submit" className="btn btn-success">Save</button>
                    </div>
                </form>

            </div>
        );
    }
}


export default OrgUserSettingForm;
