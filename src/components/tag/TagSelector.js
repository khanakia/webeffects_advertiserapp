import React, { Component } from 'react';
import ReactDom from 'react-dom';

import TagHelper from '../../helpers/helper_tag.js'
import TagColorInput from './TagColorInput'

/*
    HOW TO USE

    onTagSelect = (tag) => {
        console.log(tag);
    }
    <TagSelector onTagSelect={this.onTagSelect}/>
*/

class TagSelector extends Component {
    constructor(props, context) {
        super(props, context);
        console.log(context.store)
    }

    
    static defaultProps = {

        // Will give tag as json data on new tag create or tag select by click tag link
        onTagSelect: function(tag, props) { return '';  },

        // This is to determine which object id was clicked so we can pass that back in callback
        object_id : '',
        // data : {
        //     tag_id : '',
        //     object_type : '',
        // }
    }


    componentWillMount() {
        this.props.fetchTags();
        this.tag_color = '#A0522D';
    }

    componentDidMount() {
        
    }


    inputChange = (e) => {
        let tag_title = e.target.value;
        this.props.filterTags({
            'tag_title' : tag_title
        })
        // console.log(tag_title);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let tag_title = (this.refs.input_add_tag.value);
        let tag_color = this.tag_color;
        // console.log(this.tag_color);
        
        let data = {
            'tag_title' : tag_title,
            'tag_color' : tag_color
        }
        
        var ajaxObj = TagHelper.store(data);
        ajaxObj.then(function(response){
            console.log(response.data);
            // this.tagSelected(response.data.tag)
            var tag = response.data.tag;
            tag.object_id = this.props.object_id;
            this.props.onTagSelect(tag)
            this.props.fetchTags();
        }.bind(this));

        // return false;
    }

    tagClick = (e, tag) => {
        e.preventDefault();
        // this.tagSelected(tag)
        tag.object_id = this.props.object_id;
        this.props.onTagSelect(tag)
    }

    // tagSelected = (tag) => {
    //     // this.props.selectTag(tag)
    //     this.props.onTagSelect(tag)
    //     // setTimeout(() => {this.props.onTagSelect(tag, this.props)   }, 1000)
    // }

    tagColorInputValueChange(color) {
        this.tag_color = color;
    }



    renderTags(tags) {
        return tags.map((tag) => {
            return (
                <li key={tag.id}>
                    <a href="#" className="tag"  onClick={(e)=> this.tagClick(e, tag)}>
                        <i className="fa fa-dot-circle-o" style={{color: tag.tag_color}}></i>{tag.tag_title}
                    </a>
                </li>
            );
        });
    }

   
    renderCreateTag() {
        if(this.props.tagList.length==0) {

            if(this.props.current_org.tags_lock_to_admin && !this.props.current_org.permissions.org_can_update) {
                return (
                    <h5 className="ml10">No Tags Found. </h5>
                )
            } else {
                return (
                    <div className="creatTag p20">
                            <label>Select Color</label>
                            <TagColorInput onValueChange={(color) => {this.tagColorInputValueChange(color)}}/>
                            <br/>
                            <button className="btn btn-success" onClick={(e)=> this.handleSubmit(e)}>Create Tag</button>
                    </div>
                )
            }
        }
    }

    

    render() {
        // const { tags } = this.props.tags_reducer.taglist;
        const data = this.props.tagList;
        // console.log('tags', tags);
        
        return (
            <div className="comp-tag-selector">
                <input type="text" placeholder="Add Tag" ref="input_add_tag" onChange={(e) => this.inputChange(e)} />
                {this.renderCreateTag()}

                <ul className="tags-list">
                   {this.renderTags(data)}
                </ul>
            </div>
        );
    }
}


export default TagSelector;
