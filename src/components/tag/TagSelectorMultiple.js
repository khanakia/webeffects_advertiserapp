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

class TagSelectorMultiple extends Component {
    constructor(props) {
        super(props);
    }

    
    static defaultProps = {

        // Will give tag as json data on new tag create or tag select by click tag link
        onTagSelect: function(tag) { return '';  },
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
            // console.log(response.data.tag);
            this.props.onTagSelect(response.data.tag)
            this.props.fetchTags();
        }.bind(this));

        // return false;
    }

    tagClick = (tag, e) => {
        e.preventDefault();
        this.props.onTagSelect(tag)
    }


    renderTags(tags) {
        return tags.map((tag) => {
            return (
                <li key={tag.id}>
                    <a href="#" className="tag"  onClick={(e)=> this.tagClick(tag, e)}>
                        <i className="fa fa-dot-circle-o" style={{color: tag.tag_color}}></i>{tag.tag_title}
                    </a>
                </li>
            );
        });
    }

    tagColorInputValueChange(color) {
        this.tag_color = color;
    }

    renderCreateTag() {
        if(this.props.tags.length==0) {
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

    

    render() {
        // const { tags } = this.props.tags_reducer.taglist;
        const { tags } = this.props;
        // console.log('tags', tags);
        
        return (
            <div className="comp-tag-selector">
               <input type="text" placeholder="Add Tag" ref="input_add_tag" onChange={(e) => this.inputChange(e)} />
                <ul className="tags-list">
                   {this.renderTags(tags)}
                </ul>

                {this.renderCreateTag()}
              


            </div>
        );
    }
}


export default TagSelectorMultiple;
