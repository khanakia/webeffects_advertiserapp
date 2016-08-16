import React, { Component } from 'react';
import ReactDom from 'react-dom';

import OrgUserHelper from '../../helpers/helper_org_user.js'

import { fetchOrgUsers } from '../../actions/action_organization';
import {store} from '../../store/index.js';
import DropdownCompanies from '../controls/DropdownCompanies'


class OrgUserPermissionForm extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        onDataUpdate: function(org) { },
        
        popup_id: '',
        settings : {},
        data : {
            org_id : '',
            user_id: '',
            permissions : {
                is_admin : 0,
                can_add_projects : 0,
                can_manage_people_companies : 0,
                automatic_access_to_all_future_projects : 0,
            },
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
              ReactDom.render(<OrgUserPermissionForm popup_id={pid} settings={settings} data={data} onDataUpdate={onDataUpdate} />, document.getElementById(uniq));
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
        // data = URI.parseQuery(data);

        var valid = jQuery(this.refs.form).valid();
        if (!valid) {return false};


        
        var ajaxObj = OrgUserHelper.updatePermission(data);

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
                    <h4 className="modal-title">Edit User Permissions on this Organization</h4>
                </div>
                <form className="form" ref='form' onSubmit={this.handleSubmit}>
                    <input type="hidden" className="form-control" ref="org_id" name="org_id" defaultValue={this.props.data.org_id} />
                    <input type="hidden" className="form-control" ref="user_id" name="user_id" defaultValue={this.props.data.user_id} />
                    <div className="content-area">
                            <div className="form-group">
                                <label className="control-label">Is this User an Administrator?</label>
                                <div className="">
                                    <input type="hidden" name="is_admin" id="is_admin" defaultValue={0}  />
                                    <input type="checkbox" className="js-switch"  name="is_admin" id="is_admin" defaultChecked={this.props.data.permissions.is_admin} defaultValue={1}  />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Can Add Projects?</label>
                                <div className="">
                                    <input type="hidden" name="can_add_projects" id="can_add_projects" defaultValue={0}  />
                                    <input type="checkbox" className="js-switch"  name="can_add_projects" id="can_add_projects" defaultChecked={this.props.data.permissions.can_add_projects}  defaultValue={1} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Can Manage People and Companies?</label>
                                <div className="">
                                    <input type="hidden" name="can_manage_people_companies" id="can_manage_people_companies" defaultValue={0}  />
                                    <input type="checkbox" className="js-switch"  name="can_manage_people_companies" id="can_manage_people_companies" defaultChecked={this.props.data.permissions.can_manage_people_companies} defaultValue={1} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Give Automatic Access to all Future Projects?</label>
                                <div className="">
                                    <input type="hidden" name="automatic_access_to_all_future_projects" id="automatic_access_to_all_future_projects" defaultValue={0}  />
                                    <input type="checkbox" className="js-switch"  name="automatic_access_to_all_future_projects" id="automatic_access_to_all_future_projects" defaultChecked={this.props.data.permissions.automatic_access_to_all_future_projects} defaultValue={1} />
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


export default OrgUserPermissionForm;
