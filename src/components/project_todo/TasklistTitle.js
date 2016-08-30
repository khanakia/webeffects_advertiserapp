import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link, hashHistory } from 'react-router'

import {connectWithStore} from '../../store/index.js';


import { Auth,  TasklistHelper } from '../../helpers'
import PopupHelper from '../../helpers/helper_popup'

import { fetchProjectTasklists } from '../../actions/action_project';

import { ROOT_URL, API_URL } from '../../config'

class TasklistTitle extends Component {
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

    addTask(e, data) {

        PopupHelper.showTaskForm({tasklist_id:this.props.data.id})
    }

    editTasklist(e, data) {
       PopupHelper.showTasklistForm({data, onDataUpdate:this.onDataUpdate.bind(this)})
    }
    
    onDataUpdate() {
        // this.props.fetchProjectFiles(this.props.project_id);   
    }

    deleteTasklist(e, data) {

    }

    templates(e, data) {

    }


    render() {
        const item = this.props.data
        return (
            <div className="comp-tasklisttitle" data-tasklistid={item.id}>
                <div className="d-table w100">
                    <div className="d-table-cell xs-d-block w40 xs-w100 valign-middle">
                            <div className="d-inline-block">
                                <Link data-id={item.id} to={'projects/'+this.props.project_id+'/tasklists/'+item.id}>{item.tasklist_title}</Link>
                            </div>
                    </div>
                    
                    <div className="d-table-cell xs-d-block valign-middle text-right">
                        <span className="icons-group light">
                            <button className="btn btn-plain" title="Add Task" onClick={(e)=> this.addTask(e, item)} ><i className="fa fa-plus"></i></button>
                            <button className="btn btn-plain" title="Templates" onClick={(e)=> this.templates(e, item)} ><i className="fa fa-save"></i></button>
                            <button className="btn btn-plain" title="Edit Tasklist Details" onClick={(e)=> this.editTasklist(e, item)} ><i className="fa fa-pencil"></i></button>
                            <button className="btn btn-plain" title="Delete Tasklist" onClick={(e)=> this.deleteTasklist(e, item)} ><i className="fa fa-trash"></i></button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}


// export default ProjectFileItem;




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

const TasklistTitleContainer = connectWithStore(TasklistTitle, mapStateToProps, mapDispatchToProps)

export default TasklistTitleContainer
