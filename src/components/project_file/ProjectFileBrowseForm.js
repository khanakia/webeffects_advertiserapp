import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {connectWithStore} from '../../store/index.js';

import CategoryTree2 from '../category/CategoryTree2'

import { fetchProjectFiles, fetchProjectFilesBrowserFormList } from '../../actions/action_project';

class ProjectFileBrowseForm extends Component {
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

        project_id : '',
    }

    componentWillMount() {
        this.props.fetchProjectFiles(this.props.project_id);
    }

    componentDidMount() {
        
    }


    // static showInPoup(args=this.defaultProps) {
    //     var uniq = 'id' + (new Date()).getTime();

    //     Controls.showpopup({
    //         detach : true,
    //         message : '<div id="' + uniq + '"></div>',
    //         container_class : "w800",
    //         opacity: 0.5,
    //         blur: false,
    //         onopen : function(e){
    //           var pid = (jQuery(e).attr('id'));
    //           ReactDom.render(<ProjectFileBrowseForm popup_id={pid} {...args} />, document.getElementById(uniq));
    //           console.log(pid);
    //           // setTimeout(() => jQuery('#'+pid).popup('hide'), 3000); 
    //         }
    //     });
    // }


    hidePopup = () => {
        if (this.props.popup_id) {
            jQuery('#' + this.props.popup_id).popup('hide');
        }
    }

    onFileItemsSelect() {
        // console.log(this.seletectedItems)
        this.hidePopup()
        this.props.onFileItemsSelect(this.seletectedItems)
    }

    onFileItemSelect(e, item) {
        this.seletectedItems.push(item)
    }

    searchInputChange() {
        var searchValue = this.refs.input_search.value;
        this.search.title = searchValue;
        this.props.fetchProjectFiles(this.props.project_id, {
            search : searchValue,
            search_catid : this.search.catid
        });
    }

    onTreeItemClick(e, data) {
        this.search.catid = data.id;
        this.props.fetchProjectFiles(this.props.project_id, {
            search : this.search.title,
            search_catid : data.id
        });
        // console.log(data)
    }

    renderList(items) {
        return items.map((item) => {
            console.log(item.project_file_version_latest)
            return (
                <li className="list-group-item" key={item.id}>

                   <div className="d-table w100">
                        <div className="d-table-cell xs-d-block w20 xs-w100 valign-middle">
                            <h4 className="list-group-item-heading">
                                {   item.project_file_version_latest ?
                                    item.project_file_version_latest.file_displayname
                                    : ''
                                }

                                <input type="checkbox" className="pull-right" onChange={(e)=>this.onFileItemSelect(e, item)} />
                            </h4>
                        </div>
                        
                    </div>
                </li>
            );
        });
    }
  
    render() {
        // if (jQuery.isEmptyObject(this.props.projectFiles)) return false;
        const data = this.props.projectFiles;

        return (
            <div className="comp-projectfilebrowseform">
                <div className="modal-header">
                    <h4 className="modal-title">Select From Existing Files</h4>
                </div>
                

                <div className="content-area">
                    <div className="d-table w100">
                        <div className="d-table-cell w30">
                            <CategoryTree2 project_id={this.props.project_id} object_type={'file'} showControls={false} onItemClick={this.onTreeItemClick.bind(this)} />
                        </div>
                        <div className="d-table-cell pl20">
                            <div className="searchbar">
                                <input type="text" className="w100 pl5" ref="input_search" placeholder="Search" onChange={()=>this.searchInputChange()} />
                            </div>
                            <br/>
                            <ul className="list-group oy-scroll pr10 hp500">
                                {this.renderList(data)}
                            </ul>
                        </div>
                    </div>
                </div>


                <div className="modal-footer text-right">
                    <button type="button" className="btn btn-success" ref="btn_save" onClick={() => this.onFileItemsSelect()}>Select Files</button>
                </div>
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

const ProjectFileBrowseFormContainer = connectWithStore(ProjectFileBrowseForm, mapStateToProps, mapDispatchToProps)

export default ProjectFileBrowseFormContainer
