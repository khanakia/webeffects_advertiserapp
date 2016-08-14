import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactDOM from 'react-dom'

import Sidebar from '../components/Sidebar'
import PagePanel from '../components/PagePanel'

import LogoForm from '../components/UploadPopupForm'

import {ROOT_URL, API_URL_ORG_LOGO} from '../config.js'

export default class LayoutUpload extends Component {

    static defaultProps = {
        onDataUpdate: function(org) {},

        data : {
            id: '',
            url: '',
        }
    }

    openPopuplogo() {
        LogoForm.showInPoup();
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
