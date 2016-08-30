/*
 * This Component is just to Render TagItemTitle in a Loop so we will pass multiple tags to this component and it will loop and create TagItemTitle
   We Using it on Task, Files , Messages to render Tags
*/
import React, { Component } from 'react';
import TagItemTitle from './TagItemTitle';

class TagItemTitleMultiple extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        fetchData: function() { },

        data : [],
    }

    componentWillMount() {
    }

    componentDidMount() {
    
    }

    renderTags(tag_items) {
        if(undefined==tag_items) return false;
        return tag_items.map((item) => {
            return (
                <TagItemTitle data={item} key={item.id} onTagFormUpdated={this.onTagFormUpdated.bind(this)} onTagItemRemove={this.onTagItemRemove.bind(this)} />
            )
        });
    }

    onTagFormUpdated(data) {
        this.props.fetchData();
    }

    onTagItemRemove() {
        this.props.fetchData()
    }



    render() {
        const data = this.props.data
        return (
            <span className="comp_tag_item_title_multiple">
                {this.renderTags(data)}
            </span>
        );
    }
}


export default TagItemTitleMultiple;