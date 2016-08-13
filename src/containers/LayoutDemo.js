import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactDOM from 'react-dom'

import Sidebar from '../components/Sidebar'
import PagePanel from '../components/PagePanel'

import LogoForm from '../components/UploadPopupForm'

import {ROOT_URL} from '../config.js'

export default class LayoutUpload extends Component {

    openPopuplogo() {
        LogoForm.showInPoup()
        return false;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("pankaj");
        return false;
    }

    render() {
        return (
            <div>
                <Sidebar>
                    Sidebar
                </Sidebar>
                <PagePanel hasSidebar="true">
                    <div className="orglogoCt">
                        <div className="orglogoCt-inner">
                            <a href="javascript:void(0);" title="Add logo" onClick={this.openPopuplogo}><i className="fa fa-link"></i></a>
                        </div>
                    </div>
                </PagePanel>
            </div>
        )
    }
}
