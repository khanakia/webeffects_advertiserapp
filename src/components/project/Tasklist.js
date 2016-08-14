import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';

import TasklistHelper from '../../helpers/helper_tasklist.js'


import Task from './Task'
// import TaskForm from './TaskForm'


class Tasklist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks : []
        }
    }

    componentWillMount() {
       TasklistHelper.tasks(this.props.data.id).then((response)=> {
            this.setState({
                tasks : response.data
            })
       });
    }




    renderItems(items) {
        return items.map((item) => {
            return (
                <Task key={item.id} data={item} />
            );
        });
    }


    render() {
        const data = this.props.data;
        return (
            <div className="tasklist-wrapper" id={'tl_'+data.id}>
                <h3>{data.tasklist_title}</h3>
                <div className="tasks-list">
                    {this.renderItems(this.state.tasks)}
                </div>
            </div>
        );
    }
}


export default Tasklist;
