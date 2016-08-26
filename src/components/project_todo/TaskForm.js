import React, { Component } from 'react';
import ReactDom from 'react-dom';

import {connectWithStore} from '../../store/index.js';

import {TaskHelper} from '../../helpers'
import { fetchTasklists } from '../../actions/action_project'

import InputDate from '../../components/controls/InputDate'
import ControlAssignPeople from '../../components/controls/ControlAssignPeople'

import ProjectFileAttachForm from '../project_file/ProjectFileAttachForm'


class TaskForm extends Component {
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
        tasklist_id : ''
        
    }

    componentWillMount() {

    }

    componentDidMount() {
        jQuery(this.refs.priority_id).selectpicker({
            size: 4
        });

        var $progress_input = jQuery(this.refs.progress);
        $( this.refs.slider ).slider({
            // min: 1,
            // max: 6,
            range: "min",
            value: $progress_input.val(),
            slide: function( event, ui ) {
                
                $progress_input.val(ui.value);
            }
        });


    }

    hidePopup = () => {
        if(this.props.popup_id) {
            jQuery('#'+this.props.popup_id).popup('hide');
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();

        let data = jQuery(this.refs.form).serialize();
        console.log(data);

        // var valid = jQuery(this.refs.form).valid();
        // if (!valid) {return false};

        TaskHelper.save(data).then(function(response){
            this.props.fetchTasklists(this.props.project_id)
            this.props.onDataUpdate(response.data.project)
            // this.hidePopup();
        }.bind(this));

        return false;
      
    }


    render() {
        return (
            <div>
                <div className="modal-header">
                    <h4 className="modal-title">Task Detail</h4>
                </div>

                <form className="form-horizontal control-label-left" ref='form' onSubmit={this.handleSubmit}>
                    <input type="text" name="tasklist_id" defaultValue={this.props.tasklist_id} />
                    <div className="content-area">
                        <div className="mb20">

                            <input type="text" className="form-control" name="task_title" id="task_title" defaultValue={this.props.data.task_title} placeholder="Title" />
                        </div>
                        <ul className="nav nav-tabs" role="tablist">
                            <li role="presentation" className="active"><a href="#general" aria-controls="general" role="tab" data-toggle="tab"><i className="fa fa-user" aria-hidden="true"></i></a></li>
                            <li role="presentation"><a href="#description" aria-controls="description" role="tab" data-toggle="tab"><i className="fa fa-align-left" aria-hidden="true"></i></a></li>
                            <li role="presentation"><a href="#file" aria-controls="file" role="tab" data-toggle="tab"><i className="fa fa-file" aria-hidden="true"></i></a></li>
                            
                            <li role="presentation"><a href="#progress_time" aria-controls="progress_time" role="tab" data-toggle="tab"><i className="fa fa-clock-o" aria-hidden="true"></i></a></li>
                            <li role="presentation"><a href="#tag" aria-controls="tag" role="tab" data-toggle="tab"><i className="fa fa-tag" aria-hidden="true"></i></a></li>
                        </ul>

                        <div className="tab-content mt30">
                            <div role="tabpanel" className="tab-pane active" id="general">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Assign</label>
                                            <div className="col-sm-7">
                                                <ControlAssignPeople />

                                                <div className="fs12 mt10">
                                                    <label htmlFor="notify_by_email">
                                                        <input type="checkbox" className="valign-middle" style={{marginTop : 0}} name="notify_by_email" value="1" />
                                                        <span className="ml5">Notify by Email?</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Start Date</label>
                                            <div className="col-sm-7">
                                                <InputDate name="start_date" defaultValue='' />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Due Date</label>
                                            <div className="col-sm-7">
                                                <InputDate name="end_date" defaultValue='' />
                                                {/*<input type="text" className="form-control" name="end_date" id="end_date" defaultValue={this.data.end_date} />*/}
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-sm-3 control-label">Priority</label>
                                            <div className="col-sm-7">
                                                <select className="select-priority" name="priority_id" ref="priority_id">
                                                    <option data-content='<span style="color: #000;"><i class="fa fa-exclamation-circle mr5"></i>None</span>' value="1">None</option>
                                                    <option data-content='<span style="color: #10bd10;"><i class="fa fa-exclamation-circle mr5"></i>Low</span>' value="2">Low</option>
                                                    <option data-content='<span style="color: #caa312;"><i class="fa fa-exclamation-circle mr5"></i>Medium</span>' value="3">Medium</option>
                                                    <option data-content='<span style="color: #dc1414;"><i class="fa fa-exclamation-circle mr5"></i>High</span>' value="4">High</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                            </div>
                     
                            <div role="tabpanel" className="tab-pane" id="description">
                                <textarea name="task_note"></textarea>
                            </div>

                            <div role="tabpanel" className="tab-pane" id="file">
                                <ProjectFileAttachForm />
                            </div>


                            <div role="tabpanel" className="tab-pane" id="progress_time">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div>
                                            <label>Progress</label>
                                            <div id="slider" ref="slider"></div>
                                            <input type="hidden" className="progress" name="progress" ref="progress" defaultValue="50" />
                                        </div>

                                        <div className="mt20">
                                            <label>Estimated time to complete</label>

                                            <div>
                                                <label className="mr10">Hours</label>
                                                <input type="number" className="mr10 wp50 number" name="estimate_time_hour" defaultValue="0" />
                                                <label className="mr10">Minutes</label>
                                                <input type="number" className="wp50 number" name="estimate_time_minute" defaultValue="0" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div role="tabpanel" className="tab-pane" id="tag">
                                <div className="row">
                                    <div className="col-md-8">
                                        
                                    </div>
                                </div>
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


// export default TaskForm;



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
        fetchTasklists: (project_id) => {
            dispatch(fetchTasklists(project_id)).then((response) => {
            });
        }
    }
}

const TaskFormContainer = connectWithStore(TaskForm, mapStateToProps, mapDispatchToProps)

export default TaskFormContainer
