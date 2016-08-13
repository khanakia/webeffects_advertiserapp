import React, { Component } from 'react';
import ReactDom from 'react-dom';

import OrgHelper from '../../helpers/helper_org.js'

import { fetchOrgUsers } from '../../actions/action_organization';
import {store} from '../../store/index.js';
import DropdownCompanies from '../controls/DropdownCompanies'


class OrgUserInviteForm extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        onDataUpdate: function(org) { },
        
        popup_id: '',
        settings : {},
        data : {
            input_emails: '',
        }    
    }

    componentWillMount() {

    }

    componentDidMount() {
        jQuery(this.refs.input_emails).tagsinput();
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
              ReactDom.render(<OrgUserInviteForm popup_id={pid} settings={settings} data={data} onDataUpdate={onDataUpdate} />, document.getElementById(uniq));
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
        
        let data = {
            'input_emails' : jQuery(this.refs.input_emails).tagsinput('items')
        };

        var ajaxObj = OrgHelper.inviteUsers(data);

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
                            <h4>Invite Users</h4>
                            <div className="form-group">
                                <label className="col-sm-12 control-label">Enter Emails</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control required width-full" ref="input_emails" name="input_emails" id="input_emails" defaultValue={this.props.data.input_emails} />
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


export default OrgUserInviteForm;
