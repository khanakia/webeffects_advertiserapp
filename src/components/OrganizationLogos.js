import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';

import Sidebar from './Sidebar'
import PagePanel from './PagePanel'

// import LogoForm from '../components/UploadPopupForm'
import {Auth} from '../helpers/auth.js'
import PopupHelper from '../helpers/helper_popup'


import {API_URL_UPLOAD_ORG_LOGO, API_URL_UPLOAD_ORG_FAVICON} from '../config.js'

class OrganizationLogos extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // this.props.fetchCompanies();
    }


    uploadLogo(e) {
        e.preventDefault();
        PopupHelper.showUploadImageControl({uploadUrl:API_URL_UPLOAD_ORG_LOGO, object_type: 'org', object_id: this.props.current_org.id, image: this.props.current_org.logo_url})
    }

    uploadFavicon(e) {
        e.preventDefault();
        PopupHelper.showUploadImageControl({uploadUrl:API_URL_UPLOAD_ORG_FAVICON, object_type: 'org', object_id: this.props.current_org.id, image: this.props.current_org.favicon_url})
    }

    render() {
        const { data } = this.props.current_org;
        var logoStyle = {
            backgroundImage: "url('" + this.props.current_org.logo_url + "')",
        }
        var faviconStyle = {
            backgroundImage: "url('" + this.props.current_org.favicon_url + "')",
        }
        return (
            <div>
                <PagePanel hasSidebar="false">
                    <div className="orgimagedata">
                        <div className="orglogo">
                            <div className="orgimage" style={logoStyle}></div>
                            <div className="changebutton">
                                <button className="btn btn-success" title="Change Logo" onClick={(e)=> this.uploadLogo(e)}>Change Logo</button>
                            </div>
                        </div>
                        <div className="orgfavicon">
                            <div className="orgimage" style={faviconStyle}></div>
                            <div className="changebutton">
                                <button className="btn btn-success" title="Change Logo" onClick={(e)=> this.uploadFavicon(e)}>Change Favicon</button>
                            </div>
                        </div>
                    </div>
                </PagePanel>
            </div>
        );
    }
}


export default OrganizationLogos;