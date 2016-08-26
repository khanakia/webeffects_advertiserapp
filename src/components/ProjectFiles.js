import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link, hashHistory } from 'react-router'

import { Auth,  ProjectFileHelper, ProjectFileVersionHelper } from '../helpers'
import PopupHelper from '../helpers/helper_popup'


import CategoryTree2 from './category/CategoryTree2'

import ProjectFileUploadForm from './project_file/ProjectFileUploadForm'
import ProjectFileBrowseForm from './project_file/ProjectFileBrowseForm'
import ProjectFileDetailsEditForm from './project_file/ProjectFileDetailsEditForm'

import ProjectFileItem from './project_file/ProjectFileItem'

import {store} from '../store/index.js';

import { ROOT_URL, API_URL, OBJECT_TYPE_FILE } from '../config'

class ProjectFiles extends Component {
    constructor(props, context) {
        super(props, context);

        this.projectId = this.props.params.projectId

        this.data_category_form = {
            object_type: "message",
            project_id : this.projectId
        }
    }

    componentWillMount() {
        this.props.fetchProjectFiles(this.projectId);
    }

    componentDidMount() {
        // console.log("this.projectId", this.projectId)
        // PopupHelper.showProjectFileUploadForm({onDataUpdate:this.onFileNewUpload.bind(this)})
    }

 

    onFileItemsSelect(items) {
        console.log("EEEEE", items)
    }

    componentDidUpdate() {
        ReactDom.render(
                <div>
                    <CategoryTree2 onUpdated={this.onTreeItemUpdated.bind(this)} onDeleted={this.onTreeItemDeleted.bind(this)} onItemClick={this.onTreeItemClick.bind(this)} selectedValue={this.props.location.query.catid} project_id={this.projectId} object_type={OBJECT_TYPE_FILE}/>
                </div>,
                document.getElementById('childrenSidebar')
            );
    }


    // renderList(items) {
    //     return items.map((item) => {
    //         if(this.checkCategoryExists(item.categories)==false) return;
    //         return (
    //             <li className="list-group-item" key={item.id}>

    //                <div className="d-table w100">
    //                     <div className="d-table-cell xs-d-block w40 xs-w100 valign-middle">
    //                         <h4 className="list-group-item-heading">
    //                             {item.id} 
    //                             {   item.project_file_version_latest ?
    //                                 <Link to={'projects/'+this.projectId+'/files/'+item.id}>{item.project_file_version_latest.file_displayname}</Link>
    //                                 : ''
    //                             }
                                
    //                         </h4>
    //                     </div>
                        
    //                     <div className="d-table-cell xs-d-block w10 xs-w100 valign-middle">
    //                         {this.renderCategoryBadges(item.categories)}
    //                     </div>
    //                     <div className="d-table-cell xs-d-block valign-middle text-right">
    //                         <span className="icons-group light">
    //                             <button className="btn btn-plain" title="Edit" onClick={(e)=> this.showFile(e, item)} ><i className="fa fa-eye"></i></button>
    //                             <button className="btn btn-plain" title="Edit" onClick={(e)=> this.editFile(e, item)} ><i className="fa fa-pencil"></i></button>
    //                             <button className="btn btn-plain" title="Edit" onClick={(e)=> this.deleteFile(e, item)} ><i className="fa fa-trash"></i></button>
    //                         </span>
    //                     </div>
    //                 </div>
    //             </li>
    //         );
    //     });
    // }

