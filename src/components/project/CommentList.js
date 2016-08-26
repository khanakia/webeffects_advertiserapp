import React, { Component } from 'react';
import ReactDom from 'react-dom';

import {connectWithStore} from '../../store/index.js';

import CategorySelectControl from '../category/CategorySelectControl'
import ControlNotifyPeople from '../controls/ControlNotifyPeople'
import ProjectFileAttachForm from '../project_file/ProjectFileAttachForm'

import {CommentHelper} from '../../helpers'
import PopupHelper from '../../helpers/helper_popup'

import { fetchComments } from '../../actions/action_project'

class CommentList extends Component {
    constructor(props) {
        super(props);

        this.seletectedItems = []

    }

    static defaultProps = {
        onDataUpdate: function(org) {},
        onFileItemsSelect : function() {},
        popup_id: '',
        settings : {},
        

        project_id : '',
        object_type : '',
        object_id : ''
    }

    componentWillMount() {
        this.fetchComments()
    }

    componentDidMount() {
        
    }

    fetchComments() {
        this.props.fetchComments(this.props.object_type, this.props.object_id)

    }
    editComment(e, item) {
        PopupHelper.showCommentForm({object_type:this.props.object_type, object_id:this.props.object_id, data: item})
    }

    deleteComment(e, item) {
    	$.confirm({
            title: '',
            content: 'Are you sure you want to remove ?',
            confirmButton: 'Yes',
            cancelButton: 'No',
            confirm: function(){
                CommentHelper.delete(item.id).then((response) => {
                    this.fetchComments()
                });
            }.bind(this)
        });
    }

    renderList(items) {
        return items.map((item) => {
            const {created_by_user} = item;
            return (
                <div className="list-group-item" key={item.id}>
                    <div className="d-table w100">
                        <div className="d-table-cell xs-d-block wp100 xs-w100">
                            <div className="userInfoBlock">
                                <div className="image d-inline-block valign-middle mr20">
                                    <div className="avatar" style={{backgroundImage: "url('"+created_by_user.image_base64+"')"}}>
                                    </div>
                                </div>
                                <div className="summary d-inline-block">
                                </div>
                            </div>
                        </div>
                        <div className="d-table-cell xs-d-block xs-w100 valign-middle">
                            <div className="title fw-b">{created_by_user.user_id} {created_by_user.fullname}</div>
                            <div dangerouslySetInnerHTML={{__html: item.body}} />
                        </div>
                        <div className="d-table-cell xs-d-block wp100 valign-middle text-right">
                            <span className="icons-group light">
                                <button className="btn btn-plain" title="Edit" onClick={(e)=> this.editComment(e, item)} ><i className="fa fa-edit"></i></button>
                                <button className="btn btn-plain" title="Edit" onClick={(e)=> this.deleteComment(e, item)} ><i className="fa fa-trash"></i></button>
                            </span>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        
        const data = this.props.projectComments;

        return (
            <div className="comp-commentlist">
                <h3>Comments</h3>
                <div className="list-group">
                    {this.renderList(data)}
                </div>
            </div>
        );
    }
}


// export default CommentList;


const mapStateToProps = (state) => {
    
    return {
        state : state,
        current_org: state.appdata.current_org,
        projectCurrent : state.project.current,  // FETCH_PROJECT_CURRENT 
        project_id : state.project.current.id,
        projectComments : state.project.comments
        
    };
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        dispatch,
        fetchComments: (object_type, object_id) => {
            dispatch(fetchComments(object_type, object_id)).then((response) => {
                // dispatch(fetchCategoriesTypeFile(project_id))
            });
        }
    }
}

const CommentListContainer = connectWithStore(CommentList, mapStateToProps, mapDispatchToProps)

export default CommentListContainer