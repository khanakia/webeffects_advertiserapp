import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';

import Sidebar from './Sidebar'
import PagePanel from './PagePanel'

import LogoForm from '../components/UploadPopupForm'
import Auth from '../helpers/auth.js'

import Util from '../helpers/util'
import Localstore from '../helpers/localstore'
import {API_HOST_ORGS_IMAGES, API_URL_ORG_LOGO, API_URL_ORG_FAVICON} from '../config.js'

class OrganizationLogos extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // this.props.fetchCompanies();
    }

    openPopuplogo(data, uploadurl, e) {
        LogoForm.showInPoup(data,uploadurl,0);
        return false;
    }

    render() {
        const { data } = this.props.current_org;
        var logoStyle = {
            backgroundImage: 'url('+API_HOST_ORGS_IMAGES+this.props.current_org.org_logo+')',
        }
        var faviconStyle = {
            backgroundImage: 'url('+API_HOST_ORGS_IMAGES+this.props.current_org.org_favicon+')',
        }
        return (
            <div>
                <Sidebar>Sidebar</Sidebar>
                <PagePanel hasSidebar="true">
                    <div className="orgimagedata">
                        <div className="orglogo">
                            <div className="orgimage" style={logoStyle}></div>
                            <div className="changebutton">
                                <button className="btn btn-success" title="Change Logo" onClick={(e)=> this.openPopuplogo(this.props.current_org, API_URL_ORG_LOGO, e)}>Change Logo</button>
                            </div>
                        </div>
                        <div className="orgfavicon">
                            <div className="orgimage" style={faviconStyle}></div>
                            <div className="changebutton">
                                <button className="btn btn-success" title="Change Logo" onClick={(e)=> this.openPopuplogo(this.props.current_org, API_URL_ORG_FAVICON, e)}>Change Favicon</button>
                            </div>
                        </div>
                    </div>
                </PagePanel>
            </div>
        );
    }
}


export default OrganizationLogos;