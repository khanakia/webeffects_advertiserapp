import React, { Component } from 'react';
import ReactDom from 'react-dom';

import OrgHelper from '../../helpers/helper_org.js'

import { fetchOrgs, fetchOrgCurrent } from '../../actions/action_organization';
import {store} from '../../store/index.js';


class OrgForm extends Component {
    constructor(props) {
        super(props);

        this.msg_btn_save_text = 'Create Organization'
        this.msg_heading = 'Create Organization'
    }

    static defaultProps = {
        onDataUpdate: function(org) { },
        
        popup_id: '',
        settings : {},
        data : {
            id: '',
            name: '',
        },

        is_new : true,
    }

    componentWillMount() {
        if(!this.props.is_new) {
            this.msg_btn_save_text = "Edit Organization"
            this.msg_heading = 'Edit Organization'
        }
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
              ReactDom.render(<OrgForm popup_id={pid} settings={settings} data={data} onDataUpdate={onDataUpdate} />, document.getElementById(uniq));
              // console.log(pid);
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
        // const dataJson = URI.parseQuery(data);

        // if (dataJson.id) {
        //     var ajaxObj = OrgHelper.update(data);
        //     console.log("Update");
        // } else {
        //     var ajaxObj = OrgHelper.store(data);
        // }

        OrgHelper.save(data).then(function(response) {
            console.log(response);
            // this.props.fetchTags();
            store.dispatch(fetchOrgs()).then((response1) => {
                console.log('response1', response1)
                store.dispatch(fetchOrgCurrent(response1))
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
                    <h4 className="modal-title">{this.msg_heading}</h4>
                </div>

                <form className="form" ref='form' onSubmit={this.handleSubmit}>
                    <input type="hidden" className="form-control" ref="id" name="id" id="id" defaultValue={this.props.data.id} />
                    <div className="content-area mt10">
                        <div className="form-group">
                            <input type="text" className="form-control required" name="name" id="name" defaultValue={this.props.data.name} placeholder="Name your organization" />
                        </div>

                    </div>
                    <div className="modal-footer text-right">
                        <button type="submit" className="btn btn-blue-link">{this.msg_btn_save_text}</button>
                    </div>
                </form>

            </div>
        );
    }
}


export default OrgForm;
