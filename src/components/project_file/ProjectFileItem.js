import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link, hashHistory } from 'react-router'

import {connectWithStore} from '../../store/index.js';


import { Auth,  ProjectFileHelper } from '../../helpers'
import PopupHelper from '../../helpers/helper_popup'

import { fetchProjectFiles} from '../../actions/action_project';

class ProjectFileItem extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        defaultValue : '',
        className : '',

        project_id : '',
        file : []
    }

    componentWillMount() {
    }

    componentDidMount() {
        
    }

    editFile(e, data) {
        PopupHelper.showProjectFileDetailsEditForm({data, onDataUpdate:this.onFileUpdated.bind(this)})
    }

    onFileUpdated(data) {
        this.props.fetchProjectFiles(this.props.project_id);
    }

 
    showFile(e, item) {
        // ProjectMessageForm.showInPoup({data})

        // var location = {
        //     pathname : this.props.location.pathname + '/' + item.id ,
        // } 
        var url = 'projects/'+this.props.project_id+'/files/'+item.id;
        hashHistory.push(url)
    }

    deleteFile(e, item) {
        $.confirm({
            title: '',
            content: 'Are you sure you want to remove ?',
            confirmButton: 'Yes',
            cancelButton: 'No',
            confirm: function(){
                ProjectFileHelper.delete(item.id).then((response) => {
                    this.props.fetchProjectFiles(this.props.project_id);
                });
            }.bind(this)
        });
    }

    previewFile(e, item) {
    
        ProjectFileHelper.preview(item.id).then((response) => {
            console.log(response)
                   
            var data = new Blob([response.data]);
            var a = document.getElementById('a');
            a.href = URL.createObjectURL(data);

              // document.documentElement.outerHTML = response.data;
        });
    }

    renderCategoryBadges(categories) {
        if(undefined==categories) return false;
        return categories.map((category) => {
            return (
                <span key={category.id} className="label label-success ml10">{category.category_name}</span>
            )
        });
    }


    render() {
        const item = this.props.file
        return (
            <div className="comp-projectfileitem">
            

                <div className="d-table w100">
                    <div className="d-table-cell xs-d-block w40 xs-w100 valign-middle">
                        <h4 className="list-group-item-heading">
                            {   item.project_file_version_latest ?
                                <Link data-id={item.id} to={'projects/'+this.props.project_id+'/files/'+item.id}>{item.project_file_version_latest.file_displayname}</Link>
                                : ''
                            }
                            <div>
                                <span className="fs12">by {item.created_by_user.fullname}</span>
                            </div>
                            
                        </h4>
                    </div>
                    
                    <div className="d-table-cell xs-d-block w10 xs-w100 valign-middle">
                        {this.renderCategoryBadges(item.categories)}
                    </div>
                    <div className="d-table-cell xs-d-block valign-middle text-right">
                        <span className="icons-group light">
                            <button className="btn btn-plain" title="View Single Page" onClick={(e)=> this.showFile(e, item)} ><i className="fa fa-external-link"></i></button>
                            <button className="btn btn-plain" title="Preview" onClick={(e)=> this.previewFile(e, item)} ><i className="fa fa-eye"></i></button>
                            <button className="btn btn-plain" title="Download" onClick={(e)=> this.showFile(e, item)} ><i className="fa fa-download"></i></button>
                            <button className="btn btn-plain" title="View Other Versions" onClick={(e)=> this.showFile(e, item)} ><i className="fa fa-code-fork"></i></button>
                            <button className="btn btn-plain" title="Move or Copy File" onClick={(e)=> this.showFile(e, item)} ><i className="fa fa-arrows"></i></button>
                            <button className="btn btn-plain" title="Upload New Version" onClick={(e)=> this.showFile(e, item)} ><i className="fa fa-upload"></i></button>
                            <button className="btn btn-plain" title="Edit File Details" onClick={(e)=> this.editFile(e, item)} ><i className="fa fa-pencil"></i></button>
                            <button className="btn btn-plain" title="Delete File" onClick={(e)=> this.deleteFile(e, item)} ><i className="fa fa-trash"></i></button>
                            <button className="btn btn-plain" title="Add Comment" onClick={(e)=> this.showFile(e, item)} ><i className="fa fa-comment"></i></button>
                            <button className="btn btn-plain" title="Quick View" onClick={(e)=> this.showFile(e, item)} ><i className="fa fa-expand"></i></button>
                            <button className="btn btn-plain" title="Tags" onClick={(e)=> this.showFile(e, item)} ><i className="fa fa-tags"></i></button>
                            <button className="btn btn-plain" title="Items Attached To This File" onClick={(e)=> this.showFile(e, item)} ><i className="fa fa-file"></i></button>
                            <button className="btn btn-plain" title="Follow" onClick={(e)=> this.showFile(e, item)} ><i className="fa fa-bell"></i></button>
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

const ProjectFileItemContainer = connectWithStore(ProjectFileItem, mapStateToProps, mapDispatchToProps)

export default ProjectFileItemContainer
