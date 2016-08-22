import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { hashHistory } from 'react-router'

import { Link } from 'react-router';

import Auth from '../helpers/auth.js'

import CategoryTree1 from './category/CategoryTree1'
import CategoryForm from './category/CategoryForm'
import CategoryManage from './category/CategoryManage'

import ProjectMessageForm from './project/ProjectMessageForm'
import CategorySelectControl from './category/CategorySelectControl'
import {store} from '../store/index.js';

class ProjectMessageCreate extends Component {
    constructor(props, context) {
        super(props, context);

        this.projectId = this.props.params.projectId
    }

    componentWillMount() {
        // this.props.fetchCategoriesTypeMessage(this.projectId)
        this.props.fetchProjectMessage(10)
    }

    componentDidUpdate() {
       
    }

    render() {
        if (jQuery.isEmptyObject(this.props.projectMessage)) return false;
        return (
            <div>
                <ProjectMessageForm projectId={this.projectId} data={this.props.projectMessage} /> 
             
            </div>
        );
    }
}


export default ProjectMessageCreate;