    renderList(items) {
        return items.map((item) => {
            if(this.checkCategoryExists(item.categories)==false) return;
            return (
                <li className="list-group-item" key={item.id}>

                   <ProjectFileItem file={item}  />
                </li>
            );
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

    // Check if categoryExists
    checkCategoryExists(categories) {
        var catid = parseInt(this.props.location.query.catid);
        // console.log("catid", catid)
        if(!catid) return true;
        var exists = _.find(categories, { 'id': catid });
        if(exists) {
            return true;
        }
        return false;
    }


    uploadFiles(e) {
        PopupHelper.showProjectFileUploadForm({onDataUpdate:this.onFileNewUpload.bind(this)})
    }

    onFileNewUpload() {
        // this.props.fetchProjectFiles(this.projectId);   
    }

    editFile(e, data) {
        PopupHelper.showProjectFileDetailsEditForm({data, onDataUpdate:this.onFileUpdated.bind(this)})
    }

    onFileUpdated(data) {
        this.props.fetchProjectFiles(this.projectId);
    }

    showFile(e, item) {
        // ProjectMessageForm.showInPoup({data})

        var location = {
            pathname : this.props.location.pathname + '/' + item.id ,
        } 
        hashHistory.push(location)
    }

    deleteFile(e, item) {
        $.confirm({
            title: '',
            content: 'Are you sure you want to remove ?',
            confirmButton: 'Yes',
            cancelButton: 'No',
            confirm: function(){
                ProjectFileHelper.delete(item.id).then((response) => {
                    this.props.fetchProjectFiles(this.projectId);
                });
            }.bind(this)
        });
    }

    onTreeItemClick(event, node) {
        const selected_value = node.id;
        var query = '';
        if(selected_value) {
            query  = {
                'catid' : selected_value
            }
        }
        
        var location = {
            pathname : this.props.location.pathname,
            query : query
        } 
        hashHistory.push(location)
    }

    onTreeItemDeleted(data) {
        var location = {
            pathname : this.props.location.pathname,
        } 
        hashHistory.push(location)
        this.props.fetchProjectFiles(this.projectId);
    }

    onTreeItemUpdated(data) {
        console.log("updateddata", data)
        this.props.fetchProjectFiles(this.projectId);
    }

    selectAll(e) {
        jQuery(".selectfiles_checkbox").prop('checked', true)
    }

    selectNone(e) {
        jQuery(".selectfiles_checkbox").prop('checked', false)
    }

    downloadSelectedFiles(e) {
        var selectedFiles = [];
        $(".selectfiles_checkbox:checked").each(function(){
            const id = jQuery(this).data('file_version_id');
            selectedFiles.push(id)
        });

        
        var data = 'file_version_ids='+selectedFiles.join(',');
        ProjectFileHelper.downloadMultiple(data).then((response)=>{
            
            var url = API_URL+'/project_file/download_zip?id='+response.data.file_id+'&hash=' + response.data.file_hash;
            window.location.href = url;
        })
        // console.log(data)
    }

    deleteSelectedFiles(e) {
        var selectedFiles = [];
        $(".selectfiles_checkbox:checked").each(function(){
            const id = jQuery(this).data('file_version_id');
            selectedFiles.push(id)
        });

        
        var data = 'file_version_ids='+selectedFiles.join(',');
        ProjectFileVersionHelper.deleteMultiple(data).then((response)=>{
            console.log(data);
            this.props.fetchProjectFiles(this.projectId);
            
        })
        // console.log(data)
    }
   
    render() {
        // const { data } = this.props.projectsList;
        if (jQuery.isEmptyObject(this.props.projectFiles)) return false;
        const data = this.props.projectFiles;
        console.log("data", data)
        return (
            <div>
               {/*<ProjectFileUploadForm project_id={this.projectId} />*/}

               <div className="control-toolbar1">
                    <div className="left">
                        <span className="title">Files</span>
                    </div>
                    <div className="middle">
                    </div>
                    <div className="right">
                        <span className="pull-right">
                            <span className="col mr10">
                                
                            </span>
                            <span className="col icons-group">
                                <button className="btn btn-success" onClick={(e)=> this.uploadFiles(e)}><i className="fa fa-plus"></i></button>
                                <button className="btn btn-success" onClick={(e)=> this.uploadFiles(e)}>Google Drive</button>
                                
                            </span>
                        </span>    
                    </div>
                </div>

                <div className="my20">
                    <span className="col icons-group">
                        <button className="btn btn-default" onClick={(e)=> this.selectAll(e)}>Select All</button>
                        <button className="btn btn-default" onClick={(e)=> this.selectNone(e)}>Select None</button>
                        <button className="btn btn-danger" onClick={(e)=> this.deleteSelectedFiles(e)}>Delete</button>
                        <button className="btn btn-primary" onClick={(e)=> this.downloadSelectedFiles(e)}>Download</button>
                        {/*<button className="btn btn-primary" onClick={(e)=> this.uploadFiles(e)}>Move or Copy</button>*/}
                    </span>
                </div>
                <div className="mt20">
                    <ul className="list-group style1">
                        {this.renderList(data)}
                    </ul>
                </div>
            </div>

        );
    }
}


export default ProjectFiles;
