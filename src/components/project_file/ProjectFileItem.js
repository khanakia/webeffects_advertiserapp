import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link, hashHistory } from 'react-router'

import {connectWithStore} from '../../store/index.js';


import { Auth,  ProjectFileHelper } from '../../helpers'
import PopupHelper from '../../helpers/helper_popup'

import { fetchProjectFiles, fetchProjectFile } from '../../actions/action_project';


import { ROOT_URL, API_URL, OBJECT_TYPE_FILE } from '../../config'

import TagAddButton from '../tag/TagAddButton';
import TagItemTitleMultiple from '../tag/TagItemTitleMultiple';

class ProjectFileItem extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        defaultValue : '',
        className : '',

        project_id : '',
        file : [],
        layout : 'layout1'
    }

    componentWillMount() {
    }

    componentDidMount() {
        
    }

    editFile(e, data) {
        e.preventDefault()
        PopupHelper.showProjectFileDetailsEditForm({data, onDataUpdate:this.onFileUpdated.bind(this)})
    }

    onFileUpdated(data) {
        this.props.fetchProjectFiles(this.props.project_id);
    }

 
    showFile(e, item) {
        e.preventDefault()
        // ProjectMessageForm.showInPoup({data})

        // var location = {
        //     pathname : this.props.location.pathname + '/' + item.id ,
        // } 
        var url = 'projects/'+this.props.project_id+'/files/'+item.id;
        hashHistory.push(url)
    }

    deleteFile(e, item) {
        e.preventDefault()
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

    previewFile(e, data) {
        e.preventDefault()
        PopupHelper.showProjectFilePrviewModal({data : data.project_file_version_latest})
    }


    downloadFile(e, item) {
        e.preventDefault()
        window.location.href = this.getFileDownloadURL(item.project_file_version_latest)
    }

    getFileDownloadURL(item_file_verion) {
        return API_URL+'/project_file/download?id='+item_file_verion.id+'&token=' + Auth.getToken();   
    }

    getImageURL(item_file_verion) {
        var id = item_file_verion.id;
        var file_ext = item_file_verion.file_ext;
        var file_hash = item_file_verion.file_hash;

        var url = API_URL+'/project_file/preview_thumb?id='+id+'&hash=' + file_hash;
        // if(file_ext=='pdf') {
        //     url = ROOT_URL + "/public/images/pdf.png";
        // }

        return url;
    }

    getFileThumb(item) {
        const urlPreview = this.getImageURL(item.project_file_version_latest);
        return (
            <div className="thumb-wrapper d-inline-block valign-middle mr20">
                <a href={urlPreview}>
                    <img src={urlPreview} className="wmax100 hmax-p50" />
                </a>
            </div>
        )
    }


    updateNewVersion(e, data) {
        e.preventDefault()
        PopupHelper.showProjectFileUploadForm({data, is_new : false, onDataUpdate:this.onFileNewUpload.bind(this)})
    }

    onFileNewUpload() {
        // this.props.fetchProjectFiles(this.props.project_id);   
    }

    viewFileVersions(e, data) {
        e.preventDefault()
        // console.log(data)
        PopupHelper.showProjectFileViewVersions({data});
    }

    renderCategoryBadges(categories) {
        if(undefined==categories) return false;
        return categories.map((category) => {
            return (
                <span key={category.id} className="label label-success ml10">{category.category_name}</span>
            )
        });
    }

    fetchDataTag() {
        this.props.fetchProjectFiles(this.props.project_id);
        this.props.fetchProjectFile(this.props.file.id);
    }


    renderLayout111(item) {
        return (
                <div className="d-table w100">
                    <div className="d-table-cell xs-d-block wp50 valign-middle">
                        <input type="checkbox" className="selectfiles_checkbox" defaultValue="1" data-file_version_id={item.project_file_version_latest.id} />
                    </div>
                    <div className="d-table-cell xs-d-block w40 xs-w100 valign-middle">
                            {this.getFileThumb(item)}
                            
                            <div className="d-inline-block valign-middle">
                                {   item.project_file_version_latest ?
                                    <Link data-id={item.id} to={'projects/'+this.props.project_id+'/files/'+item.id}>{item.project_file_version_latest.file_displayname}</Link>
                                    : ''
                                }
                                <div>
                                    <span className="fs12">by {item.created_by_user.fullname}</span>
                                </div>

                                <span className="">
                                    <TagItemTitleMultiple data={item.tag_items} fetchData={this.fetchDataTag.bind(this)} />
                                </span>    
                            </div>
                            
                        
                    </div>
                    
                    <div className="d-table-cell xs-d-block w10 xs-w100 valign-middle">
                        {this.renderCategoryBadges(item.categories)}
                    </div>
                    <div className="d-table-cell xs-d-block valign-middle text-right">
                        <span className="icons-group light">

                            <button className="btn btn-plain" title="View Single Page" onClick={(e)=> this.showFile(e, item)} ><i className="fa fa-external-link"></i></button>
                            <button className="btn btn-plain" title="Preview" onClick={(e)=> this.previewFile(e, item)} ><i className="fa fa-eye"></i></button>

                            { item.project_file_version_latest.can_download==true
                                ? <button className="btn btn-plain" title="Download" onClick={(e)=> this.downloadFile(e, item)} ><i className="fa fa-download"></i></button>
                                : ''
                            }
                            
                            <button className="btn btn-plain" title="View Other Versions" onClick={(e)=> this.viewFileVersions(e, item)} ><i className="fa fa-code-fork"></i></button>
                            <button className="btn btn-plain" title="Upload New Version" onClick={(e)=> this.updateNewVersion(e, item)} ><i className="fa fa-upload"></i></button>
                            <TagAddButton object_type={OBJECT_TYPE_FILE} object_id={item.id} fetchData={this.fetchDataTag.bind(this)} strip_tags={item.tags} />
                            <button className="btn btn-plain" title="Items Attached To This File" onClick={(e)=> this.showFile(e, item)} ><i className="fa fa-file"></i></button>
                            <button className="btn btn-plain" title="Add Comment" onClick={(e)=> this.showFile(e, item)} ><i className="fa fa-comment"></i></button>
                            <button className="btn btn-plain" title="Edit File Details" onClick={(e)=> this.editFile(e, item)} ><i className="fa fa-pencil"></i></button>
                            <button className="btn btn-plain" title="Delete File" onClick={(e)=> this.deleteFile(e, item)} ><i className="fa fa-trash"></i></button>
                        </span>
                    </div>
                </div>
   
        );
    }

    renderLayout1(item) {
        return (

            

                <div className="d-table w100">
                    <div className="d-table-cell xs-d-block wp50 valign-middle">
                        <input type="checkbox" className="selectfiles_checkbox" defaultValue="1" data-file_version_id={item.id} />
                    </div>
                    <div className="d-table-cell xs-d-block w40 xs-w100 valign-middle">
                            {this.getFileThumb(item)}
                            
                            <div className="d-inline-block valign-middle">
                                {   item.project_file_version_latest ?
                                    <Link data-id={item.id} to={'projects/'+this.props.project_id+'/files/'+item.id}>{item.project_file_version_latest.file_displayname}</Link>
                                    : ''
                                }
                                <div>
                                    <span className="fs12">by {item.created_by_user.fullname}</span>
                                </div>

                                <span className="">
                                    <TagItemTitleMultiple data={item.tag_items} fetchData={this.fetchDataTag.bind(this)} />
                                </span>    
                            </div>
                            
                        
                    </div>
                    
                    <div className="d-table-cell xs-d-block w10 xs-w100 valign-middle">
                        {this.renderCategoryBadges(item.categories)}
                    </div>
                    <div className="d-table-cell xs-d-block valign-middle text-right">
                        <span className="icons-group light controls">
                            { item.project_file_version_latest.is_external==true
                                ? <a target="_blank" href={item.project_file_version_latest.external_url} className="px10" title="Go to Url" ><i className="fa fa-link"></i></a>
                                : ''
                            }
                            
                            
                            { (item.project_file_version_latest.can_preview==true && item.project_file_version_latest.is_external==false)
                                ? <button className="btn btn-plain" title="Preview" onClick={(e)=> this.previewFile(e, item)} ><i className="fa fa-eye"></i></button>
                                : ''
                            }

                            { item.project_file_version_latest.can_download==true
                                ? <button className="btn btn-plain" title="Download" onClick={(e)=> this.downloadFile(e, item)} ><i className="fa fa-download"></i></button>
                                : ''
                            }
                            
                            <TagAddButton object_type={OBJECT_TYPE_FILE} object_id={item.id} fetchData={this.fetchDataTag.bind(this)} strip_tags={item.tags} />
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"><i className="fa fa-chevron-down"></i></a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <li><a href="#" className="" title="View Single Page" onClick={(e)=> this.showFile(e, item)} ><i className="fa fa-external-link"></i>View single page</a></li>
                                <li><a href="#" className="" title="View Other Versions" onClick={(e)=> this.viewFileVersions(e, item)} ><i className="fa fa-code-fork"></i>View other version</a></li>
                                <li><a href="#" className="" title="Upload New Version" onClick={(e)=> this.updateNewVersion(e, item)} ><i className="fa fa-upload"></i>Upload new version</a></li>
                                <li><a href="#" className="" title="Items Attached To This File" onClick={(e)=> this.showFile(e, item)} ><i className="fa fa-file"></i>Items attached to this file</a></li>
                                <li><a href="#" className="" title="Edit File Details" onClick={(e)=> this.editFile(e, item)} ><i className="fa fa-pencil"></i>Edit File detail</a></li>
                                <li><a href="#" className="" title="Delete File" onClick={(e)=> this.deleteFile(e, item)} ><i className="fa fa-trash"></i>Delete file</a></li>
                            </ul>
                        </span>
                    </div>
                </div>
   
        );
    }
    renderLayout2(item) {
        return (
            
                <div className="d-table w100 layout2">
                    <div className="d-table-cell xs-d-block w40 xs-w100 valign-middle">
                            {this.getFileThumb(item)}
                            
                            <div className="d-inline-block valign-middle">
                                {   item.project_file_version_latest ?
                                    <Link data-id={item.id} to={'projects/'+this.props.project_id+'/files/'+item.id}>{item.project_file_version_latest.file_displayname}</Link>
                                    : ''
                                }
                                <div>
                                    <span className="fs12">by {item.created_by_user.fullname}</span>
                                </div>
                            </div>
                    </div>
                    <div className="d-table-cell xs-d-block valign-middle text-right">
                        <span className="icons-group light">
                            <button className="btn btn-plain" title="Preview" onClick={(e)=> this.previewFile(e, item)} ><i className="fa fa-eye"></i></button>
                            <button className="btn btn-plain" title="Download" onClick={(e)=> this.downloadFile(e, item)} ><i className="fa fa-download"></i></button>
                            <button className="btn btn-plain" title="Delete File" onClick={(e)=> this.deleteFile(e, item)} ><i className="fa fa-trash"></i></button>
                        </span>
                    </div>
                </div>
          
        );
    }


    render() {
        const item = this.props.file
        return (
            <div className={"comp-projectfileitem " + this.props.layout }>
                { this.props.layout=='layout1'
                    ? this.renderLayout1(item)
                    : this.renderLayout2(item)
                }
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
        },
        fetchProjectFile: (id) => {
            dispatch(fetchProjectFile(id)).then((response) => {
                // dispatch(fetchCategoriesTypeFile(project_id))
            });
        },
    }
}

const ProjectFileItemContainer = connectWithStore(ProjectFileItem, mapStateToProps, mapDispatchToProps)

export default ProjectFileItemContainer
