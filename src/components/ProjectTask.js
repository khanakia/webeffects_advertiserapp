import React, { Component } from 'react';
import { Link } from 'react-router';

import {Auth} from '../helpers'

import { OBJECT_TYPE_TASK } from '../config.js'

import TaskItem from './project_todo/TaskItem'
import TaskForm from './project_todo/TaskForm'
import CommentList from './project/CommentList'
import CommentForm from './project/CommentForm'

class ProjectTask extends Component {
    constructor(props, context) {
        super(props, context);
        // this.taskId = this.props.params.taskId
    }

    componentWillMount() {
       this.props.fetchProjectTask(this.props.params.taskId);
       // console.info("Mounted")
    }

    componentDidMount() {
       // console.log("TaskForm",TaskForm.abc())
    }

    // shouldComponentUpdate = (nextProps, nextState, nextContext) => {
    //     console.info(nextProps,this.props)
    // }

    componentWillUpdate = (nextProps, nextState) => {        
        // console.info(nextProps.params.taskId == this.props.params.taskId)
        if(nextProps.params.taskId !== this.props.params.taskId) {
            this.props.fetchProjectTask(nextProps.params.taskId);
            // console.info('Execute AJAX')
            // this.forceUpdate()
        }
    }

    componentDidUpdate() {

    }

 


    render() {
        const data = this.props.projectTask;
        const taskId = this.props.params.taskId;
        console.info(this.props.params.taskId)
        if (jQuery.isEmptyObject(data)) return false;

        return (
            <div>
               <div className="control-toolbar1 mb20">
                    <div className="left">
                        <span className="title">Task Details</span>
                    </div>
                    <div className="middle">
                    </div>
                    <div className="right">
                        <span className="pull-right">
                            <span className="col mr10">
                                
                            </span>
                            <span className="col icons-group">
                                
                            </span>
                        </span>    
                    </div>
                </div>
               <TaskItem data={data} />

               <div className="section_comments">
                    <CommentList object_type={OBJECT_TYPE_TASK} object_id={taskId} />
                    <CommentForm object_type={OBJECT_TYPE_TASK} object_id={taskId} />
                </div>
            </div>

        );
    }
}


export default ProjectTask;
