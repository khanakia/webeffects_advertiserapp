import React, { Component } from 'react';
import ReactDom from 'react-dom';

import CompanyHelper from '../helpers/helper_company.js'
import InputDate from '../components/controls/InputDate'

class TaskForm extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props.data);
        // this.data = this.props.data;

        var defaults = {
            task_title : '',
            task_description : '',
            start_date : '',
            end_date : '',
            priority_id : '',
            progress : '',
            estimate_time : '',
            status_id : '',
            is_private : '',
            parent_id : '',
        }

        this.data = $.extend({}, defaults, this.props.data);
    }

    componentWillMount() {
        // this.props.fetchCompanies();
    }

    componentDidMount() {
        // jQuery(".select-assign").select2({
        //     width: ""
        // });

        jQuery(".select-assign").selectpicker({
            // size: 4
            liveSearch : true
        });

        jQuery(".select-priority").selectpicker({
            size: 4
        });

            $( "#slider" ).slider({
                // min: 1,
                // max: 6,
                range: "min",
                value: jQuery(".slider_value").val(),
                slide: function( event, ui ) {
                    
                    jQuery(".slider_value").val(ui.value);
                }
            });


    }

    static showInPoup(data={},props={}) {
        // this.parentProps = props
        
        Controls.showpopup({
            detach : true,
            message : '<div id="abc"></div>',
            opacity: 0.5,
            onopen : function(e){
              var pid = (jQuery(e).attr('id'));
              ReactDom.render(<TaskForm popup_id={pid} {...props} />, document.getElementById('abc'));
              console.log(pid);
              // setTimeout(() => jQuery('#'+pid).popup('hide'), 3000); 
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

        // var valid = jQuery("#orgForm").valid();
        // if (!valid) {return false};

        CompanyHelper.store(data).then(function(response){
            console.log(response);
            this.props.fetchCompanies();
            this.hidePopup();
            
        }.bind(this));

        return false;
      
    }


    render() {
        return (
            <div>
                <form className="form-horizontal" ref='form' onSubmit={this.handleSubmit}>
                    <ul className="nav nav-tabs" role="tablist">
                        <li role="presentation" className="active"><a href="#general" aria-controls="general" role="tab" data-toggle="tab"><i className="fa fa-user" aria-hidden="true"></i></a></li>
                        <li role="presentation"><a href="#privacy" aria-controls="privacy" role="tab" data-toggle="tab"><i className="fa fa-lock" aria-hidden="true"></i></a></li>
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
                                        <label className="col-sm-2 control-label">Title</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name="task_title" id="task_title" defaultValue={this.data.task_title} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Assign</label>
                                        <div className="col-sm-10">
                                            
                                            <select className="select-assign" multiple data-actions-box="true">
                                                <optgroup label="Picnic">
                                                    <option>Mustard</option>
                                                    <option>Ketchup</option>
                                                    <option>Relish</option>
                                                </optgroup>
                                                <optgroup label="Camping">
                                                    <option>Tent</option>
                                                    <option>Flashlight</option>
                                                    <option>Toilet Paper</option>
                                                </optgroup>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Start Date</label>
                                        <div className="col-sm-10">
                                            <InputDate name="start_date" defaultValue='11/11/2016' />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Due Date</label>
                                        <div className="col-sm-10">
                                            <InputDate name="end_date" defaultValue='11/11/2016' />
                                            {/*<input type="text" className="form-control" name="end_date" id="end_date" defaultValue={this.data.end_date} />*/}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Priority</label>
                                        <div className="col-sm-10">
                                            <select className="select-priority">
                                                <option data-content='<span style="color: #000;"><i class="fa fa-exclamation-circle mr5"></i>None</span>' value="0">None</option>
                                                <option data-content='<span style="color: #10bd10;"><i class="fa fa-exclamation-circle mr5"></i>Low</span>' value="1">Low</option>
                                                <option data-content='<span style="color: #caa312;"><i class="fa fa-exclamation-circle mr5"></i>Medium</span>' value="2">Medium</option>
                                                <option data-content='<span style="color: #dc1414;"><i class="fa fa-exclamation-circle mr5"></i>High</span>' value="3">High</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                        </div>
                        <div role="tabpanel" className="tab-pane" id="privacy">
                            <div className="row">
                                <div className="col-md-8">
                                    privacy
                                </div>
                            </div>
                        </div>
                        <div role="tabpanel" className="tab-pane" id="description">
                            <div className="row">
                                <div className="col-md-8">
                                    <textarea name="task_description"></textarea>
                                </div>
                            </div>
                        </div>

                        <div role="tabpanel" className="tab-pane" id="priority">
                            <div className="row">
                                <div className="col-md-8">
                                    

                                </div>
                            </div>
                        </div>

                        <div role="tabpanel" className="tab-pane" id="progress_time">
                            <div className="row">
                                <div className="col-md-8">
                                    <div id="slider"></div>
                                    <input type="text" className="slider_value" defaultValue="50" />

                                    <input type="text" name="estimate_time_hour" defaultValue="0" />
                                    <input type="text" name="estimate_time_minutes" defaultValue="0" />

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

                    <div className="text-right">
                        <button type="submit" className="btn btn-success">Save</button>
                    </div>
                </form>

            </div>
        );
    }
}


export default TaskForm;
