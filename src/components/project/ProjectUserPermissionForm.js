import React, { Component } from 'react';
import ReactDom from 'react-dom';

import OrgUserHelper from '../../helpers/helper_org_user.js'

import { fetchOrgUsers } from '../../actions/action_organization';
import {store} from '../../store/index.js';
import DropdownCompanies from '../controls/DropdownCompanies'


class ProjectUserPermissionForm extends Component {
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
            // permissions : {
            //     is_admin : 0,
            //     can_add_projects : 0,
            //     can_manage_people_companies : 0,
            //     automatic_access_to_all_future_projects : 0,
            // },
        }    
    }

    componentWillMount() {

    }

    componentDidMount() {
        $('#using_json_2').jstree({ 
            'core' : {
                'data' : [
                   { "id" : "access_allowed", "parent" : "#", "text" : "Access Allowed" },
                   { "id" : "project_administrator", "parent" : "#", "text" : "Project Administrator" },

                   { "id" : "view_tasks_milestones", "parent" : "#", "text" : "View Tasks & Milestones" },
                   { "id" : "update_milestones", "parent" : "view_tasks_milestones", "text" : "Update Milestones" },
                   { "id" : "update_task_lists", "parent" : "view_tasks_milestones", "text" : "Update Task Lists" },
                   { "id" : "view_estimated_time", "parent" : "view_tasks_milestones", "text" : "View Estimated Time" },
                   { "id" : "update_tasks", "parent" : "view_tasks_milestones", "text" : "Update Tasks" },
                   { "id" : "can_edit_all_tasks", "parent" : "update_tasks", "text" : "Can Edit All Tasks" },
                   
                   { "id" : "view_messages_files", "parent" : "#", "text" : "View Messages & Files" },
                   { "id" : "update_messages", "parent" : "#", "text" : "Update Messages" },
                   { "id" : "update_files", "parent" : "#", "text" : "Update Files" },

                   { "id" : "view_time_log", "parent" : "#", "text" : "View Time log" },
                   { "id" : "can_view_other_peoples_time", "parent" : "view_time_log", "text" : "Can View Other Peoples Time" },
                   { "id" : "can_access_billing", "parent" : "view_time_log", "text" : "Can Access Billing" },
                   { "id" : "can_log_time", "parent" : "view_time_log", "text" : "Can Log Time" },

                   { "id" : "view_notebooks", "parent" : "#", "text" : "View Notebooks" },
                   { "id" : "update_notebooks", "parent" : "view_notebooks", "text" : "Update Notebooks" },
                   
                   { "id" : "view_risk_register", "parent" : "#", "text" : "View Risk Register" },
                   
                   { "id" : "view_links", "parent" : "#", "text" : "View Links" },
                   { "id" : "update_links", "parent" : "view_links", "text" : "Update Links" },

                ],
            } ,
            "plugins": ["checkbox"],
            "checkbox": {
                // "three_state": false,
                // "whole_node": true,
                // "keep_selected_style": false,
                // "tie_selection": true,
                "visible" : true

            },
        });
        
    $('#using_json_2')
  // listen for event
  .on('changed.jstree', function (e, data) {
    var i, j, r = [];
    for(i = 0, j = data.selected.length; i < j; i++) {
      r.push(data.instance.get_node(data.selected[i]).id);
    }
    console.log(r.join(', '));
  })    
        
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
              ReactDom.render(<ProjectUserPermissionForm popup_id={pid} settings={settings} data={data} onDataUpdate={onDataUpdate} />, document.getElementById(uniq));
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
        console.log('PROPS' ,this.props)
        return (
            <div>
                <div className="modal-header">
                    <h4 className="modal-title">Edit User Permissions on this Organization</h4>
                </div>
                <form className="form" ref='form' onSubmit={this.handleSubmit}>
                    <input type="hidden" className="form-control" ref="org_id" name="org_id" defaultValue={this.props.data.org_id} />
                    <input type="hidden" className="form-control" ref="user_id" name="user_id" defaultValue={this.props.data.user_id} />
                    <div className="content-area">
                            
                        <div id="using_json_2">
                            
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


export default ProjectUserPermissionForm;
