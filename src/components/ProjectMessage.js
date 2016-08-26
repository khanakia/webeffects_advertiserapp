import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link, hashHistory } from 'react-router'

import { OBJECT_TYPE_MESSAGE } from '../config.js'

import { Auth, ProjectMessageHelper } from '../helpers'
import CommentList from './project/CommentList'
import CommentForm from './project/CommentForm'


// import Sidebar from './Sidebar'
// import PagePanel from './PagePanel'

// import CategoryTree1 from './category/CategoryTree1'
// import CategoryForm from './category/CategoryForm'
// import CategoryManage from './category/CategoryManage'

// import ProjectMessageForm from './project/ProjectMessageForm'


class ProjectMessage extends Component {
    constructor(props) {
        super(props);

        this.projectId = this.props.params.projectId
        this.messageId = this.props.params.messageId

    }

    componentWillMount() {
        this.props.fetchProjectMessage(this.messageId)
    }

    componentDidUpdate() {
       
    }
   
    render() {
        if (jQuery.isEmptyObject(this.props.projectMessagesCurrent)) return false;
        const data = this.props.projectMessagesCurrent;
        const {created_by_user} = data;

        return (
            <div>
                <div className="control-toolbar1">
                    <div className="left">
                        <span className="title">{data.message_title}</span>
                    </div>
                    <div className="middle">
                    </div>
                    <div className="right">
                        <span className="pull-right">
                            <span className="col mr10">
                                
                            </span>
                            <span className="col icons-group">
                                <button className="btn btn-success" onClick={()=> ProjectMessageForm.showInPoup({}, {},this.props)}><i className="fa fa-plus"></i></button>
                            </span>
                        </span>    
                    </div>
                </div>
               
                <div className="d-table w100 mt30">
                    <div className="d-table-cell xs-d-block w15 xs-w100">
                        <div className="userInfoBlock">
                            <div className="image d-inline-block valign-middle mr20">
                                <div className="avatar" style={{backgroundImage: "url('"+created_by_user.image_base64+"')"}}>
                                </div>
                            </div>
                            <div className="summary d-inline-block">
                                <div className="title fw-b">{created_by_user.user_id} {created_by_user.fullname}</div>
                            </div>
                        </div>
                    </div>

                    <div className="d-table-cell xs-d-block w85 xs-w100 pr20 valign-top">
                        <div className="">
                            <div dangerouslySetInnerHTML={{__html: data.message_body}} />
                        </div>

                        <div className="mt30">
                            <h4>Attachments</h4>
                        </div>

                    </div>
                </div>

                <div className="section_comments">
                    <CommentList object_type={OBJECT_TYPE_MESSAGE} object_id={data.id} />
                    <CommentForm object_type={OBJECT_TYPE_MESSAGE} object_id={data.id} />
                </div>

            </div>
        );
    }
}


export default ProjectMessage;
