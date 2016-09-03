import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';

import PagePanel from './PagePanel'
import TagForm from './tag/TagForm'

import { TagHelper } from '../helpers'
import PopupHelper from '../helpers/helper_popup'


class TagList extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
       this.props.fetchTags();
       // TagForm.showInPoup({}, {} ,this.props)
    }

    componentDidMount() {
        // $('#tag_color').colorpicker({
        //     parts:          'draggable',
        //     showNoneButton: true,
        //     alpha:          true
        // });
    }


    editTag(e, data) {
        e.preventDefault()
        PopupHelper.showTagForm({data, is_new: false})
        
    }

    deleteTag(data, e) {
        e.preventDefault();
        $.confirm({
            title: '',
            content: 'Are you sure you want to remove ?',
            confirmButton: 'Yes',
            cancelButton: 'No',
            confirm: function(){
                TagHelper.delete(data.id).then((response) => {
                    this.props.fetchTags();
                });
            }.bind(this)
        });
    }

    renderTags(tags) {
        return tags.map((tag) => {
            return (
                <span key={tag.id} className="tag" style={{borderColor: tag.tag_color}}>
                    <a href="#" onClick={(e)=> this.editTag(e, tag)} >{tag.tag_title}</a>
                    <a href="#" className="ml10" onClick={(e)=> this.deleteTag(tag,e)} ><i className="fa fa-times"></i></a>
                </span>
            );
        });
    }


    render() {
        
        
        const data = this.props.tagsList;
        
        return (
            <div>
                <PagePanel>
                    <div className="control-toolbar1">
                        <div className="left">
                            <span className="title">Tags</span>
                        </div>
                        <div className="middle">
                        </div>
                        <div className="right">
                            <span className="pull-right">
                                <span className="col mr10">
                                    
                                </span>
                                <span className="col icons-group">
                                    <button className="btn btn-green-bordered" onClick={()=> PopupHelper.showTagForm({})}><i className="fa fa-plus"></i> Create new tag</button>
                                </span>
                            </span>    
                        </div>
                    </div>
                    <div className="mt20">
                        <div className="tags-wrapper">
                            {this.renderTags(data)}
                        </div>
                    </div>
                </PagePanel>
            </div>
        );
    }
}

export default TagList;
