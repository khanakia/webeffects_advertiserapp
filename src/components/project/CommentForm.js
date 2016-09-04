import React, { Component } from 'react';
import ReactDom from 'react-dom';

import {connectWithStore} from '../../store/index.js';

// import CategorySelectControl from '../category/CategorySelectControl'
import ControlNotifyPeople from '../controls/ControlNotifyPeople'
import ProjectFileAttachForm from '../project_file/ProjectFileAttachForm'

import {CommentHelper} from '../../helpers'
import { fetchComments } from '../../actions/action_project'

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.seletectedItems = []

    }

    static defaultProps = {
        onDataUpdate: function(org) {},
        onFileItemsSelect : function() {},
        popup_id: '',
        settings : {},
        
        data : {
            id : '',
            body : '',
        },

        project_id : '',
        object_type : '',
        object_id : ''
    }

    componentWillMount() {
        
    }

    componentDidMount() {
       
    }

    componentDidUpdate() {
        this.editorInit();
    }

    shouldComponentUpdate = (nextProps, nextState, nextContext) => {
        // console.log('nextProps == this.props', nextProps , this.props)
        // return !(nextProps == this.props) ||
        //   !(nextState == this.state) ||
        //   !(nextContext == this.context);
        // return false;
        return !(nextProps == this.props)
    }

    editorInit() {
        $(this.refs.body).trumbowyg({
            autogrow: true
        });
        $(this.refs.body).trumbowyg('html', this.props.data.body);
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
        // data.body = $(this.refs.body).trumbowyg('html');

        data = jQuery.param(data)
        // console.log(data)

    
        CommentHelper.save(data).then(function(response) {
            // console.log(response);
            this.props.fetchComments(this.props.object_type, this.props.object_id)
            this.props.onDataUpdate(response.data.project)
            this.hidePopup();
        }.bind(this));

        return false;

    }

    // attachFile() {
    //     jQuery(this.refs.attach_form).show('fast')
    // }
  
    render() {
        if (!this.props.object_id) return false;
        const current_user = this.props.current_user

        return (
            <div className="comp-commentform">
                {
                    this.props.popup_id ?
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Comment</h4>
                    </div>
                    : ''
                }

                <form className="form-horizontal11" ref='form' onSubmit={this.handleSubmit}>
                    <div className="content-area">
                        <input type="hidden" name="id" defaultValue={this.props.data.id} placeholder={'id'} />
                        <input type="hidden" name="project_id" defaultValue={this.props.project_id} placeholder={'project_id'} />
                        <input type="hidden" name="object_type" defaultValue={this.props.object_type} placeholder={'object_type'} />
                        <input type="hidden" name="object_id" defaultValue={this.props.object_id} placeholder={'object_id'} />
                        
                        <div className="d-table w100">
                            <div className="d-table-cell xs-d-block wp100 xs-w100">
                                <div className="userInfoBlock mt20">
                                    <div className="image d-inline-block valign-middle mr20">
                                        <div className="avatar" style={{backgroundImage: "url('"+current_user.profile_image_url+"')"}}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-table-cell xs-d-block xs-w100 valign-middle">
                                
                                <div className="">
                                    {<textarea id="body" name="body" ref="body" className="textreaa-editor"></textarea>}
                                </div>
                                <div className="mb30 w100" ref="attach_form">
                                    <ProjectFileAttachForm selectedFiles={this.props.data.project_files} />
                                </div>

                                <div className="d-table mt30 w100">
                                    <div className="d-inline-block mr20 xs-d-block xs-w100">
                                        <label className="mr10">Notify by Email</label>
                                        <ControlNotifyPeople selectedUsers={this.props.data.notify_users} />
                                    </div>
                                    
                                </div>
                            
                            </div>
                        </div>
                    </div>
                    <div className="p20 text-right">
                        <button type="submit" className="btn btn-blue">Post Comment</button>
                    </div>
                </form>
            </div>
        );
    }
}


// export default CommentForm;

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    
    return {
        state : state,
        current_org: state.appdata.current_org,
        current_user: state.appdata.current_user,
        projectCurrent : state.project.current,  // FETCH_PROJECT_CURRENT 
        project_id : state.project.current.id,
        
    };
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        dispatch,
        fetchComments: (project_id, object_type, object_id) => {
            dispatch(fetchComments(project_id, object_type, object_id))
        }
        // fetchProjectFiles: (project_id, extraParams={}) => {

        //     dispatch(fetchProjectFilesBrowserFormList(project_id, extraParams)).then((response) => {
        //         // dispatch(fetchCategoriesTypeFile(project_id))
        //     });
        // }
    }
}

const CommentFormContainer = connect(mapStateToProps, mapDispatchToProps)(CommentForm)

export default CommentFormContainer
