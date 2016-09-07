import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link, hashHistory } from 'react-router'

import {connectWithStore} from '../../store/index.js';


import { Auth,  TasklistHelper } from '../../helpers'
import PopupHelper from '../../helpers/helper_popup'



import {store} from '../../store/index.js';
import { fetchProjectTasklists, fetchProjectTasklist, fetchProjectTask } from '../../actions/action_project';

import { ROOT_URL, API_URL, OBJECT_TYPE_TASK } from '../../config'

import TagAddButton from '../tag/TagAddButton';
import TagItemTitleMultiple from '../tag/TagItemTitleMultiple';


class TaskTitle extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        defaultValue : '',
        className : '',

        project_id : '',
        data : [],

        is_pageSingleTask : false
    }

    componentWillMount() {
    }

    componentDidMount() {
        
    }

    editTask(e, data) {
        PopupHelper.showTaskForm({data, tasklist_id:this.props.data.id})
    }

    deleteTask(e, data) {

    }

    addSubTask(e, item) {
        console.log("sdf")
        jQuery(e.target).parents('.comp_task_title').next('.comp_task_item_children').toggleClass('active');
    }

    showTask(e, item) {
              var url = 'projects/'+this.props.project_id+'/tasks/'+item.id;
        hashHistory.push(url)
    }

    addComment(e, data) {
        PopupHelper.showCommentForm({object_type:OBJECT_TYPE_TASK, object_id:data.id})
    }


    fetchDataTag() {
        this.props.fetchProjectTasklists(this.props.project_id);
        this.props.fetchProjectTasklist(this.props.data.tasklist_id)
        this.props.fetchProjectTask(this.props.data.id);
    }



    renderAssignedUsers(users) {
        if(undefined==users) return false;
        return users.map((item) => {
            return (
                <span key={item.id} className="ml5 label label-default">
                    {item.fullname}
                </span>
            )
        });
    }

    render() {
        const item = this.props.data
        return (
            <div className={"comp_task_title " + this.props.className}>
                <a href="#" className="mr10 dragHandle"><i className="fa fa-arrows"></i></a>
                <div className="d-table inner w100">
                
                    <div className="d-table-cell xs-d-block wp20 xs-w100 valign-middle">
                            <input type="checkbox" />
                    </div>
                    <div className="d-table-cell xs-d-block xs-w100 valign-middle">
                            {item.id}
                            <div className="d-inline-block">
                                <Link data-id={item.id} to={'projects/'+this.props.project_id+'/tasks/'+item.id}>{item.task_title}</Link>
                            </div>
                            <span className={'mx10 priority_'+item.priority} title={item.priority}><i className="fa fa-exclamation-circle"></i></span>
                            <span>{item.progress}%</span>
                            {this.renderAssignedUsers(item.task_users)}
                            <span className="ml20">
                                <TagItemTitleMultiple data={item.tag_items} fetchData={this.fetchDataTag.bind(this)} />
                            </span>
                    </div>
                    
                    <div className="d-table-cell xs-d-block valign-middle text-right">
                        <span className="icons-group light">
                            { this.props.is_pageSingleTask==false
                              ? <span> 
                                <button className="btn btn-plain" title="View Single Page" onClick={(e)=> this.showTask(e, item)} ><i className="fa fa-external-link"></i></button>
                                <button className="btn btn-plain" title="Add Comment" onClick={(e)=> this.addComment(e, item)} ><i className="fa fa-comment"></i></button>
                                </span>
                              : ''  

                            }
                            <button className="btn btn-plain" title="Edit Task Details" onClick={(e)=> this.editTask(e, item)} ><i className="fa fa-pencil"></i></button>
                            <button className="btn btn-plain" title="Add SubTask" onClick={(e)=> this.addSubTask(e, item)} ><i className="fa fa-indent"></i></button>
                            
                            <TagAddButton object_type={OBJECT_TYPE_TASK} object_id={item.id} fetchData={this.fetchDataTag.bind(this)} strip_tags={item.tags} />
                            <button className="btn btn-plain" title="Delete File" onClick={(e)=> this.deleteFile(e, item)} ><i className="fa fa-trash"></i></button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}


// export default TaskTitle;




const mapStateToProps = (state) => {
    
    return {
        state : state,
        current_org: state.appdata.current_org,  // FETCH_APPDATA_CURRENTORG
        projectCurrent : state.project.current,  // FETCH_PROJECT_CURRENT 
        project_id : state.project.current.id
        
    };
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        dispatch,
        fetchProjectTasklists: (project_id) => {
            dispatch(fetchProjectTasklists(project_id))
        },

        fetchProjectTasklist: (tasklist_id) => {
            dispatch(fetchProjectTasklist(tasklist_id))
        },

        fetchProjectTask: (id) => {
            dispatch(fetchProjectTask(id))
        }
    }
}

const TaskTitleContainer = connectWithStore(TaskTitle, mapStateToProps, mapDispatchToProps)

export default TaskTitleContainer
