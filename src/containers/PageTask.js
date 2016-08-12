import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactDOM from 'react-dom'

import Sidebar from '../components/Sidebar'
import PagePanel from '../components/PagePanel'

import DemoComp from '../components/DemoComp'

import {store} from '../store/index.js';

export default class PageTask extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        
$('#trumbowyg-demo').trumbowyg();
            
    }



    render() {
        return (
          <div>
                <Sidebar>
                    Sidebar
                </Sidebar>
                <PagePanel hasSidebar="true">
                   
                   <textarea id="trumbowyg-demo">
                 </textarea>

                </PagePanel>
          </div>
        )
    }

}
