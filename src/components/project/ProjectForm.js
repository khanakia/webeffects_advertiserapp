import React, { Component } from 'react';
import ReactDom from 'react-dom';

import ProjectHelper from '../../helpers/helper_project.js'

import { fetchProjects } from '../../actions/action_project';
import {store} from '../../store/index.js';

import InputDate from '../controls/InputDate'

class ProjectForm extends Component {
    constructor(props) {
        super(props);

        this.msg_btn_save_text = 'Create Project'
        this.msg_heading = 'Create Project'
    }

    static defaultProps = {
        onDataUpdate: function(org) { },
        
        popup_id: '',
        settings : {},
        data : {
            id: '',
            project_name: '',
            project_note: '',
            project_status_id: '',
            project_start_date: '',
            project_end_date: '',
        }    
    }

    componentWillMount() {
        if(!this.props.is_new) {
            this.msg_btn_save_text = "Update Project"
            this.msg_heading = 'Edit Project'
        }
    }

    componentDidMount() {
        
    }


    hidePopup = () => {
        if (this.props.popup_id) {
            jQuery('#' + this.props.popup_id).popup('hide');
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();

        // data = URI.parseQuery(data);

        var valid = jQuery(this.refs.form).valid();
        if (!valid) {return false};

        let data = jQuery(this.refs.form).serialize();

        // if (data.id) {
        //     var ajaxObj = ProjectHelper.update(data);
        //     console.log("Update");
        // } else {
        //     var ajaxObj = ProjectHelper.store(data);
        // }

        ProjectHelper.save(data).then(function(response) {
            // console.log(response);
            store.dispatch(fetchProjects()).then((response) => {
            });
            this.props.onDataUpdate(response.data.project)
            this.hidePopup();

            if(response.data.status=="OK") {
                toastr.success(lang[response.data.code])
            }

        }.bind(this));

        return false;

    }

    render() {
        if (jQuery.isEmptyObject(this.props.data)) return false;
        return (
            <div>
                <div className="modal-header">
                    <h4 className="modal-title">{this.msg_heading}</h4>
                </div>
                <form className="form-horizontal11" ref='form' onSubmit={this.handleSubmit}>
                    <input type="hidden" className="form-control" ref="id" name="id" id="id" defaultValue={this.props.data.id} />
                    <div className="content-area">
                        <ul className="nav nav-tabs" role="tablist">
                            <li role="presentation" className="active"><a href="#general" aria-controls="general" role="tab" data-toggle="tab">General</a></li>
                            <li role="presentation"><a href="#description" aria-controls="description" role="tab" data-toggle="tab">Description</a></li>
                        </ul>

                        <div className="tab-content">
                            <div role="tabpanel" className="tab-pane active" id="general">
                                <div className="form-group">
                                    <label className="control-label">Name of the Project</label>
                                    <div className="">
                                        <input type="text" className="form-control required" name="project_name" id="project_name" defaultValue={this.props.data.project_name} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className=" control-label">Start Date</label>
                                    <div className="">
                                        
                                        <InputDate name="project_start_date" defaultValue={this.props.data.project_start_date} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className=" control-label">End Date</label>
                                    <div className="">
                                        <InputDate name="project_end_date" defaultValue={this.props.data.project_end_date} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className=" control-label">End Date</label>
                                    <div className="">
                                        <select name="project_status_id" defaultValue={this.props.data.project_status_id}>
                                            <option value="1">Active</option>
                                            <option value="2">Archived</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div role="tabpanel" className="tab-pane" id="description">
                                <div className="form-group">
                                    <label className=" control-label">Description</label>
                                    <div className="">
                                        <textarea className="form-control" name="project_note" defaultValue={this.props.data.project_note}></textarea>
                                    </div>
                                </div>
                            </div>            
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


export default ProjectForm;
