import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';

import Sidebar from './Sidebar'
import PagePanel from './PagePanel'

import CompanyForm from './org/CompanyForm'

import {Auth, Util, CompanyHelper} from '../helpers'
import PopupHelper from '../helpers/helper_popup'
import {API_URL_UPLOAD_COMPANY_LOGO} from '../config.js'


class OrganizationCompanies extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchCompanies();
        // let { dispatch } = this.props
        // console.log(dispatch);

    }

    editButton(item) {
        // console.log(item.permissions.is_admin || item.created_by_user_id==Auth.getUserID());
        if(this.props.current_org.permissions.org_can_update) {
            return (
                <span>
                    <button className="btn btn-plain" title="Edit" onClick={(e)=> this.editCompany(item,e)} ><i className="fa fa-pencil"></i></button>
                </span>
            )
        }
    }

    deleteButton(item) {
        if(!item.is_default && this.props.current_org.permissions.org_can_update) {
            return (
                <span>
                    <button className="btn btn-plain" title="Remove Company" onClick={(e)=> this.deleteCompany(item.id,e)} ><i className="fa fa-trash"></i></button>
                </span>
            )
        }
    }

    defautlBadge(item) {
        if(item.is_default && item.created_by_user_id==Auth.getUserID()) {
            return (
                <span className="label label-success">Default</span>
            )
        }
    }

    editCompany(e, data) {
        e.preventDefault()
        PopupHelper.showCompanyForm({data, is_new : false})
    }


    deleteCompany(e, company_id) {
        e.preventDefault()
        $.confirm({
            title: '',
            content: 'Are you sure you want to remove ?',
            confirmButton: 'Yes',
            cancelButton: 'No',
            confirm: function(){
                CompanyHelper.delete(company_id).then((response) => {
                    this.props.fetchCompanies();
                });
            }.bind(this)
        });
    }

    uploadLogo(e, item) {
        e.preventDefault();
        PopupHelper.showUploadImageControl({uploadUrl:API_URL_UPLOAD_COMPANY_LOGO, object_type: 'company', object_id: item.id, image: item.company_logo_url})
    }

    renderItems(items) {
        return items.map((item) => {
            return (
                <li className="" key={item.id}>
                    <div className="d-table w100 inner">
                        <div className="d-table-cell xs-d-block w30 xs-w100 valign-middle">
                            <div className="userInfoBlock">
                                <div className="image d-inline-block valign-middle mr20">
                                    <div className="avatar" style={{backgroundImage: "url('" + item.company_logo_url + "')"}}>
                                    </div>
                                </div>
                                <div className="summary d-inline-block valign-middle">
                                    <div className="company fw-b">{item.company_title}</div>
                                    {Util.badgetDefault(item)}
                                </div>
                            </div>
                        </div>
                        <div className="d-table-cell xs-d-block xs-mt20 w30 xs-w100 valign-middle contact_info">
                            <h4 className="list-group-item-heading">
                                { item.company_website ?
                                    <span className="d-block fs12 mb5"><i className="fa fa-envelope w10p"></i><a href={"mailto:"+item.company_website}>{item.company_website}</a></span>
                                    : ''
                                }

                                { item.company_email ?
                                    <span className="d-block fs12 mb5"><i className="fa fa-envelope w10p"></i><a href={"mailto:"+item.company_email}>{item.company_email}</a></span>
                                    : ''
                                }    
                                
                                { item.company_phone ?
                                    <span className="d-block fs12 mb5"><i className="fa fa-phone w10p fs14"></i>{item.company_phone}</span>
                                    : ''
                                }    
                                
                                { item.company_fax ?
                                    <span className="d-block fs12 mb5"><i className="fa fa-fax w10p"></i>{item.company_fax}</span>
                                    : ''
                                }
                                
                            </h4>
                        </div>
                        <div className="d-table-cell xs-d-block xs-mt20 w20 xs-w100 valign-middle">
                            <h4 className="list-group-item-heading">
                                <span className="d-block fs12 mb5 lh-15p">
                                {item.company_address_line1 ? <span>{item.company_address_line1}<br/></span> : ''}
                                {item.company_address_line2 ? <span>{item.company_address_line2}<br/></span> : ''}
                                {item.company_city ? <span>{item.company_city} {item.company_zipcode} {item.company_state} <br/></span> : ''}
                                {item.company_country}
                                </span>
                            </h4>
                        </div>

                        <div className="d-table-cell xs-d-block w10 xs-w100">
                                
                        </div>
                        <div className="d-table-cell xs-d-block valign-middle text-right">
                            <span className="icons-group light">
                                {/*<button className="btn btn-plain" title="Upload Logo" onClick={(e)=> this.uploadLogo(e, item)} ><i className="fa fa-picture-o"></i></button>
                                                                {this.editButton(item)}
                                                                {this.deleteButton(item)}*/}
                                <div className="dropdown d-inline-block">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"><i className="fa fa-ellipsis-h"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li><a href="#" onClick={(e) => this.editCompany(e, item)}>Edit Company</a></li>
                                        <li><a href="#" onClick={(e) => this.deleteCompany(e, item.id)}>Delete Company</a></li>
                                        <li><a href="#" onClick={(e)=> this.uploadLogo(e, item)}>Upload Logo</a></li>

                                    </ul>
                                </div>
                            </span>
                        </div>

                    </div>
                    
                </li>
            );
        });
    }

    render() {
        const { data } = this.props.companiesList;
        
        return (
            <div>
                <PagePanel>
                    <div className="control-toolbar1">
                        <div className="left">
                            <div className="filter-header-input-wrap">
                                <input placeholder="Find company" className="filter-header-input" defaultValue=""/>
                            </div>
                        </div>
                        <div className="middle">
                        </div>
                        <div className="right">
                            <span className="pull-right">
                                <span className="col mr10">
                                    
                                </span>
                                <span className="col icons-group">
                                { this.props.current_org.permissions.org_can_update ?
                                    <button className="btn btn-green-bordered" onClick={()=> PopupHelper.showCompanyForm({})}><i className="fa fa-plus"></i>Add new company</button>
                                    : ''
                                }
                                </span>
                            </span>    
                        </div>
                    </div>
                    <div className="mt20">
                        

                        <ul className="list-group-company">
                            {this.renderItems(data)}
                        </ul>
                    </div>
                </PagePanel>
            </div>
        );
    }
}


export default OrganizationCompanies;
