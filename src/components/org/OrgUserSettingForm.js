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
            is_admin : ''
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

        let data = jQuery(this.refs.form).serialize();
        data = URI.parseQuery(data);

        var valid = jQuery(this.refs.form).valid();
        if (!valid) {return false};


        
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
                <form className="form" ref='form' onSubmit={this.handleSubmit}>
                    <input type="hidden" className="form-control" ref="id" name="id" id="id" defaultValue={this.props.data.id} />
                    <div className="row">
                        <div className="col-md-8">
                            <h4>User Setting</h4>
                            <div className="form-group">
                                <label className="col-sm-12 control-label">Job Title</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control required" name="job_title" id="job_title" defaultValue={this.props.data.job_title} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-12 control-label">Company</label>
                                <div className="col-sm-10">
                                    <DropdownCompanies defaultValue={this.props.data.company_id} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-12 control-label">Is this User an Administrator?</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control required" name="is_admin" id="is_admin" defaultValue={this.props.data.is_admin} />
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


export default OrgUserSettingForm;
