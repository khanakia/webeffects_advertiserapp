import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link, hashHistory } from 'react-router'

import { Auth, ProjectMessageHelper, TagItemHelper } from '../helpers'
import PopupHelper from '../helpers/helper_popup'

// import Sidebar from './Sidebar'
// import PagePanel from './PagePanel'

import CategoryTree2 from './category/CategoryTree2'
// import CategoryForm from './category/CategoryForm'
// import CategoryManage from './category/CategoryManage'

import ProjectMessageForm from './project/ProjectMessageForm'
import {store} from '../store/index.js';
import { Provider } from 'react-redux';




import { ROOT_URL, API_URL, OBJECT_TYPE_MESSAGE } from '../config'

import TagSelector from './tag/TagSelectorContainer';
// import TagItemTitle from './tag/TagItemTitle';
import TagAddButton from './tag/TagAddButton';
import TagItemTitleMultiple from './tag/TagItemTitleMultiple';



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

    componentDidMount() {
        // this.addTagButtonClick()
    }


    componentDidUpdate() {
        ReactDom.render(
                <div>
                    {/*<button onClick={()=>CategoryManage.showInPoup({categoryList : this.props.categoryList, props: this.props, data_category_form: this.data_category_form })}>Manage Categories</button>*/}
                    <CategoryTree2 onUpdated={this.onTreeItemUpdated.bind(this)} onDeleted={this.onTreeItemDeleted.bind(this)} onItemClick={this.onTreeItemClick.bind(this)} selectedValue={this.props.location.query.catid} project_id={this.projectId} object_type={OBJECT_TYPE_MESSAGE}  />
                </div>,
                document.getElementById('childrenSidebar')
            );
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
        // const href = 'projects/'+this.projectId+'/messages/create'
        // hashHistory.push(href)
        PopupHelper.showProjectMessageForm({onDataUpdate:this.onDataUpdate.bind(this)})
    }

    editMessae(e, data) {
        // const href = 'projects/'+this.projectId+'/messages/create'
        // hashHistory.push(href)
        console.log("datadata", data)
        PopupHelper.showProjectMessageForm({data, onDataUpdate:this.onDataUpdate.bind(this)})
    }

    onDataUpdate() {

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

    addComment(e, data) {
        PopupHelper.showCommentForm({onDataUpdate:this.onDataUpdateComment.bind(this), object_type:OBJECT_TYPE_MESSAGE, object_id:data.id})
    }

    onDataUpdateComment() {

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


    // addTags(e, data) {
    //     console.log("sdfa")
    //     //    var uniq = 'id' + (new Date()).getTime();

    //     // Controls.showpopup({
    //     //     detach: true,
    //     //     message: '<div id="' + uniq + '"></div>',
    //     //     container_class: "w500",
    //     //     opacity: 0.5,
    //     //     blur: false,
    //     //     vertical: 'bottomedge',
    //     //     offsettop:0,
    //     //     type: 'tooltip',
    //     //     tooltipanchor: $(e.target),

    //     //     onopen: function(e) {
    //     //         var pid = (jQuery(e).attr('id'));
    //     //         this.renderTagSelector(uniq,2)
    //     //     }.bind(this)
    //     // });
    // }
    


    //## ADD TAGS FUNCTIONS =========================
    // addTagButtonClick() {
    //     var _this = this;
    //     $(document).on('click', '.a-addtags', function (event) {
    //         $(this).qtip({
    //             overwrite: false, // Don't overwrite tooltips already bound
              

    //             content: {
    //                 text: function(event, api) {
    //                     // var tooltip = api.elements.tooltip
    //                     // var id = api.elements.target.data('id');
    //                     // console.log(tooltip);
    //                     // api.elements.content.html('Loading...');
    //                     // Task.renderTagSelector(tooltip.attr('id'))
    //                     return '';
    //                 }
    //             },
    //             position: {
    //                 my: 'top right',
    //                 at: 'top right',
    //                 // container: $('div#main_layout')
    //             },

    //             show: {
    //                  event: event.type, // Use the same event type as above
    //                 ready: true, // Show immediately - important!
    //                  solo: true
    //             },
    //             hide: 'unfocus',
    //             style: 'qtip-light',
    //             events: {
    //                 show: function(event, api) {
    //                     console.log("shows");
    //                     var tooltip = api.elements.tooltip
    //                     var tooltip_id = tooltip.attr('id');
    //                     var object_id = api.elements.target.data('id');

    //                     _this.renderTagSelector(tooltip_id, object_id)

    //                 }.bind(this),
    //                 hide: function(event, api) {
    //                     var tooltip = api.elements.tooltip
    //                     var tooltip_id = tooltip.attr('id');
    //                     ReactDom.unmountComponentAtNode(document.getElementById(tooltip_id))
    //                     api.destroy(true);
    //                 }
    //             }



    //         });
    //     });
    // }

    // renderTagSelector(id,object_id) {
    //     // document.getElementById(id).innerHTML = '';
    //     ReactDom.render(
    //             <Provider store={store} key="provider">
    //                 <TagSelector onTagSelect={this.onTagSelect} object_id={object_id}/>
    //             </Provider>,
    //             document.getElementById(id));
    // }


    // onTagSelect = (tag) => {
    //     // console.log(this.props)
    //     // console.log(props.tags_reducer.selectedTags.tags);
    //     var data = {
    //         tag_id : tag.id,
    //         object_id : tag.object_id,
    //         object_type : OBJECT_TYPE_MESSAGE,
    //     }
    //     console.log(data)
    //     TagItemHelper.store(data).then((response) => {
    //         console.log('tag added');
    //         this.props.fetchProjectMessages(this.projectId);
    //     })
    // }


    // renderTags(tag_items) {
    //     if(undefined==tag_items) return false;
    //     return tag_items.map((item) => {
    //         return (
    //             <TagItemTitle data={item} key={item.id} onTagFormUpdated={this.onTagFormUpdated.bind(this)} onTagItemRemove={this.onTagItemRemove.bind(this)} />
    //         )
    //     });
    // }

    // onTagFormUpdated(data) {
    //     this.props.fetchProjectMessages(this.projectId);
    // }

    // onTagItemRemove() {
    //     this.props.fetchProjectMessages(this.projectId);
    // }



    fetchDataTag() {
        this.props.fetchProjectMessages(this.projectId);
    }


    renderCategoryBadges(categories) {
        if(undefined==categories) return false;
        return categories.map((category) => {
            return (
                <span key={category.id} className="label label-success ml10">{category.category_name}</span>
            )
        });
    }


    renderList(items) {
        return items.map((item) => {
            if(this.checkCategoryExists(item.categories)==false) return;
            const {created_by_user} = item;
            return (
                <li className="list-group-item" key={item.id}>
                    
                    <div className="d-table w100">
                        <div className="d-table-cell xs-d-block w15 xs-w100">
                            <div className="userInfoBlock">
                                <div className="image d-inline-block valign-middle mr20">
                                    <div className="avatar" style={{backgroundImage: "url('"+created_by_user.profile_image_url+"')"}}>
                                    </div>
                                </div>
                                <div className="summary d-inline-block">
                                    <div className="title fw-b">{created_by_user.user_id} {created_by_user.fullname}</div>
                                </div>
                            </div>
                        </div>

                        <div className="d-table-cell xs-d-block w50 xs-w100 pr20 valign-middle">
                            <h4 className="list-group-item-heading">
                                {item.id} 
                                <Link to={'projects/'+this.projectId+'/messages/'+item.id}>{item.message_title}</Link><br/>
                                
                                
                            </h4>
                            <div className="fs12">
                                <div dangerouslySetInnerHTML={{__html: item.excerpt}} />

                                <div className="mt10">
                                    {/*{this.renderTags(item.tag_items)}*/}
                                    <TagItemTitleMultiple data={item.tag_items} fetchData={this.fetchDataTag.bind(this)} />
                                </div>
                            </div>
                        </div>
                        
                        <div className="d-table-cell xs-d-block w15 xs-w100 valign-middle">
                            {this.renderCategoryBadges(item.categories)}
                        </div>

                        <div className="d-table-cell xs-d-block w10 xs-w100 valign-middle">
                            {item.created_at}
                        </div>
                        <div className="d-table-cell xs-d-block valign-middle text-right">
                            <span className="icons-group light">
                                <button className="btn btn-plain" title="View" onClick={(e)=> this.showMessae(e, item)} ><i className="fa fa-eye"></i></button>
                                <button className="btn btn-plain" title="Edit" onClick={(e)=> this.editMessae(e, item)} ><i className="fa fa-pencil"></i></button>
                                <button className="btn btn-plain" title="Edit" onClick={(e)=> this.deleteMessage(e, item)} ><i className="fa fa-trash"></i></button>
                                <button className="btn btn-plain" title="Add Comment" onClick={(e)=> this.addComment(e, item)} ><i className="fa fa-comment"></i></button>
                                {/*<button className="btn btn-plain a-addtags" title="Tags" data-id={item.id} ><i className="fa fa-tags"></i></button>*/}
                                <TagAddButton object_type={OBJECT_TYPE_MESSAGE} object_id={item.id} fetchData={this.fetchDataTag.bind(this)} strip_tags={item.tags} />
                            </span>
                        </div>
                    </div>
                </li>
            );
        });
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
