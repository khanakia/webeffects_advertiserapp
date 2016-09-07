import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {connectWithStore} from '../../store/index.js';

import { Auth, ProjectFileHelper, ProjectFileVersionHelper } from '../../helpers'


import { API_URL_PROJECT_FILE, OBJECT_TYPE_FILE } from '../../config.js'

import ControlNotifyPeople from '../controls/ControlNotifyPeople'
import CategorySelectControl  from '../category/CategorySelectControl'


var FileListRender = React.createClass({
    render: function() {
      return (
        <ul className="list-group-uploadedfiles">
          {this.props.list.map(function(item){
            return (
                <li className="" key={item.project_file_version_latest.id}>
                    <input type="hidden" name="files[]" defaultValue={item.id} />
                    <label className="title">
                        {   item.project_file_version_latest ?
                            item.project_file_version_latest.file_displayname
                            : ''
                        }
                    </label>
                    
                </li>
            )
          })}
        </ul>
      )
    }
});

class ProjectFileUploadForm extends Component {
    constructor(props) {
        super(props);

        this.unique_id = Auth.getUserID()+'_'+(new Date()).getTime();
        this.uploadedFiles = []
    }

    static defaultProps = {
        onDataUpdate: function(org) {},
        popup_id: '',
        settings : {},
        data : {
            id : ''
        },

        project_id : '',
        is_new : true,
    }

    componentWillMount() {
    }

    componentDidMount() {
        // var unique_id = this.unique_id;

        // var $fub = $('#fine-uploader-basic');
        // var fineUploaderBasicInstance = new qq.FineUploaderBasic({
        //     debug: true,
        //      button: $fub[0],
        //     request: {
        //         endpoint: 'http://local.pma/api/project_file_version/upload',
        //         customHeaders: {
        //             'Authorization': Auth.getTokenBearer()
        //         }
        //     },

        //     deleteFile: {
        //         enabled: true,
        //         endpoint: '/uploads'
        //     },
        //     retry: {
        //        enableAuto: true
        //     },

        //     callbacks: {
        //         onSubmit: function (id, fileName) {
                    
        //             var extraParams = {
        //                 unique_id: unique_id
        //             }

        //             this.setParams(extraParams);
        //         },
        //         onComplete: function(id, fileName, responseJSON) {
        //             if (responseJSON.success) {
        //                 jQuery("#files_list").append('<li class="list-group-item" data-fileversionid="'+responseJSON.fileversion.id+'">' + fileName + '<button class="pull-right a-delete-file"><i class="fa fa-trash"></i></button></li>');
        //             }
        //         }
        //     }
        // });


        // // var $dropdzone = $('#fine-uploader-dropzone');
        // var dragAndDropModule = new qq.DragAndDrop({
        //     hideDropZonesBeforeEnter : true,
        //     dropZoneElements: [document.getElementById('fine-uploader-dropzone')],
        //     classes: {
        //       dropActive: "cssClassToAddToDropZoneOnEnter"
        //     },
        //     callbacks: {
        //       processingDroppedFiles: function() {
        //         //TODO: display some sort of a "processing" or spinner graphic
        //       },
        //       processingDroppedFilesComplete: function(files, dropTarget) {
        //         //TODO: hide spinner/processing graphic
        //         fineUploaderBasicInstance.addFiles(files); //this submits the dropped files to Fine Uploader
        //       }
        //     }
        // })

        
        // $('#files_list').on('click', '.a-delete-file', function() {            
        //     var $li = $( this ).parent();
        //     var id = $li.data('fileversionid');
        //     ProjectFileVersionHelper.delete(id).then((response) => {
        //         $li.remove();
        //     })
        // });

        this.fineUploader()

    }

    componentDidUpdate() {
    }

    fineUploader() {
        var project_id = this.props.project_id;
        var unique_id = this.unique_id;
        var project_file_id = this.props.data.id;

        var $fub = $(this.refs.btn_add_files);
        var fineUploaderBasicInstance = new qq.FineUploaderBasic({
            debug: false,
            button: $fub[0],
            multiple : true,
            request: {
                endpoint: API_URL_PROJECT_FILE + '/upload',
                customHeaders: {
                    'Authorization': Auth.getTokenBearer()
                }
            },

            // deleteFile: {
            //     enabled: true,
            //     endpoint: API_URL_PROJECT_FILE + '/delete'
            // },

            // retry: {
            //    enableAuto: true
            // },

            callbacks: {
                onSubmit: function (id, fileName) {
                    
                    var extraParams = {
                        unique_id : unique_id,
                        project_id: project_id ? project_id : '',
                        project_file_id: project_file_id,
                    }

                    this.setParams(extraParams);
                },
                onComplete: function(id, fileName, responseJSON) {
                    if (responseJSON.success) {

                        if(this.props.is_new) {
                            this.uploadedFiles.push(responseJSON.file)
                            this.renderUploadedFiles()
                            this.props.fetchProjectFiles(this.props.project_id)
                        } else {
                            this.hidePopup()
                        }
                    }
                }.bind(this)
            }
        });

        // var $dropdzone = $('#fine-uploader-dropzone');
        var dragAndDropModule = new qq.DragAndDrop({
            hideDropZonesBeforeEnter : true,
            dropZoneElements: [document.getElementById('fine-uploader-dropzone')],
            classes: {
              dropActive: "cssClassToAddToDropZoneOnEnter"
            },
            callbacks: {
              processingDroppedFiles: function() {
                //TODO: display some sort of a "processing" or spinner graphic
              },
              processingDroppedFilesComplete: function(files, dropTarget) {
                //TODO: hide spinner/processing graphic
                fineUploaderBasicInstance.addFiles(files); //this submits the dropped files to Fine Uploader
              }
            }
        })
    }

