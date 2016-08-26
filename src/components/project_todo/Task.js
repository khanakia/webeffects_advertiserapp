import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';


import {store} from '../../store/index.js';
import { fetchTasklist, fetchTasklist_Tasks } from '../../actions/action_tasklist';

import TaskHelper from '../../helpers/helper_task.js'
import * as Helper from '../../helpers'

import TagSelector from '../tag/TagSelectorContainer';
import TagColorInput from '../tag/TagColorInput';

import TaskTitle from './TaskTitle';


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
            placeholder: "ui-state-highlight",

            // revert: true,
            // start: function(e, ui ){
            //      ui.placeholder.height(ui.helper.outerHeight());
            // },
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

        
        $('.a-addtags').qtip({ // Grab some elements to apply the tooltip to
            content: {
                text: function(event, api) {
                    // var tooltip = api.elements.tooltip
                    // var id = api.elements.target.data('id');
                    // console.log(tooltip);
                    // api.elements.content.html('Loading...');
                    // Task.renderTagSelector(tooltip.attr('id'))
                    return '';
                }
            },
            position: {
                my: 'top right',
                at: 'top right',
                // container: $('div#main_layout')
            },

            show: {
                 solo: true
            },
            hide: 'unfocus',
            style: 'qtip-light',
            overwrite: true,
            events: {
                show: function(event, api) {
                    console.log("shows");
                    var tooltip = api.elements.tooltip
                    var task_id = api.elements.target.data('id');

                    this.renderTagSelector(tooltip.attr('id'), task_id)
                }.bind(this),
                hide: function(event, api) {
                    // api.destroy(true);
                }
            }
        })
    }


    onTagSelect = (tag,props) => {
        // console.log(this.props)
        // console.log(props.tags_reducer.selectedTags.tags);
        var data = {
            tag_id : tag.id,
            object_id : props.object_id,
            object_type : 'task',
        }
        console.log(data)
        Helper.TagItem.store(data).then((response) => {
            console.log('tag added');
            store.dispatch(fetchTasklist())
        })
    }

    renderTagSelector(id,object_id) {
        // document.getElementById(id).innerHTML = '';
        ReactDom.render(
                <Provider store={store} key="provider">
                    <TagSelector onTagSelect={this.onTagSelect} object_id={object_id}/>
                </Provider>,
                document.getElementById(id));
    }

    addSubTask = (e) => {
        e.preventDefault();
        console.log(this);
        jQuery('#t_'+this.props.data.id).children('.tasks-list').toggleClass('active');

    }

    addTag = (e) => {
        e.preventDefault();
        console.log(this.props.data);
        
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
                <TaskTitle data={this.props.data} />
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
                            <a href="#" onClick={(e) => this.addTag(e)} data-id={this.props.data.id} className="a-addtags"><i className="fa fa-tags "></i></a>
                        </div>
                        <div id={"selector_"+this.props.data.id}></div>
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
