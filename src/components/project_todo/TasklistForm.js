import React, { Component } from 'react';
import ReactDom from 'react-dom';

import {connectWithStore} from '../../store/index.js';

// import CategorySelectControl from '../category/CategorySelectControl'
// import ControlNotifyPeople from '../controls/ControlNotifyPeople'
// import ProjectFileAttachForm from '../project_file/ProjectFileAttachForm'

import {TasklistHelper} from '../../helpers'
import { fetchProjectTasklists } from '../../actions/action_project'

class TasklistForm extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        onDataUpdate: function(org) {},
        popup_id: '',
        settings : {},

        data : {
            id : '',
        },

        project_id : '',
        
    }

    componentWillMount() {

    }

    componentDidMount() {
        
    }

    // shouldComponentUpdate = (nextProps, nextState, nextContext) => {
    //     // console.log('nextProps == this.props', nextProps , this.props)
    //     // return !(nextProps == this.props) ||
    //     //   !(nextState == this.state) ||
    //     //   !(nextContext == this.context);
    //     return false;
    // }

    componentDidUpdate() {

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
        // data = URI.parseQuery(data);
        // data.body = $(this.refs.body).trumbowyg('html');

        // data = jQuery.param(data)
        // console.log(data)


        TasklistHelper.save(data).then(function(response) {
            // console.log(response);
            this.props.fetchProjectTasklists(this.props.project_id)
            this.props.onDataUpdate(response.data.project)
            this.hidePopup();
        }.bind(this));

        return false;

    }


    render() {

        // const data = this.props.projectFiles;
        console.log("this.props.data", this.props.data)

        return (
            <div className="comp-commentform">
                <div className="modal-header">
                    <h4 className="modal-title">Tasklist Detail</h4>
                </div>
                <form className="form" ref='form' onSubmit={this.handleSubmit}>
                    <input type="hidden" name="project_id" defaultValue={this.props.project_id} placeholder={'project_id'} />
                    <input type="hidden" name="id" defaultValue={this.props.data.id} placeholder="id" />
                    <div className="content-area">
                        <div className="mb20">  
                            <input type="text" className="w100" name="tasklist_title" defaultValue={this.props.data.tasklist_title} placeholder="Title" />
                        </div>
                        <ul className="nav nav-tabs" role="tablist">
                            <li role="presentation" className="active"><a href="#description" aria-controls="description" role="tab" data-toggle="tab">Description</a></li>
                        </ul>
                        <div className="tab-content">
                            <div role="tabpanel" className="tab-pane active" id="description">
                               <textarea className="hp100" name="tasklist_note" defaultValue={this.props.data.tasklist_note}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer text-right">
                        <button type="submit" className="btn btn-success" ref="btn_save" >Save</button>
                    </div>
                </form>
            </div>
        );
    }
}


// export default TasklistForm;


const mapStateToProps = (state) => {

    return {
        state : state,
        current_org: state.appdata.current_org,
        projectCurrent : state.project.current,  // FETCH_PROJECT_CURRENT
        project_id : state.project.current.id,

    };
}

const mapDispatchToProps = (dispatch) => {

    return {
        dispatch,
        fetchProjectTasklists: (project_id) => {
            dispatch(fetchProjectTasklists(project_id)).then((response) => {
            });
        }
    }
}

const TasklistFormContainer = connectWithStore(TasklistForm, mapStateToProps, mapDispatchToProps)

export default TasklistFormContainer
