import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {connectWithStore} from '../../store/index.js';

import {
        API_URL_PROJECT_FILE,
    } from '../../config.js'

import { Auth, ProjectFileHelper, ProjectFileVersionHelper } from '../../helpers'
import PopupHelper from '../../helpers/helper_popup'

import ProjectFileBrowseForm from './ProjectFileBrowseForm'


var FileListRender = React.createClass({
    render: function() {
      return (
        <ul className="list-group">
          {this.props.list.map(function(item){
            return (
                <li className="list-group-item" key={item.id}>
                    <input type="hidden" name="files[]" defaultValue={item.id} />
                    <div className="d-table w100">
                        <div className="d-table-cell xs-d-block w20 xs-w100 valign-middle">
                            <h4 className="list-group-item-heading">
                                {   item.project_file_version_latest ?
                                    item.project_file_version_latest.file_displayname
                                    : ''
                                }

                                <button type="button" className="pull-right"><i className="fa fa-trash"></i></button>
                            </h4>
                        </div>
                        
                    </div>
                </li>
            )
          })}
        </ul>
      )
    }
});

class ProjectFileAttachForm extends Component {
    constructor(props) {
        super(props);
        this.unique_id = Auth.getUserID()+'_'+(new Date()).getTime();
        this.uploadedFiles = []
    }

    static defaultProps = {
        defaultValue : '',
        className : '',
    }

    componentWillMount() {
    }

    componentDidMount() {
        // this.fineUploader()
    }

    componentDidUpdate() {
        this.fineUploader()
    }

    addFiles() {


    }

    fineUploader() {
        var project_id = this.props.project_id;
        var unique_id = this.unique_id;

        var $fub = $(this.refs.btn_add_files);
        var fineUploaderBasicInstance = new qq.FineUploaderBasic({
            debug: true,
             button: $fub[0],
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
                        project_id: project_id
                    }

                    this.setParams(extraParams);
                },
                onComplete: function(id, fileName, responseJSON) {
                    if (responseJSON.success) {
                        this.uploadedFiles.push(responseJSON.file)
                        this.renderUploadedFiles()
                    }
                }.bind(this)
            }
        });
    }

    selectExistingFiles() {
        PopupHelper.showProjectFileBrowseForm({onFileItemsSelect:this.onFileItemsSelect.bind(this)})
    }

    onFileItemsSelect(items) {
        // console.log("onFileItemsSelect", items)
        var attached_files_list = jQuery(this.refs.attached_files_list)
        ReactDom.render(
            <div>
                <FileListRender list={items}/>
            </div>,
            attached_files_list[0]
        );
    }

    renderUploadedFiles() {
        var uploaded_files_list = jQuery(this.refs.uploaded_files_list)
        ReactDom.render(
            <div>
                <FileListRender list={this.uploadedFiles}/>
            </div>,
            uploaded_files_list[0]
        );
    }

  
    render() {
        return (
            <div className="comp-projectfileAttachform">
           

                <p>Drop Files Here</p>
                <div ref="attached_files_list">
                </div>
                <div ref="uploaded_files_list">
                </div>
                <div className="d-table w100">
                    <div className="d-inline-block mr20 xs-d-block xs-w100">
                        <div type="button" className="btn btn-default" ref="btn_add_files" >Add Files</div>
                    </div>
                    <div className="d-inline-block mr20 xs-d-block xs-w100">
                        <button type="button" className="btn" onClick={this.selectExistingFiles.bind(this)}>Select From Existing Files</button>
                    </div>
                    <div className="d-inline-block mr20 xs-d-block xs-w100">
                        <button type="button" className="btn" onClick={this.addFiles.bind(this)}>Google Drive</button>
                    </div>
                </div>
            </div>
        );
    }
}


// export default ProjectFileAttachForm;


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
        // fetchProjectFiles: (project_id, extraParams={}) => {

        //     dispatch(fetchProjectFilesBrowserFormList(project_id, extraParams)).then((response) => {
        //         // dispatch(fetchCategoriesTypeFile(project_id))
        //     });
        // }
    }
}

const ProjectFileAttachFormContainer = connectWithStore(ProjectFileAttachForm, mapStateToProps, mapDispatchToProps)

export default ProjectFileAttachFormContainer
