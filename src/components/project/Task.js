import React, { Component } from 'react';
import ReactDom from 'react-dom';

import TaskHelper from '../../helpers/helper_task.js'


class Task extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $('.tasks-list').sortable({
            connectWith:'.tasks-list',
            tolerance:'intersect',
            handle: ".fa-arrows",
            // placeholder: "ph"
            // revert: true,
            stop: function(ev, ui) {
                console.log(ui);
                var parent = ui.item.parent(".tasks-list");
                // var sortOrder = parent.sortable( "toArray" );
                var sortOrderData = parent.sortable( "serialize", { key: "t[]" } );
                TaskHelper.updateSortOrder(sortOrderData);

                // Update Task Parent
                var taskId = ui.item.data('id');
                var currentParenttaskId = ui.item.data('parentid');
                var parentTaskId = parent.data('id');
                if(currentParenttaskId!==parentTaskId) {
                    // console.log(currentParenttaskId);
                    // console.log(parentTaskId);
                    TaskHelper.updateParent(taskId, parentTaskId);
                }
                
            }
        });

        $('.tasks-list').disableSelection();
    }

    addSubTask = (e) => {
        e.preventDefault();
        console.log(this);
        jQuery('#t_'+this.props.data.id).children('.tasks-list').toggleClass('active');

    }

    renderTasks(tasks) {
        // console.log(tasks);
        if(undefined==tasks) return true;
        return tasks.map((task) => {
            return (
                <Task key={task.id} data={task} />
            );
        });
    }


    render() {
        
        return (
            <div className="hasItems task-wrapper sortable" id={'t_'+this.props.data.id} data-id={this.props.data.id} data-parentid={this.props.data.parent_id}>
                <div className="singletask">
                    <div className="inner">
                        <div className="controls left">
                            <a href="#"><i className="fa fa-arrows"></i></a>
                            <a href="#"><i className="fa fa-pencil"></i></a>
                            <a href="#"><input type="checkbox" /></a>
                        </div>
                        <div className="title">
                            {this.props.data.task_title}

                            <span className="persons-assigned">
                                <a href="#">Aman</a>
                                <a href="#">Ryan</a>
                            </span>
                            <span className="tags">
                                <span className="label label-primary">Primary <a title="Remove Tag" href="#" className="remove">x</a></span>
                                <span className="label label-primary">Primary <a title="Remove Tag" href="#" className="remove">x</a></span>
                            </span>
                        </div>

                        <div className="controls right">
                            <a href="#" title="Add Subtasks" onClick={(e) => this.addSubTask(e)}><i className="fa fa-indent"></i></a>
                            <a href="#"><i className="fa fa-exclamation-circle"></i></a>
                            <a href="#"><i className="fa fa-tags"></i></a>
                        </div>
                    </div>
                </div>

                <div className="tasks-list" data-id={this.props.data.id}>
                    {this.renderTasks(this.props.data.children)}
                </div>
            </div>
        
        );
    }
}


export default Task;