    renderUploadedFiles() {
        var uploaded_files_list = jQuery(this.refs.uploaded_files_list)
        console.info("uploaded_files_list", this. uploadedFiles)
        ReactDom.render(
            <div>
                <FileListRender list={this.uploadedFiles}/>
            </div>,
            uploaded_files_list[0]
        );
    }



    hidePopup = () => {
        if (this.props.popup_id) {
            jQuery('#' + this.props.popup_id).popup('hide');
        }
    }



    handleSubmit = (e) => {
        e.preventDefault();

    
        let data = jQuery(this.refs.form).serialize();

        // data = jQuery.param(data)
        
        ProjectFileHelper.store(data).then(function(response) {
            this.props.onDataUpdate(response)
            this.hidePopup();
        }.bind(this));

        return false;

    }
  
    renderNew() {
        // console.log("this.props.data", this.props.data)
        return (
            <div className="comp-projectfileuploadform">
                <div className="modal-header">
                    <h4 className="modal-title">Upload File</h4>
                </div>
                
                <form className="form" ref='form' onSubmit={this.handleSubmit}>
                    <input type="text" name="project_file_id" defaultValue={this.props.data.id} placeholder={'project_file_id'} />
                    <input type="text" name="project_id" defaultValue={this.props.project_id} placeholder={'project_id'} />
                    <input type="text" name="unique_id" defaultValue={this.unique_id} placeholder={'unique_id'} />
                    <div className="content-area">
                        <div className="mb20">
                            <div id="fine-uploader-dropzone" className="d-table w100">
                                <div className="d-table-cell valign-middle text-center">
                                    <div id="fine-uploader-basic" className="btn btn-success btn-sm" ref="btn_add_files">
                                        <i className="icon-upload icon-white"></i> Click to upload
                                    </div>
                                    <div className="fs12 my5"> OR </div>
                                    DROP FILES HERE
                                </div>
                            </div>
                            
                            <div className="my20 hmax-p100 oy-scroll" ref="uploaded_files_list">
                            </div>

                            <div id="fine-uploader">
                            </div>
                        </div>
                        <ul className="nav nav-tabs" role="tablist">
                            <li role="presentation" className="active"><a href="#option" aria-controls="option" role="tab" data-toggle="tab">Options</a></li>
                            <li role="presentation"><a href="#description" aria-controls="description" role="tab" data-toggle="tab">Description</a></li>
                        </ul>
                        <div className="tab-content">
                            <div role="tabpanel" className="tab-pane active" id="option">
                                 <div className="d-table mt30 w100">
                                    <div className="d-inline-block mr20 xs-d-block xs-w100">
                                        <label className="mr10">Notify by Email</label>
                                        <ControlNotifyPeople selectedUsers={this.props.data.notify_users} />
                                    </div>
                                    <div className="d-inline-block mr20 xs-d-block xs-w100">
                                        <label className="mr10">Category</label>
                                        <span className="d-inline-block"><CategorySelectControl selectedValues={this.props.data.categories} object_type={OBJECT_TYPE_FILE}  /></span>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" className="tab-pane" id="description">
                               <textarea className="hp70 w100" name="file_description" defaultValue={this.props.data.file_description}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer text-right">
                        <button type="submit" className="btn btn-blue-link" ref="btn_save" >Save</button>
                    </div>
                </form>

            </div>
        );
    }

    renderEdit() {
        return (
            <div className="comp-projectfileuploadform">
                <div className="modal-header">
                    <h4 className="modal-title">Upload File</h4>
                </div>
                
                <form className="form" ref='form' onSubmit={this.handleSubmit}>
                    <input type="text" name="project_file_id" defaultValue={this.props.data.id} placeholder={'project_file_id'} />
                    <input type="text" name="project_id" defaultValue={this.props.project_id} placeholder={'project_id'} />
                    <input type="text" name="unique_id" defaultValue={this.unique_id} placeholder={'unique_id'} />
                    <div className="content-area">
                        <div className="mb20">
                            <div id="fine-uploader-dropzone" className="d-table w100">
                                <div className="d-table-cell valign-middle text-center">
                                    <div id="fine-uploader-basic" className="btn btn-success btn-sm" ref="btn_add_files">
                                        <i className="icon-upload icon-white"></i> Click to upload
                                    </div>
                                    <div className="fs12 my5"> OR </div>
                                    DROP FILES HERE
                                </div>
                            </div>
                            
                            <div className="my20 hmax-p100 oy-scroll" ref="uploaded_files_list">
                            </div>

                            <div id="fine-uploader">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }


    render() {
        // console.log("this.props.data", this.props.data)
        return (
            <div className="comp-projectfileuploadform">
               { this.props.is_new==true 
                 ? this.renderNew()
                 : this.renderEdit()
               }
            </div>
        );
    }
}


// export default ProjectFileUploadForm;


import { fetchProjectFiles} from '../../actions/action_project';

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

const ProjectFileUploadFormContainer = connectWithStore(ProjectFileUploadForm, mapStateToProps, mapDispatchToProps)

export default ProjectFileUploadFormContainer
