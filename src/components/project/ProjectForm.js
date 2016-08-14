import React, { Component } from 'react';
import ReactDom from 'react-dom';

import ProjectHelper from '../../helpers/helper_project.js'

import { fetchProjects } from '../../actions/action_project';
import {store} from '../../store/index.js';

import InputDate from '../controls/InputDate'

class ProjectForm extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        onDataUpdate: function(org) { },
        
        popup_id: '',
        settings : {},
        data : {
            id: '',
            project_title: '',
            project_description: '',
            project_status_id: '',
            start_date: '',
            end_date: '',
        }    
    }

    componentWillMount() {

    }

    componentDidMount() {
        
    }


    static showInPoup({settings={}, data={}, onDataUpdate=this.defaultProps.onDataUpdate()}) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach : true,
            message : '<div id="' + uniq + '"></div>',
            opacity: 0.5,
            blur: false,
            onopen : function(e){
              var pid = (jQuery(e).attr('id'));
              ReactDom.render(<ProjectForm popup_id={pid} settings={settings} data={data} onDataUpdate={onDataUpdate} />, document.getElementById(uniq));
            }
        });
    }


    hidePopup = () => {
        if (this.props.popup_id) {
            jQuery('#' + this.props.popup_id).popup('hide');
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();

        let data = jQuery(this.refs.form).serialize();
        data = URI.parseQuery(data);

        var valid = jQuery(this.refs.form).valid();
        if (!valid) {return false};


        if (data.id) {
            var ajaxObj = ProjectHelper.update(data);
            console.log("Update");
        } else {
            var ajaxObj = ProjectHelper.store(data);
        }

        ajaxObj.then(function(response) {
            console.log(response);
            
            store.dispatch(fetchProjects()).then((response) => {
            });
            this.props.onDataUpdate(response.data.project)
            this.hidePopup();
        }.bind(this));

        return false;

    }

    render() {
        return (
            <div>
                <form className="form" ref='form' onSubmit={this.handleSubmit}>
                    <input type="hidden" className="form-control" ref="id" name="id" id="id" defaultValue={this.props.data.id} />
                    <div className="row">
                        <div className="col-md-8">
                            <h4>Organization</h4>
                            <div className="form-group">
                                <label className="col-sm-12 control-label">Name of the Project</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control required" name="project_title" id="project_title" defaultValue={this.props.data.project_title} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-12 control-label">Start Date</label>
                                <div className="col-sm-10">
                                    
                                    <InputDate name="start_date" defaultValue={this.props.data.start_date} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-12 control-label">End Date</label>
                                <div className="col-sm-10">
                                    <InputDate name="end_date" defaultValue={this.props.data.end_date} />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label className="col-sm-12 control-label">Description</label>
                                <div className="col-sm-10">
                                    <textarea name="project_description"></textarea>
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


export default ProjectForm;
