import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {connectWithStore} from '../../store/index.js';
import { Link, hashHistory } from 'react-router'



class TasklistSidebar extends Component {    
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        data : [],
        project_id : ''
    }

    render() {
        // console.info("this.props", this.props.project_id)
        const data = this.props.data;
        const project_id = this.props.project_id;
        if (jQuery.isEmptyObject(data)) return false;
        return (
            <ul className="nav_project">
                <li key="all_tasks">
                    <Link activeClassName="active" to={"/projects/" + project_id + "/tasklists"}>All Tasks</Link>
                </li>
                {data.map(function(item){
                    return (
                        <li key={item.id}>
                            <Link activeClassName="active" to={"/projects/" + project_id + "/tasklists/" + item.id}>{item.tasklist_title}</Link>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default TasklistSidebar