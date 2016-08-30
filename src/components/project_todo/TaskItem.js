import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';


import TaskTitle from './TaskTitle'
import {TaskHelper } from '../../helpers'


class TaskItem extends Component {
    constructor(props) {
        super(props);

      
    }

    componentWillMount() {
      
    }

    componentDidMount() {
        $('.takslist_tasks').sortable({
            connectWith:'.takslist_tasks',
            tolerance:'intersect',
            handle: ".fa-arrows",
            // placeholder: "ph"
            placeholder: "ui-state-highlight",

            // revert: true,
            // start: function(e, ui ){
            //      ui.placeholder.height(ui.helper.outerHeight());
            // },
            stop: function(ev, ui) {
                
                var parent = ui.item.parent(".takslist_tasks");
                var taskId = ui.item.data('id');
                
                const parent_tasklist = ui.item.parents(".comp_tasklist_item");
                const tasklist_id = parent_tasklist.data('id')
                if(tasklist_id) {
                    TaskHelper.updateTasklistId(taskId, tasklist_id)
                }

                // var sortOrder = parent.sortable( "toArray" );
                var sortOrderData = parent.sortable( "serialize", { key: "t[]" } );
                TaskHelper.updateSortOrder(sortOrderData);

                // Update Task Parent
                // var currentParenttaskId = ui.item.data('parentid');
                var parentTaskId = parent.data('id');
                // console.log(taskId, currentParenttaskId, parentTaskId)
                // if(currentParenttaskId!==parentTaskId) {
                if(undefined!==parentTaskId) {
                    // console.log("HASPARENT")
                    TaskHelper.updateParent(taskId, parentTaskId);
                }
                
            }
        });

        // $('.tasks-list').disableSelection();

       
    }


    renderItems(items) {
        if(!items) return false;
        return items.map((item) => {
            return (
                <TaskItem key={item.id} data={item} />
            );
        });
    }


    render() {
        const data = this.props.data;
        
        return (
            <div className="comp_task_item" id={'tl_'+data.id} data-id={data.id}>
                <TaskTitle data={data} />
                <div className="takslist_tasks comp_task_item_children" data-id={data.id}>
                    {this.renderItems(data.childrens)}
                </div>
            </div>
        );
    }
}


export default TaskItem;
