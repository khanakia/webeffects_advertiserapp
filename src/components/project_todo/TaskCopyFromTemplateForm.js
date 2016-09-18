import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux'

// import {connectWithStore} from '../../store/index.js';

import {TasklistHelper} from '../../helpers'
// import { fetchProjectTasklists } from '../../actions/action_project'
import { fetchTasklists_Templates } from '../../actions/action_tasklist';


class TaskCopyFromTemplateForm extends Component {
    constructor(props) {
        super(props);

        this.msg_btn_save_text = 'Copy Tasks'
        this.msg_heading = 'Add Tasks from Template'
    }

    static defaultProps = {
        onDataUpdate: function(org) {},
        popup_id: '',
        settings : {},

        data : {
            id : '',
        },

        project_id : '',

        tasklist_id : ''
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.props.fetchTasklists_Templates()
        
    }
    componentDidUpdate() {

    }

    hidePopup = () => {
        if (this.props.popup_id) {
            jQuery('#' + this.props.popup_id).popup('hide');
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        var valid = jQuery(this.refs.form).valid();
        if (!valid) {return false};

        let data = jQuery(this.refs.form).serialize();

        TasklistHelper.copy_tasks_from_template(data).then(function(response) {
            this.props.onDataUpdate()
            this.hidePopup();
        }.bind(this));

        return false;

    }

    renderTasklistDDL(items) {
        return (
            <select className={ 'form-control ' + this.props.className} ref="tasklist_ddl" name='tpl_tasklist_id' >
            {items.map((item) => {
                return (
                    <option key={item.id} value={item.id} >{item.tasklist_title}</option>
                );
            })}
            </select>
        );
    }

    render() {

        const data = this.props.projectsTasklists;

        return (
            <div className="comp-commentform">
                <div className="modal-header">
                    <h4 className="modal-title">{this.msg_heading}</h4>
                </div>
                <form className="form" ref='form' onSubmit={this.handleSubmit}>
                    <input type="text" name="tasklist_id" defaultValue={this.props.tasklist_id} placeholder="tasklist_id" />
                    
                    <div className="content-area">
                        <div className="mb20">  
                            
                                {this.renderTasklistDDL(data)}
                            
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


// export default TaskCopyFromTemplateForm;


const mapStateToProps = (state) => {

    return {
        state : state,
        current_org: state.appdata.current_org,
        projectCurrent : state.project.current,  // FETCH_PROJECT_CURRENT
        project_id : state.project.current.id,
        projectsTasklists: state.tasklist.list_templates,

    };
}

const mapDispatchToProps = (dispatch) => {

    return {
        dispatch,
        fetchTasklists_Templates: () => {
            dispatch(fetchTasklists_Templates()).then((response) => {
            });
        }
    }
}

const TaskCopyFromTemplateFormContainer = connect(mapStateToProps, mapDispatchToProps)(TaskCopyFromTemplateForm)

export default TaskCopyFromTemplateFormContainer
