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
            container_class : "w500",
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

        if(data.input_emails.length==0) {
            toastr.error("Please add some emails first.")
            return false;
        }
        
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
                <div className="modal-header">
                    <h4 className="modal-title">Invite Users</h4>
                </div>

                <form className="form" ref='form' onSubmit={this.handleSubmit}>
                    <input type="hidden" className="form-control" ref="id" name="id" id="id" defaultValue={this.props.data.id} />
                    <div className="content-area">
                        <div className="form-group">
                            <label className="control-label">Enter Emails</label>
                            <div className="bootstrap-tagsinput-widthfull">
                                <input type="text" className="form-control required width-full" ref="input_emails" name="input_emails" id="input_emails" defaultValue={this.props.data.input_emails} />
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


export default OrgUserInviteForm;
