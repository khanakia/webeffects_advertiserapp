import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link, hashHistory } from 'react-router'

import { OBJECT_TYPE_FILE } from '../config.js'
import { Auth } from '../helpers'
import CommentForm from './project/CommentForm'
import CommentList from './project/CommentList'

import ProjectFileItem from './project_file/ProjectFileItem'

class ProjectFile extends Component {
    constructor(props) {
        super(props);

        this.fileId = this.props.params.fileId
        this.projectId = this.props.params.projectId
    }

    componentWillMount() {
        this.props.fetchProjectFile(this.fileId)
    }

    componentDidUpdate() {
        console.log('ProjectFile componentDidUpdate')

    }


   
    render() {
        if (jQuery.isEmptyObject(this.props.projectFilesCurrent)) return false;
        const data = this.props.projectFilesCurrent;
        return (
            <div>
                
                <div className="control-toolbar1">
                    <div className="left">
                        <span className="title">File Details</span>
                    </div>
                    <div className="middle">
                    </div>
                    <div className="right">
                    </div>
                </div>
                <div className="mt20">
                    <ProjectFileItem file={data}  />
             

                    <h3>Attached To</h3>

                    <CommentList object_type={OBJECT_TYPE_FILE} object_id={data.id} />
                    <CommentForm object_type={OBJECT_TYPE_FILE} object_id={data.id} />
                </div>
            </div>
        );
    }
}


export default ProjectFile;
