import React, { Component } from 'react';
import ReactDom from 'react-dom';

import {connectWithStore} from '../../store/index.js';

import CategorySelectControl from '../category/CategorySelectControl'
import ControlNotifyPeople from '../controls/ControlNotifyPeople'
import ProjectFileAttachForm from '../project_file/ProjectFileAttachForm'


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
        

        project_id : '',
        object_type : '',
        object_id : ''
    }

    componentWillMount() {
        
    }

    componentDidMount() {
        
    }



    handleSubmit = (e) => {
        e.preventDefault();

        // var valid = jQuery(this.refs.form).valid();
        // if (!valid) {return false};

        let data = jQuery(this.refs.form).serialize();
        data = URI.parseQuery(data);
        // data.message_body = $(this.refs.message_body).trumbowyg('html');

        // data = jQuery.param(data)
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

    attachFile() {
        jQuery(this.refs.attach_form).show('fast')
    }
  
    render() {
        
        const data = this.props.projectFiles;

        return (
            <div className="comp-commentform">
                <form className="form-horizontal11" ref='form' onSubmit={this.handleSubmit}>
                    <input type="text" name="object_type" defaultValue={this.props.object_type} />
                    <input type="text" name="object_id" defaultValue={this.props.object_id} />
                    
                    
                    <div className="">
                        {/*<textarea id="message_body" name="message_body" ref="message_body"></textarea>*/}
                    </div>

                    <div className="d-table mt30 w100">
                        <div className="d-inline-block mr20 xs-d-block xs-w100">
                            <label>Notify by Email</label>
                            <ControlNotifyPeople />
                        </div>
                        <div className="d-inline-block mr20 xs-d-block xs-w100">
                            <label>Category</label>
                            <CategorySelectControl object_type={this.props.object_type}  />
                        </div>
                        <div className="d-inline-block mr20 xs-d-block xs-w100">
                            <label>Files</label><br/>
                            <button type="button" className="btn" onClick={this.attachFile.bind(this)}>Attach a File</button>
                        </div>
                    </div>
                    <div className="mt30 mb30 w100" ref="attach_form">
                        <ProjectFileAttachForm />
                    </div>
                    <div className="text-right">
                        <button type="submit" className="btn btn-success">Save</button>
                    </div>
                </form>
            </div>
        );
    }
}


// export default CommentForm;


const mapStateToProps = (state) => {
    
    return {
        state : state,
        current_org: state.appdata.current_org,
        
    };
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        dispatch,
        // fetchProjectFiles: (project_id, extraParams={}) => {

        //     dispatch(fetchProjectFilesBrowserFormList(project_id, extraParams)).then((response) => {
        //         // dispatch(fetchCategoriesTypeFile(project_id))
        //     });
        // }
    }
}

const CommentFormContainer = connectWithStore(CommentForm, mapStateToProps, mapDispatchToProps)

export default CommentFormContainer
