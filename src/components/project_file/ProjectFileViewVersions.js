import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {connectWithStore} from '../../store/index.js';

import { Auth, ProjectFileHelper, ProjectFileVersionHelper } from '../../helpers'
import PopupHelper from '../../helpers/helper_popup'


import { API_URL, API_URL_PROJECT_FILE, OBJECT_TYPE_FILE } from '../../config.js'

import ControlNotifyPeople from '../controls/ControlNotifyPeople'
import CategorySelectControl  from '../category/CategorySelectControl'




class ProjectFileViewVersions extends Component {
    constructor(props) {
        super(props);

        this.unique_id = Auth.getUserID()+'_'+(new Date()).getTime();
        this.uploadedFiles = []
    }

    static defaultProps = {
        popup_id: '',
        settings : {},
        data : {
        },
    }

    componentWillMount() {
    }


    hidePopup = () => {
        if (this.props.popup_id) {
            jQuery('#' + this.props.popup_id).popup('hide');
        }
    }

  
    previewFile(e, data) {
        e.preventDefault()
        PopupHelper.showProjectFilePrviewModal({data : data})
    }


    downloadFile(e, item) {
        e.preventDefault()
        window.location.href = this.getFileDownloadURL(item)
    }

    getFileDownloadURL(item_file_verion) {
        return API_URL+'/project_file/download?id='+item_file_verion.id+'&token=' + Auth.getToken();   
    }

    deleteFileVersion(e, item) {
        var $li = jQuery(e.target).parents('li')
        ProjectFileVersionHelper.delete(item.id).then((response)=>{
            $li.hide()
            this.props.fetchProjectFiles(this.props.project_id)
        });
    }


    renderList(items) {
        return items.map((item) => {
            return (
                <li className="list-group-item" key={item.id}>

                   <div className="d-table w100">
                        <div className="d-table-cell xs-d-block valign-middle">

                            {'(v.'+item.version_no +') '+item.file_displayname}
                        </div>

                        <div className="d-table-cell xs-d-block w20 valign-middle text-right">
                            <span className="icons-group light">
                                {/*<button className="btn btn-plain" title="Preview" onClick={(e)=> this.previewFile(e, item)} ><i className="fa fa-eye"></i></button>*/}
                                
                                { item.is_external==true
                                    ? <a target="_blank" href={item.external_url} className="px10" title="Go to Url" ><i className="fa fa-link"></i></a>
                                    : ''
                                }

                                { item.can_download==true
                                    ? <button className="btn btn-plain" title="Download" onClick={(e)=> this.downloadFile(e, item)} ><i className="fa fa-download"></i></button>
                                    : ''
                                }

                                <button className="btn btn-plain" title="Delete This Version" onClick={(e)=> this.deleteFileVersion(e, item)} ><i className="fa fa-trash"></i></button>
                            </span>
                        </div>
                    </div>
                </li>
            );
        });
    }



    render() {
        console.log("this.props.data.project_file_versions", this.props)
        const data = this.props.data.project_file_version
        return (
            <div className="comp-projectfileviewversions">
                <div className="modal-header">
                    <h4 className="modal-title">File Versions</h4>
                </div>

                <div className="content-area">
                    {this.renderList(data)}
                </div>



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

const ProjectFileViewVersionsContainer = connectWithStore(ProjectFileViewVersions, mapStateToProps, mapDispatchToProps)

export default ProjectFileViewVersionsContainer
