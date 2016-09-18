import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link, hashHistory } from 'react-router'

import {connectWithStore} from '../../store/index.js';


import { Auth,  TasklistHelper, Localstore } from '../../helpers'
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
        data : [],

        onTasklistDataUpdate : function(tasklist) {},
        onTaskDataUpdate: function(task) {},
    }

    componentWillMount() {
    }

    componentDidMount() {
        
    }

    addTask(e, data) {
       PopupHelper.showTaskForm({tasklist_id:this.props.data.id, onDataUpdate: this.props.onTaskDataUpdate.bind(this)})
    }

    editTasklist(e, data) {
       PopupHelper.showTasklistForm({data, is_new: false, onDataUpdate:this.props.onTasklistDataUpdate.bind(this)})
    }
    
    onDataUpdate() {
        // this.props.fetchProjectFiles(this.props.project_id);   
    }

    deleteTasklist(e, data) {
        $.confirm({
            title: '',
            content: 'Are you sure you want to remove ?',
            confirmButton: 'Yes',
            cancelButton: 'No',
            confirm: function(){
                TasklistHelper.delete(data.id).then((response) => {
                    this.props.onTasklistDataUpdate()
                });
            }.bind(this)
        });
    }

    templates(e, data) {

    }

    showHideTasklist(e, item) {
        
        jQuery(e.currentTarget).find("i").toggleClass('fa-minus fa-plus')
        var $target = jQuery('#tl_'+item.id);
        var $content = $target.find('.content_wrapper');
        $content.toggle();
        // console.log($target)

        Localstore.setTasklistLocalStore(item.id, {
            show_tasks : !$content.is(':hidden')
        })
    }


    render() {
        const item = this.props.data
        if (jQuery.isEmptyObject(item)) return false;
        const localStoreData = Localstore.getTasklistLocalStore(item.id)
        return (
            <div className="comp-tasklisttitle" data-tasklistid={item.id}>
                <div className="d-table w100">
                    <div className="d-table-cell xs-d-block w40 xs-w100 valign-middle">
                            <button className="btn btn-plain d-inline-block mr10" title="Add Task" onClick={(e)=> this.showHideTasklist(e, item)} >
                                <i className={"fa " + (localStoreData.show_tasks ? 'fa-minus' : 'fa-plus') }></i>
                            </button>
                            <div className="d-inline-block">
                                <Link data-id={item.id} to={'projects/'+this.props.project_id+'/tasklists/'+item.id}>{item.tasklist_title}</Link>
                            </div>
                    </div>
                    
                    <div className="d-table-cell xs-d-block valign-middle text-right">
                        <span className="icons-group light">
                            <button className="btn btn-plain" title="Add Task" onClick={(e)=> this.addTask(e, item)} ><i className="fa fa-plus"></i></button>
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
