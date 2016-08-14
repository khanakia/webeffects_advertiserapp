import React, { Component } from 'react';
import { Link } from 'react-router';

import Tasklist from './project/Tasklist'
import TasklistHelper from '../helpers/helper_tasklist.js'


class ProjectTasks extends Component {
    constructor(props) {
        super(props);
        this.projectId = this.props.params.projectId
    }

    componentWillMount() {
       this.props.fetchTasklists(this.projectId);
    }

    componentDidMount() {
        $(".tasklists-list").sortable({
            helper: "clone",
            items: "div.tasklist-wrapper",
            update: function(ev, ui) {
                var data = $(".tasklists-list").sortable( "serialize", { key: "tl[]" } );
                TasklistHelper.updateSortOrder(data);
            }
        });
    }

    renderList(items) {
        return items.map((item) => {
            return (
                <Tasklist data={item} key={item.id} />
            );
        });
    }

  
   
    render() {
        const data = this.props.projectsTasklists;


        return (
            <div>
               Project Tasks
                <div className="tasklists-list">
                    {this.renderList(data)}
                </div>
            </div>

        );
    }
}


export default ProjectTasks;
