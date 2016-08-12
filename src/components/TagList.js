import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';


import PagePanel from './PagePanel'
import TagForm from './tag/TagForm'

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
        TagForm.showInPoup({is_new : false}, data ,this.props)
        
    }

    renderTags(tags) {
        return tags.map((tag) => {
            return (
                <a key={tag.id} href="#" className="tag" style={{backgroundColor: tag.tag_color}} onClick={(e)=> this.editTag(tag,e)} >{tag.tag_title}</a>
            );
        });
    }


    render() {
        
        const { tags } = this.props.tags_reducer.taglist;
        // console.log(tags);
        return (
            <div>
                <PagePanel>
                    <div className="heading-bar">
                        <h2 className="pull-left">Tags</h2>
                        <div className="pull-right">
                            <button className="btn btn-success" onClick={()=> TagForm.showInPoup({}, {},this.props)}>Add New Tag</button>
                        </div>
                    </div>
                    <div className="tags-wrapper">
                       {this.renderTags(tags)}
                    </div>
                </PagePanel>
            </div>
        );
    }
}

export default TagList;
