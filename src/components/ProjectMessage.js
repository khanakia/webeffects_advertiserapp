import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link, hashHistory } from 'react-router'


import { Auth, ProjectMessageHelper } from '../helpers'

// import Sidebar from './Sidebar'
// import PagePanel from './PagePanel'

// import CategoryTree1 from './category/CategoryTree1'
// import CategoryForm from './category/CategoryForm'
// import CategoryManage from './category/CategoryManage'

// import ProjectMessageForm from './project/ProjectMessageForm'


class ProjectMessage extends Component {
    constructor(props) {
        super(props);

        this.projectId = this.props.params.projectId

    }

    componentWillMount() {

    }

    componentDidUpdate() {
       
    }

  
   
    render() {
        if (jQuery.isEmptyObject(this.props.projectMessages)) return false;
        const data = this.props.projectMessages;
        return (
            <div>
                
                <div className="control-toolbar1">
                    <div className="left">
                        <span className="title">Messages</span>
                    </div>
                    <div className="middle">
                    </div>
                    <div className="right">
                        <span className="pull-right">
                            <span className="col mr10">
                                
                            </span>
                            <span className="col icons-group">
                                <button className="btn btn-success" onClick={()=> ProjectMessageForm.showInPoup({}, {},this.props)}><i className="fa fa-plus"></i></button>
                            </span>
                        </span>    
                    </div>
                </div>
                <div className="mt20">
                  
                </div>
            </div>
        );
    }
}


export default ProjectMessage;
