import React, { Component } from 'react';
import { Link } from 'react-router';

import { Auth } from '../helpers'

import TasklistItem from './project_todo/TasklistItem'

class ProjectTaskList extends Component {
    constructor(props) {
        super(props);
    }

       componentWillMount() {
       this.props.fetchProjectTasklist(this.props.params.tasklistId);
       // console.info("Mounted")
    }

    // shouldComponentUpdate = (nextProps, nextState, nextContext) => {
    //     console.info(nextProps,this.props)
    // }

    componentWillUpdate = (nextProps, nextState) => {        
        // console.info(nextProps.params.taskId == this.props.params.tasklistId)
        if(nextProps.params.tasklistId !== this.props.params.tasklistId) {
            this.props.fetchProjectTasklist(nextProps.params.tasklistId);
            console.info('Execute AJAX')
        }
    }

    addTask(e, data) {

    }
   
    render() {
        const data = this.props.projectTasklist;

        return (
            <div>
                <div className="control-toolbar1 mb20">
                    <div className="left">
                        <span className="title">Tasklist</span>
                    </div>
                    <div className="middle">
                    </div>
                    <div className="right">
                        <span className="pull-right">
                            <span className="col mr10">
                                
                            </span>
                            <span className="col icons-group">
                                <button className="btn btn-success" onClick={(e)=> this.addTask(e)}><i className="fa fa-plus mr10"></i>Add Task</button>
                            </span>
                        </span>    
                    </div>
                </div>
               
               <TasklistItem data={data} />
            </div>

        );
    }
}


export default ProjectTaskList;
