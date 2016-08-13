import React, { Component } from 'react';
import { Link } from 'react-router';

import Sidebar from './Sidebar'
import PagePanel from './PagePanel'
import OrganizationAdd from './OrganizationAdd'

import OrgForm from './org/OrgForm'

import DomainForm from './org/DomainSubdomainForm'

import Auth from '../helpers/auth.js'


class PostsList extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        // console.log(Auth.getOrgID());
        this.props.fetchOrgs();
        // let { dispatch } = this.props
        // dispatch({type: 'RESET_POSTS'});
        // this.props.dispatch({type: 'REMOVE'});
    }

    renderPosts(orgs) {
        return orgs.map((org) => {
            return (
                <li className="list-group-item" key={org.id}>
                    <h4 className="list-group-item-heading">
                            {org.org_title}
                    </h4>

                    <span className="controls icons-group">
                        <button className="btn btn-link" title="Edit" onClick={(e)=> this.editOrg(org,e)} ><i className="fa fa-pencil"></i></button>
                        <a href="javascript:void(0);" title="Edit Domain" onClick={(e)=> this.addDomainInfo(org, e)}><i className="fa fa-link"></i></a>
                        <a href="#" title="Add/Edit Users"><i className="fa fa-users"></i></a>
                    </span>
                </li>
            );
        });
    }

    onDataUpdate(data) {
        console.log('onDataUpdate', data);
    }

    editOrg(data, e) {
        OrgForm.showInPoup({data})
    }

    addDomainInfo(data, e) {
        DomainForm.showInPoup({data})
    }

    render() {
        const { data } = this.props.orgsList;

        
        return (
            <div>
                <Sidebar>
                    <h3>Current Organization</h3>
                    <h4>Name</h4>
                    {this.props.state.org.current.data.org_title}
                    <h4>Subdomain</h4>
                    {this.props.state.org.current.data.org_slug}
                    <h4>Domain</h4>
                    {this.props.state.org.current.data.org_domain ? this.props.state.org.current.data.org_domain : 'N/A'}
                </Sidebar>
                <PagePanel hasSidebar="true">
                    <div className="control-toolbar1">
                        <div className="left">
                            <span className="title">Organizations</span>
                        </div>
                        <div className="middle">
                        </div>
                        <div className="right">
                            <span className="pull-right">
                                <span className="col mr10">
                                    
                                </span>
                                <span className="col icons-group">
                                    <button className="btn btn-plain" onClick={()=> OrgForm.showInPoup({}, {},this.props)}><i className="fa fa-plus"></i></button>
                                </span>
                            </span>    
                        </div>
                    </div>
                    <div className="mt20">
                        

                        <ul className="list-group style1">
                            {this.renderPosts(data)}
                        </ul>
                    </div>


                </PagePanel>
            </div>

        );
    }
}


export default PostsList;
