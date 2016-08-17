import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactDOM from 'react-dom'

import TagSelector from '../components/tag/TagSelectorContainer';
import TagSingle from '../components/tag/TagSingle';
import TagForm from '../components/tag/TagForm'

import DemoComp from '../components/DemoComp'

import DropdownCompanies from '../components/controls/DropdownCompanies'

import {store} from '../store/index.js';






export default class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags : {}
        }
    }
    componentDidMount() {
        // TagForm.showInPoup({})
        // console.log(store.getState().tags_reducer.taglist.tags);
    }

    onTagSelect = (tag) => {
        
        // console.log(e.target);
        // console.log(props.tags_reducer.selectedTags.tags);
        // ReactDOM.render(<TagSingle data={tag} />, this.refs.tags_wrapper);

        // jQuery(this.refs.tags_wrapper).append("sdfas");
    }

    render() {
        return (
          <div>
            Dashboard
             
            <TagSelector onTagSelect={this.onTagSelect}/>
            
          </div>
        )
    }

}
