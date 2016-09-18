import React, { Component } from 'react';
import { Link } from 'react-router';

import TasklistItem from './project_todo/TasklistItem'
import TasklistHelper from '../helpers/helper_tasklist.js'

import PopupHelper from '../helpers/helper_popup'

import TagSelectorInput from './tag/TagSelectorInput'
class ProjectTasks extends Component {
    constructor(props) {
        super(props);
        this.projectId = this.props.params.projectId
    }

    componentWillMount() {
       this.props.fetchTasklists_Templates();
    }

    componentDidMount() {
        $(".tasklists-list").sortable({
            helper: "clone",
            items: "div.comp_tasklist_item",
            update: function(ev, ui) {
                var data = $(".tasklists-list").sortable( "serialize", { key: "tl[]" } );
                TasklistHelper.updateSortOrder(data);
            }
        });
    }

    createTasklist(e) {
        PopupHelper.showTasklistForm({data : {is_template: "1"}, onDataUpdate:this.onTasklistDataUpdate.bind(this)})
    }

    onTasklistDataUpdate() {
        this.props.fetchTasklists_Templates();
    }

    onDataUpdate() {
        this.props.fetchTasklists_Templates();
    }

    renderList(items) {
        return items.map((item) => {
            return (
                <TasklistItem data={item} key={item.id} onTasklistDataUpdate={this.onTasklistDataUpdate.bind(this)} onTaskDataUpdate={this.onDataUpdate.bind(this)} />
            );
        });
    }
   
    render() {
        const data = this.props.projectsTasklists;


        return (
            <div>
                <div className="control-toolbar1 mb20">
                    <div className="left">
                        <span className="title">Tasks</span>
                    </div>
                    <div className="middle">
                    </div>
                    <div className="right">
                        <span className="pull-right">
                            <span className="col mr10">
                                
                            </span>
                            <span className="col icons-group">
                                <button className="btn btn-green-bordered" onClick={(e)=> this.createTasklist(e)}><i className="fa fa-plus mr10"></i>Add Template</button>
                            </span>
                        </span>    
                    </div>
                </div>
                <div className="tasklists-list">
                    {this.renderList(data)}
                </div>
            </div>

        );
    }
}


export default ProjectTasks;
