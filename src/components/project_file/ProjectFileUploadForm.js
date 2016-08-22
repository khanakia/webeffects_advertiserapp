import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { Auth, ProjectFileHelper, ProjectFileVersionHelper } from '../../helpers'
class ProjectFileUploadForm extends Component {
    constructor(props) {
        super(props);

        this.unique_id = Auth.getUserID()+'_'+(new Date()).getTime();
    }

    static defaultProps = {
        onDataUpdate: function(org) {},
        popup_id: '',
        settings : {},
        data : {
        },

        project_id : ''
    }

    componentWillMount() {
    }

    componentDidMount() {
        var unique_id = this.unique_id;

        var $fub = $('#fine-uploader-basic');
        var fineUploaderBasicInstance = new qq.FineUploaderBasic({
            debug: true,
             button: $fub[0],
            request: {
                endpoint: 'http://local.pma/api/project_file_version/upload',
                customHeaders: {
                    'Authorization': Auth.getTokenBearer()
                }
            },

            deleteFile: {
                enabled: true,
                endpoint: '/uploads'
            },
            retry: {
               enableAuto: true
            },

            callbacks: {
                onSubmit: function (id, fileName) {
                    
                    var extraParams = {
                        unique_id: unique_id
                    }

                    this.setParams(extraParams);
                },
                onComplete: function(id, fileName, responseJSON) {
                    if (responseJSON.success) {
                        jQuery("#files_list").append('<li class="list-group-item" data-fileversionid="'+responseJSON.fileversion.id+'">' + fileName + '<button class="pull-right a-delete-file"><i class="fa fa-trash"></i></button></li>');
                    }
                }
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

        
        $('#files_list').on('click', '.a-delete-file', function() {            
            var $li = $( this ).parent();
            var id = $li.data('fileversionid');
            ProjectFileVersionHelper.delete(id).then((response) => {
                $li.remove();
            })
        });

    }

    static showInPoup({settings={}, data={}, onDataUpdate=this.defaultProps.onDataUpdate()}) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach : true,
            message : '<div id="' + uniq + '"></div>',
            container_class : "w500",
            opacity: 0.5,
            blur: false,
            onopen : function(e){
              var pid = (jQuery(e).attr('id'));
              ReactDom.render(<ProjectFileUploadForm popup_id={pid} settings={settings} data={data} onDataUpdate={onDataUpdate} />, document.getElementById(uniq));
              console.log(pid);
              // setTimeout(() => jQuery('#'+pid).popup('hide'), 3000); 
            }
        });
    }


    hidePopup = () => {
        if (this.props.popup_id) {
            jQuery('#' + this.props.popup_id).popup('hide');
        }
    }

    save() {
        var data = {
            project_id : this.props.project_id,
            unique_id : this.unique_id,
        }

        data = jQuery.param(data)
        ProjectFileHelper.store(data)
    }
  
    render() {
        return (
            <div className="comp-projectfileuploadform">
                <div className="modal-header">
                    <h4 className="modal-title">Edit Domains</h4>
                </div>
                
                <div>

                <div id="fine-uploader-dropzone">
                    <div id="fine-uploader-basic" className="btn btn-success">
                        <i className="icon-upload icon-white"></i> Click to upload
                    </div>
                </div>
                
                <ul className="list-group" id="files_list">
                </ul>

                <div id="fine-uploader">
                </div>


                </div>
                <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active"><a href="#option" aria-controls="option" role="tab" data-toggle="tab">Options</a></li>
                    <li role="presentation"><a href="#description" aria-controls="description" role="tab" data-toggle="tab">Description</a></li>
                </ul>

                <div className="content-area">
                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane active" id="option">
                           
                        </div>
                        <div role="tabpanel" className="tab-pane" id="description">
                           
                        </div>
                    </div>
                </div>


                <div className="modal-footer text-right">
                    <button type="button" className="btn btn-success" ref="btn_save" onClick={() => this.save()}>Save</button>
                </div>

            </div>
        );
    }
}


export default ProjectFileUploadForm;
