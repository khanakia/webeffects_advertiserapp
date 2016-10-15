import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link, hashHistory } from 'react-router'

import { OBJECT_TYPE_MESSAGE } from '../config.js'

import { Auth, ProjectMessageHelper } from '../helpers'
import PopupHelper from '../helpers/helper_popup'

import CommentList from './project/CommentList'
import CommentForm from './project/CommentForm'


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

    editMessage(e, data) {
        e.preventDefault()
        PopupHelper.showProjectMessageForm({data, is_new: false, onDataUpdate:this.onDataUpdate.bind(this)})
    }
   
    onDataUpdate() {
        this.props.fetchProjectMessage(this.messageId)
    }

    render() {
        if (jQuery.isEmptyObject(this.props.projectMessagesCurrent)) return false;
        const data = this.props.projectMessagesCurrent;
        const {created_by_user} = data;

        return (
            <div>
                <div className="control-toolbar1 message">
                    <div className="left">
                        <span className="title">{data.message_title}</span><br/>
                        <span className="dated">Created on: {moment(data.created_at).format('llll')}</span>
                    </div>
                  
                    <div className="right">
                        <span className="pull-right">
                            <span className="col mr10">
                                
                            </span>
                            <span className="col icons-group">
                                <a href="#" className="" title="Edit" onClick={(e)=> this.editMessage(e, data)} ><i className="fa fa-pencil"></i></a>
                            </span>
                        </span>    
                    </div>
                </div>
               
                <div className="d-table w100 mt30">
                    <div className="d-table-cell xs-d-block wp150 xs-w100">
                        <div className="userInfoBlock">
                            <div className="image d-inline-block valign-middle text-center">
                                <div className="avatar d-inline-block" style={{backgroundImage: "url('"+created_by_user.profile_image_url+"')"}}>
                                </div>
                                <div>
                                    <span className="title">{created_by_user.user_id} {created_by_user.fullname}</span><br/>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div className="d-table-cell xs-d-block xs-w100 pr20 valign-top">
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
