import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';


import PagePanel from './PagePanel'
import TagForm from './tag/TagForm'

import * as Helpers from '../helpers'

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


    editTag(data, e) {
        e.preventDefault()
        TagForm.showInPoup({data})
        
    }

    deleteTag(data, e) {
        e.preventDefault();
        $.confirm({
            title: '',
            content: 'Are you sure you want to remove ?',
            confirmButton: 'Yes',
            cancelButton: 'No',
            confirm: function(){
                Helpers.Tag.delete(data.id).then((response) => {
                    this.props.fetchTags();
                });
            }.bind(this)
        });
    }

    renderTags(tags) {
        return tags.map((tag) => {
            return (
                <span key={tag.id} className="tag" style={{backgroundColor: tag.tag_color}}>
                    <a href="#" onClick={(e)=> this.editTag(tag,e)} >{tag.tag_title}</a>
                    <a href="#" className="ml10" onClick={(e)=> this.deleteTag(tag,e)} ><i className="fa fa-trash"></i></a>
                </span>
            );
        });
    }


    render() {
        
        
        const { data } = this.props.tagsList;
        
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
                                    <button className="btn btn-success" onClick={()=> TagForm.showInPoup({}, {},this.props)}>Add New Tag</button>
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
