import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';

import Sidebar from './Sidebar'
import PagePanel from './PagePanel'

import TaskSingle from './TaskSingle'
// import TaskForm from './TaskForm'


class TaskList extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
       this.props.fetchTasklist();
    }


    renderTasks(tasks) {
        return tasks.map((task) => {
            return (
                <TaskSingle key={task.id} data={task} />
            );
        });
    }


    render() {
        const { activeTasklist} = this.props.tasklistData;
        return (
            <div>
                <Sidebar>
                    ABC1
                </Sidebar>
                <PagePanel hasSidebar="true">
                    <div>
                        <h3>{activeTasklist.tasklist.tasklist_title}</h3>

                        <div className="tasks-container space">
                            {this.renderTasks(activeTasklist.tasks)}
                        </div>

                        

                    </div>
                </PagePanel>
            </div>
        );
    }
}


export default TaskList;
