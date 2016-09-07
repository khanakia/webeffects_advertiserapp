import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {connectWithStore} from '../../store/index.js';

import CategoryTree2 from '../category/CategoryTree2'

import { fetchProjectFiles, fetchProjectFilesBrowserFormList } from '../../actions/action_project';

import { ROOT_URL, API_URL, OBJECT_TYPE_FILE } from '../../config'


class ProjectFilePrviewModal extends Component {
    constructor(props) {
        super(props);

        this.seletectedItems = []

        this.search = {
            title : '',
            catid : ''
        }
    }

    static defaultProps = {
        onDataUpdate: function(org) {},
        onFileItemsSelect : function() {},
        popup_id: '',
        settings : {},
        data : {
        },

        url : '',
    }

    componentWillMount() {
    }

    componentDidMount() {
        
    }


    hidePopup = () => {
        if (this.props.popup_id) {
            jQuery('#' + this.props.popup_id).popup('hide');
        }
    }


    getURL() {
        var id = this.props.data.id;
        var file_ext = this.props.data.file_ext;
        var file_hash = this.props.data.file_hash;
        var url = API_URL+'/project_file/preview?id='+id+'&hash=' + file_hash;
        return url;
    }

    renderFrame() {
        var id = this.props.data.id;
        var file_mime_type = this.props.data.file_mime_type;
        
        console.log(this.getURL())
        if(file_mime_type.match('image.*')) {
            return (
                <img src={this.getURL()} />
            )
        }

        if(file_mime_type.match('application.*')) {
            return (
                <iframe src={this.getURL()} frameBorder="0"></iframe>
            )
        }
        
    }
  
    render() {

        return (
            <div className="comp-projectfileprviewmodal">
               {/*<iframe src={this.props.url} frameBorder="0"></iframe>*/}
               {this.renderFrame()}
            </div>
        );
    }
}


// export default ProjectFileBrowseForm;


const mapStateToProps = (state) => {
    
    return {
        state : state,
        current_org: state.appdata.current_org,
        projectCurrent : state.project.current,  // FETCH_PROJECT_CURRENT 
        project_id : state.project.current.id,
        projectFiles: state.project.files_browser_form_list,
    };
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        dispatch,
        fetchProjectFiles: (project_id, extraParams={}) => {

            dispatch(fetchProjectFilesBrowserFormList(project_id, extraParams)).then((response) => {
                // dispatch(fetchCategoriesTypeFile(project_id))
            });
        }
    }
}

const ProjectFilePrviewModalContainer = connectWithStore(ProjectFilePrviewModal, mapStateToProps, mapDispatchToProps)

export default ProjectFilePrviewModalContainer
