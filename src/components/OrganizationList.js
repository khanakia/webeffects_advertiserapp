import React, { Component } from 'react';
import { Link } from 'react-router';

import Sidebar from './Sidebar'
import PagePanel from './PagePanel'
// import OrganizationAdd from './OrganizationAdd'

import OrgForm from './org/OrgForm'
import DomainForm from './org/DomainSubdomainForm'

import * as Helper from '../helpers'
import PopupHelper from '../helpers/helper_popup'

class OrganizationList extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        // console.log(Auth.getOrgID());
        this.props.fetchOrgs();
        // let { dispatch } = this.props
        // dispatch({type: 'RESET_POSTS'});
        // this.props.dispatch({type: 'REMOVE'});
        // Helper.Auth.updateCurrentOrg()
    }


    editButton(org) {
        // console.log(org.permissions.is_admin || org.created_by_user_id==Auth.getUserID());
        // if(org.permissions.is_admin || org.created_by_user_id==Auth.getUserID()) {
        if(org.permissions.org_can_update) {
            return (
                <span>
                    <button className="btn btn-plain" title="Edit" onClick={(e)=> this.editOrg(org,e)} ><i className="fa fa-pencil"></i></button>
                    <button className="btn btn-plain" title="Edit Domain" onClick={(e)=> this.addDomainInfo(org, e)}><i className="fa fa-link"></i></button>
                </span>
            )
        }
    }



    // renderPosts(orgs) {
    //     return orgs.map((org) => {
    //         return (
    //             <li className="" key={org.id}>
    //                 <div className="d-table w100">
    //                     <div className="d-table-cell xs-d-block w80 xs-w100">
    //                         <h4 className="list-group-item-heading">
    //                             {org.name}
    //                         </h4>
    //                     </div>
    //                     <div className="d-table-cell xs-d-block w10 xs-w100">
    //                             {Helper.Util.badgetOwner((org.created_by_user_id==Helper.Auth.getUserID()))}
    //                             {Helper.Util.badgeIsAdmin(org.permissions.is_admin)}
    //                             {Helper.Util.badgetDefault(org)}
    //                     </div>
    //                     <div className="d-table-cell xs-d-block valign-middle text-right">
    //                         <span className="icons-group light">
    //                             {this.editButton(org)}
    //                             <a href={Helper.Org.getLoginURL(org)} className="btn btn-plain" title="Login in to this Organization"><i className="fa fa-sign-in"></i></a>
    //                         </span>
    //                     </div>
    //                 </div>
    //             </li>
    //         );
    //     });
    // }

    renderPosts(orgs) {
        return orgs.map((org) => {
            return (
                <li className="" key={org.id}>
                    <div className="inner">
                            <h4 className="list-group-item-heading">
                                {org.name}
                                <div className="dropdown d-inline-block">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"><i className="fa fa-chevron-down"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li><a href="#" onClick={(e)=> this.editOrg(org,e)}>Edit Organization</a></li>
                                        <li><a href="#" onClick={(e)=> this.leaveOrg(org, e)}>Leave Organization</a></li>

                                    </ul>
                                </div>
                            </h4>
                        
                        <div className="badges">
                                {Helper.Util.badgetOwner((org.created_by_user_id==Helper.Auth.getUserID()))}
                                {Helper.Util.badgeIsAdmin(org.permissions.is_admin)}
                                {Helper.Util.badgetDefault(org)}
                        </div>
                        {/*<div className="my20">
                                                    <span className="icons-group light">
                                                        {this.editButton(org)}
                                                        <a href={Helper.Org.getLoginURL(org)} className="btn btn-plain" title="Login in to this Organization"><i className="fa fa-sign-in"></i></a>
                                                    </span>
                                                </div>*/}

                        <div className="mt20">
                            <button type="button" className="btn btn-blue">Switch Organization</button>
                        </div>
                    </div>
                </li>
            );
        });
    }

    onDataUpdate(data) {
        console.log('onDataUpdate', data);
    }

    editOrg(data, e) {
        e.preventDefault();
        PopupHelper.showOrgForm({data, is_new: false})
    }

    addDomainInfo(data, e) {
        DomainForm.showInPoup({data})
    }

    render() {
        const { data } = this.props.orgsList;

        
        return (
            <div>
                
                <PagePanel>
                    <div className="control-toolbar1">
                        <div className="left">
                            <div className="filter-header-input-wrap">
                                <input placeholder="Find a organization" className="filter-header-input" defaultValue=""/>
                            </div>
                        </div>
                        <div className="middle">
                        </div>
                        <div className="right">
                            <span className="pull-right">
                                <span className="col mr10">
                                    
                                </span>
                                <span className="col icons-group">
                                    <button className="btn btn-green-bordered" onClick={()=> PopupHelper.showOrgForm({})}><i className="fa fa-plus"></i> Create new organization</button>
                                </span>
                            </span>    
                        </div>
                    </div>
                    <div className="mt20">
                        

                        <ul className="list-group-grid">
                            {this.renderPosts(data)}
                        </ul>
                    </div>


                </PagePanel>
            </div>

        );
    }
}


export default OrganizationList;
