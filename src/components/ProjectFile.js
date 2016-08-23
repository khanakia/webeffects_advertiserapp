import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link, hashHistory } from 'react-router'

import { OBJECT_TYPE_FILE } from '../config.js'
import { Auth } from '../helpers'
import CommentForm from './project/CommentForm'
import CommentList from './project/CommentList'


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

    
    renderVersionList(items) {
        return items.map((item) => {
            
            return (
                <li className="list-group-item" key={item.id}>

                   <div className="d-table w100">
                        <div className="d-table-cell xs-d-block w40 xs-w100 valign-middle">
                            <h4 className="list-group-item-heading">
                                Version {item.version_no} 
                                
                                
                            </h4>
                        </div>
                        
                        
                        <div className="d-table-cell xs-d-block valign-middle text-right">
                            <span className="icons-group light">
                                <button className="btn btn-plain" title="Edit" onClick={(e)=> this.deleteFile(e, item)} ><i className="fa fa-eye"></i></button>
                                <button className="btn btn-plain" title="Edit" onClick={(e)=> this.deleteFile(e, item)} ><i className="fa fa-download"></i></button>
                                <button className="btn btn-plain" title="Edit" onClick={(e)=> this.deleteFile(e, item)} ><i className="fa fa-trash"></i></button>
                            </span>
                        </div>
                    </div>
                </li>
            );
        });
    }
   
    render() {
        if (jQuery.isEmptyObject(this.props.projectFilesCurrent)) return false;
        const data = this.props.projectFilesCurrent;
        return (
            <div>
                
                <div className="control-toolbar1">
                    <div className="left">
                        <span className="title">File Detail</span>
                    </div>
                    <div className="middle">
                    </div>
                    <div className="right">
                        <span className="pull-right">
                            <span className="col mr10">
                                
                            </span>
                            <span className="col icons-group">
                                <button className="btn btn-success" onClick={()=> ProjectMessageForm.showInPoup({}, {},this.props)}><i className="fa fa-plus"></i> Upload New Version</button>
                                <button className="btn btn-success" onClick={()=> ProjectMessageForm.showInPoup({}, {},this.props)}><i className="fa fa-trash"></i></button>
                                <button className="btn btn-success" onClick={()=> ProjectMessageForm.showInPoup({}, {},this.props)}><i className="fa fa-edit"></i></button>
                            </span>
                        </span>    
                    </div>
                </div>
                <div className="mt20">
                    <div className="o-auto mb30">
                        {   data.project_file_version_latest ?
                            data.project_file_version_latest.file_displayname
                            : ''
                        }

                        <div className="controls pull-right">
                            <button className="btn btn-success mr10">Preview</button>
                            <button className="btn btn-success">Download</button>
                        </div>
                    </div>

                    <h4>File Versions</h4>
                    <ul className="otherversions_list pl0">
                        {this.renderVersionList(data.project_file_version)}
                    </ul>

                    <h3>Attached To</h3>

                    <CommentList object_type={OBJECT_TYPE_FILE} object_id={data.id} />
                    <CommentForm object_type={OBJECT_TYPE_FILE} object_id={data.id} />
                </div>
            </div>
        );
    }
}


export default ProjectFile;
