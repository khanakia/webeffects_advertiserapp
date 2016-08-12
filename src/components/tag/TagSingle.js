import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import TagHelper from '../../helpers/helper_tag.js'
import TagColorInput from './TagColorInput'
import TagForm from './TagForm'
import {store} from '../../store/index.js';


class TagSingle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : this.props.data
        }
    }

    
    static defaultProps = {
      
    }

    componentWillMount() {
   
    }

    componentDidMount() {
        // console.log(store.getState().tags_reducer.taglist.tags);
    }

     onTagUpdated = (tag) => {
        
        // console.log(e.target);
        console.log('bbbb',tag);
        this.setState({data: tag})
        

        // jQuery(this.refs.tags_wrapper).append("sdfas");
    }

    editTag(e) {
        e.preventDefault()
        TagForm.showInPoup({settings: {is_new : false}, data: this.state.data ,props : this.props, onTagUpdated: this.onTagUpdated})
        
    }

    removeTag(e) {
        e.preventDefault()
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
    }

    render() {
        const { data } = this.state;
        
        return (
            <div className="TagSingle">
                <span style={{backgroundColor: data.tag_color}}>
                    <a key={data.id} href="#" className="tag" onClick={(e)=> this.editTag(e)}>{data.tag_title}</a>
                    <a href="#" className="remove" onClick={(e)=> this.removeTag(e)}>x</a>
                </span>

            </div>
        );
    }
}


export default TagSingle;
