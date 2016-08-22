import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { ProjectMessageHelper } from '../../helpers'

import { fetchCategoriesTypeMessage } from '../../actions/action_category';
import { fetchProjects, fetchProjectUsers} from '../../actions/action_project';


import {store } from '../../store/index.js';

import CategorySelectControl from '../category/CategorySelectControl'

import ControlNotifyPeople from '../controls/ControlNotifyPeople'

class ProjectMessageForm extends Component {
    constructor(props) {
        super(props);
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
    }

    componentWillMount() {
        store.dispatch(fetchCategoriesTypeMessage(this.props.projectId))
        store.dispatch(fetchProjectUsers(this.props.projectId))
    }

    componentDidMount() {
        // $(this.refs.message_body).trumbowyg();
    }

    componentDidUpdate() {
        $(this.refs.message_body).trumbowyg();
        $(this.refs.message_body).trumbowyg('html', this.props.data.message_body);
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

        ProjectMessageHelper.save(data)

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
        // console.log('RENDEREDDD NEEEEE', this.props.data.message_title)
        const categoryList = store.getState().category.type_message_list
        const userList = store.getState().project.users;

        if (jQuery.isEmptyObject(userList) || jQuery.isEmptyObject(categoryList)) return false;

        return (
            <div>
                <h3>Create Message</h3>

                <form className="form-horizontal11" ref='form' onSubmit={this.handleSubmit}>
                    <input type="text" name="project_id" defaultValue={this.props.projectId} />
                    <input type="text" name="id" defaultValue={this.props.data.id} />
                    <div className="">
                        <input type="text" className="message_title w50 required" name="message_title" defaultValue={this.props.data.message_title} />
                    </div>
                    <div className="">
                        <textarea id="message_body" name="message_body" ref="message_body"></textarea>
                    </div>

                    <div className="d-table w100">
                        <div className="d-inline-block mr20 xs-d-block xs-w100">
                            <label>Notify by Email</label>
                            <ControlNotifyPeople userList={userList} selectedValues={this.props.data.notify_users}/>
                        </div>
                        <div className="d-inline-block mr20 xs-d-block xs-w100">
                            <label>Category</label>
                            <CategorySelectControl categoryList={categoryList} selectedValues={this.props.data.categories} />
                        </div>
                        <div className="d-inline-block mr20 xs-d-block xs-w100">
                            <label>Privacy</label>
                            
                        </div>
                        <div className="d-inline-block mr20 xs-d-block xs-w100">
                            <label>Attach Files</label>
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


export default ProjectMessageForm;
