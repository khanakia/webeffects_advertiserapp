import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link, hashHistory } from 'react-router'

import {connectWithStore} from '../../store/index.js';


import { Auth,  TasklistHelper } from '../../helpers'
import PopupHelper from '../../helpers/helper_popup'

import { fetchTasklists} from '../../actions/action_project';

import { ROOT_URL, API_URL } from '../../config'

class TaskTitle extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        defaultValue : '',
        className : '',

        project_id : '',
        data : []
    }

    componentWillMount() {
    }

    componentDidMount() {
        
    }

    editTask(e, data) {
        PopupHelper.showTaskForm({tasklist_id:this.props.data.id})
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

    render() {
        const item = this.props.data
        return (
            <div className="comp_task_title">
                <div className="d-table w100">
                    <div className="d-table-cell xs-d-block wp60 xs-w100 valign-middle">
                        <div className="icons-group light">
                            <a href="#" className="mr10"><i className="fa fa-arrows"></i></a>
                            <input type="checkbox" />
                        </div>
                    </div>
                    <div className="d-table-cell xs-d-block w40 xs-w100 valign-middle">
                            {item.id}
                            <div className="d-inline-block">
                                <Link data-id={item.id} to={'projects/'+this.props.project_id+'/tasks/'+item.id}>{item.task_title}</Link>
                            </div>
                    </div>
                    
                    <div className="d-table-cell xs-d-block valign-middle text-right">
                        <span className="icons-group light">
                            <button className="btn btn-plain" title="Edit File Details" onClick={(e)=> this.editFile(e, item)} ><i className="fa fa-pencil"></i></button>
                            <button className="btn btn-plain" title="View Single Page" onClick={(e)=> this.showTask(e, item)} ><i className="fa fa-external-link"></i></button>
                            <button className="btn btn-plain" title="Add SubTask" onClick={(e)=> this.addSubTask(e, item)} ><i className="fa fa-indent"></i></button>
                            <button className="btn btn-plain" title="Priority" onClick={(e)=> this.templates(e, item)} ><i className="fa fa-exclamation-circle"></i></button>
                            <button className="btn btn-plain" title="Progress" onClick={(e)=> this.editTasklist(e, item)} ><i className="fa fa-spinner"></i></button>
                            <button className="btn btn-plain" title="Add Tag" onClick={(e)=> this.deleteTasklist(e, item)} ><i className="fa fa-tag"></i></button>
                            <button className="btn btn-plain" title="Add Comment" onClick={(e)=> this.showFile(e, item)} ><i className="fa fa-comment"></i></button>
                            {/*<button className="btn btn-plain" title="Move or Copy File" onClick={(e)=> this.showFile(e, item)} ><i className="fa fa-arrows"></i></button>*/}
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
        fetchProjectFiles: (project_id) => {
            dispatch(fetchProjectFiles(project_id)).then((response) => {
                // dispatch(fetchCategoriesTypeFile(project_id))
            });
        }
    }
}

const TaskTitleContainer = connectWithStore(TaskTitle, mapStateToProps, mapDispatchToProps)

export default TaskTitleContainer
