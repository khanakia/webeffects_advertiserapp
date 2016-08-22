import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link, hashHistory } from 'react-router'

import { Auth, ProjectMessageHelper } from '../helpers'

// import Sidebar from './Sidebar'
// import PagePanel from './PagePanel'

import CategoryTree2 from './category/CategoryTree2'
// import CategoryForm from './category/CategoryForm'
// import CategoryManage from './category/CategoryManage'

import ProjectMessageForm from './project/ProjectMessageForm'
import {store} from '../store/index.js';


class ProjectMessages extends Component {
    constructor(props, context) {
        super(props, context);

        this.projectId = this.props.params.projectId

        this.data_category_form = {
            object_type: "message",
            project_id : this.projectId
        }
    }

    componentWillMount() {
        this.props.fetchProjectMessages(this.projectId);
    }

    componentDidUpdate() {
        ReactDom.render(
                <div>
                    {/*<button onClick={()=>CategoryManage.showInPoup({categoryList : this.props.categoryList, props: this.props, data_category_form: this.data_category_form })}>Manage Categories</button>*/}
                    <CategoryTree2 onUpdated={this.onTreeItemUpdated.bind(this)} onDeleted={this.onTreeItemDeleted.bind(this)} onItemClick={this.onTreeItemClick.bind(this)} selectedValue={this.props.location.query.catid} project_id={this.projectId} object_type={'message'}  />
                </div>,
                document.getElementById('childrenSidebar')
            );
    }

    renderList(items) {
        return items.map((item) => {
            if(this.checkCategoryExists(item.categories)==false) return;
            return (
                <li className="list-group-item" key={item.id}>

                   <div className="d-table w100">
                        <div className="d-table-cell xs-d-block w20 xs-w100 valign-middle">
                            <h4 className="list-group-item-heading">
                                {item.id} 
                                <Link to={'projects/'+item.id+'/overview'}>{item.message_title}</Link><br/>
                                
                            </h4>
                        </div>
                        <div className="d-table-cell xs-d-block w60 xs-w100 valign-middle">
                            {item.message_body}
                        </div>
                        <div className="d-table-cell xs-d-block w10 xs-w100 valign-middle">
                            {this.renderCategoryBadges(item.categories)}
                        </div>
                        <div className="d-table-cell xs-d-block valign-middle text-right">
                            <span className="icons-group light">
                                <button className="btn btn-plain" title="Edit" onClick={(e)=> this.showMessae(e, item)} ><i className="fa fa-eye"></i></button>
                                <button className="btn btn-plain" title="Edit" onClick={(e)=> this.deleteMessage(e, item)} ><i className="fa fa-trash"></i></button>
                            </span>
                        </div>
                    </div>
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


    createMessae(e) {
        const href = 'projects/'+this.projectId+'/messages/create'
        hashHistory.push(href)
    }

    showMessae(e, item) {
        // ProjectMessageForm.showInPoup({data})

        var location = {
            pathname : this.props.location.pathname + '/' + item.id ,
        } 
        hashHistory.push(location)
    }

    deleteMessage(e, item) {
        $.confirm({
            title: '',
            content: 'Are you sure you want to remove ?',
            confirmButton: 'Yes',
            cancelButton: 'No',
            confirm: function(){
                ProjectMessageHelper.delete(item.id).then((response) => {
                    this.props.fetchProjectMessages(this.projectId);
                });
            }.bind(this)
        });
    }


    // onTreeChange(e, data) {
    //     // console.log(e)
    //     // const selected_value = data.selected[0];
    //     const selected_value = data.node.id;

    //     var location = {
    //         pathname : this.props.location.pathname,
    //         query : {
    //             'catid' : selected_value
    //         }
    //     } 
    //     hashHistory.push(location)
    // }

    // onNodeSelected(event, node) {
    //     const selected_value = node.id;
    //     var query = '';
    //     if(selected_value) {
    //         query  = {
    //             'catid' : selected_value
    //         }
    //     }
        
    //     var location = {
    //         pathname : this.props.location.pathname,
    //         query : query
    //     } 
    //     hashHistory.push(location)
    // }

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
        this.props.fetchProjectMessages(this.projectId);
    }

    onTreeItemUpdated(data) {
        console.log("updateddata", data)
        this.props.fetchProjectMessages(this.projectId);
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
                                <button className="btn btn-success" onClick={(e)=> this.createMessae(e)}><i className="fa fa-plus"></i></button>
                                
                            </span>
                        </span>    
                    </div>
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


export default ProjectMessages;
