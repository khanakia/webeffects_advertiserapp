import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { ProjectMessageHelper } from '../../helpers'

import { fetchCategoriesTypeMessage } from '../../actions/action_category';
import { fetchProjects, fetchProjectUsers} from '../../actions/action_project';

import { OBJECT_TYPE_MESSAGE } from '../../config.js'
import {store } from '../../store/index.js';

import CategorySelectControl from '../category/CategorySelectControl'
import ControlNotifyPeople from '../controls/ControlNotifyPeople'
import ProjectFileAttachForm from '../project_file/ProjectFileAttachForm'

import {connectWithStore} from '../../store/index.js';


class ProjectMessageForm extends Component {
    constructor(props) {
        super(props);

        this.msg_btn_save_text = 'Save Message'
        this.msg_heading = 'Create Message'
    }

    static defaultProps = {
        onDataUpdate: function(org) { },
        
        popup_id: '',
        settings : {},
        data : {
            id: '',
            message_title: '',
            message_body: '',
            project_id: '',
            categories: [],
            notify_users : [],
        },
        // categoryList : [],
        projectId: '',

        is_new : true,
    }

    componentWillMount() {
        console.info("this.props.is_new", this.props.is_new)
        if(!this.props.is_new) {
            this.msg_btn_save_text = "Update Message"
            this.msg_heading = 'Edit Message'
        }
    }

    componentDidMount() {
        // $(this.refs.message_body).trumbowyg();
    }

    componentDidUpdate() {
        $(this.refs.message_body).trumbowyg();
        $(this.refs.message_body).trumbowyg('html', this.props.data.message_body);
    }

    hidePopup = () => {
        if (this.props.popup_id) {
            jQuery('#' + this.props.popup_id).popup('hide');
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // var valid = jQuery(this.refs.form).valid();
        // if (!valid) {return false};

        let data = jQuery(this.refs.form).serialize();
        data = URI.parseQuery(data);
        data.message_body = $(this.refs.message_body).trumbowyg('html');

        data = jQuery.param(data)
        console.log(data)

        ProjectMessageHelper.save(data).then((response) => {
            this.props.fetchProjectMessages(this.props.project_id)
            this.props.onDataUpdate(response.data.project)
            this.hidePopup();
        })

        // if (data.id) {
        //     var ajaxObj = ProjectHelper.update(data);
        //     console.log("Update");
        // } else {
        //     var ajaxObj = ProjectHelper.store(data);
        // }

        // ajaxObj.then(function(response) {
        //     console.log(response);
            
        //     store.dispatch(fetchProjects()).then((response) => {
        //     });
        //     this.props.onDataUpdate(response.data.project)
        //     this.hidePopup();
        // }.bind(this));

        return false;

    }

    render() {
        return (
            <div>
                <div className="modal-header">
                    <h4 className="modal-title">{this.msg_heading}</h4>
                </div>

                <form className="form-horizontal11 form" ref='form' onSubmit={this.handleSubmit}>
                    <div className="content-area">
                        <input type="hidden" name="project_id" defaultValue={this.props.project_id} placeholder="project_id" />
                        <input type="hidden" name="id" defaultValue={this.props.data.id} placeholder="id" />
                        <div className="">
                            <input type="text" className="message_title w100 required" name="message_title" defaultValue={this.props.data.message_title} placeholder="Message Title" />
                        </div>
                        <div className="">
                            <textarea id="message_body" name="message_body" ref="message_body"></textarea>
                        </div>

                        <div className="mb30 w100" ref="attach_form">
                            <ProjectFileAttachForm selectedFiles={this.props.data.project_files} />
                        </div>

                        <div className="d-table w100">
                            <div className="d-inline-block mr20 xs-d-block xs-w100">
                                <label className="mr10">Notify by Email</label>
                                <ControlNotifyPeople selectedUsers={this.props.data.notify_users} />
                            </div>
                            <div className="d-inline-block mr20 xs-d-block xs-w100">
                                <label className="mr10">Category</label>
                                <span className="d-inline-block">
                                    <CategorySelectControl selectedValues={this.props.data.categories} object_type={OBJECT_TYPE_MESSAGE}  />
                                </span>
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


// export default ProjectMessageForm;


import { fetchProjectMessages} from '../../actions/action_project';

const mapStateToProps = (state) => {
    
    return {
        state : state,
        current_org: state.appdata.current_org,  // FETCH_APPDATA_CURRENTORG
        projectCurrent : state.project.current,  // FETCH_PROJECT_CURRENT 
        project_id : state.project.current.id
        
    };
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        dispatch,
        fetchProjectMessages: (project_id) => {
            dispatch(fetchProjectMessages(project_id)).then((response) => {
                // dispatch(fetchCategoriesTypeMessage(project_id))
            });
        }
    }
}

const ProjectMessageFormContainer = connectWithStore(ProjectMessageForm, mapStateToProps, mapDispatchToProps)

export default ProjectMessageFormContainer
