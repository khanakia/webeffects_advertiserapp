/* This is component is to use when we need to add tag to Insert Form like TaskForm
 *
*/
import React, { Component } from 'react';

import TagSelectorButton from './TagSelectorButton'
import TagTitle from './TagTitle'

class TagSelectorInput extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            tags_selected : this.props.tags_selected
        }
    }

    static defaultProps = {
       tags_selected : []
    }

    componentWillMount() {
    }

    componentDidMount() {
        
    }

    
    onTagSelect = (tag) => {
       this.setState({
            tags_selected : this.state.tags_selected.concat(tag)
       })

       // console.log(this.state.tags_selected)
    }


    tagDeleteCallback(data) {
        const newTags = _.filter(this.state.tags_selected, function(item) {
            return !(item.id==data.id)
        })
        this.setState({
            tags_selected : newTags
       })
    }

    renderTags(tags) {
        if(undefined==tags) return false;
        return tags.map((item) => {
            return (
                <TagTitle data={item} key={item.id} is_soft_delete={true} deleteCallback={this.tagDeleteCallback.bind(this)} />
            )
        });
    }


    render() {
        const data = this.state.tags_selected
        // console.info('data', data)
        return (
            <span className="comp_TagSelectorInput">
                {this.renderTags(data)}

                <TagSelectorButton onTagSelect={this.onTagSelect.bind(this)} strip_tags={this.state.tags_selected} />
                Add Tag
            </span>
        );
    }
}


export default TagSelectorInput;