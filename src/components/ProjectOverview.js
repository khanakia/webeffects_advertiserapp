import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router'

import ContentWrapper from './shared/ContentWrapper'
import {PROJECT_STATUSES, PROJECT_STATUSES_DROPDOWN_LIST} from '../config'
import {ProjectHelper, AccountHelper} from '../helpers'
import DropdownList from './DropdownList'
import InputSearch from './InputSearch'


class ProjectOverview extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isDesktop: true,
            project_status_id: null,
            project_title: null,
            page: 1
        }
    }

    componentDidMount() {
        this.props.fetchProjectFormdata()
        this.props.fetchProjects({
            project_status_id : this.state.project_status_id,
            project_title: this.state.project_title,
        })
        this._checkDesktopMobile()
        window.addEventListener('resize', (event) => {
            this._checkDesktopMobile()
        });

        this.paginationInit()
    }

     componentWillUpdate = (nextProps, nextState) => {        
        // console.log(this.state);
        // console.log(nextState);
        if(!_.isEqual(this.state, nextState)) {
            console.log("NOT EQUAL")
            this.props.fetchProjects({
                project_status_id : nextState.project_status_id,
                project_title: nextState.project_title,
                page: nextState.page
            })
        }

    }

     componentDidUpdate() {
        // this.props.fetchProjects({
        //     project_status_id : this.state.project_status_id,
        //     project_title: this.state.project_title,
        // })
        this.paginationInit()
    }

    paginationInit() {
        var _this = this;

        var $elem = jQuery('#project_overview_paginations_list');

        if($elem.data("twbs-pagination")){
            $elem.twbsPagination('destroy');
        }

        if(_this.props.project_list.total==0) return false;
        $elem.twbsPagination({
            initiateStartPageClick: false,
            totalPages: _this.props.project_list.last_page,
            visiblePages: 5,
            startPage: _this.props.project_list.current_page,
            // first: '<span aria-hidden="true">&laquo;</span>',
            // last: '<span aria-hidden="true">&raquo;</span>',
            firstClass: 'hidden',
            lastClass: 'hidden',
            prev: '<span aria-hidden="true">&laquo;</span>',
            next: '<span aria-hidden="true">&raquo;</span>',
            onPageClick: function (event, page) {            
                _this.onProjectPagination(page);
            }
        });
    }

    onProjectPagination = (page) => {
        this.setState({page: page});
    }

    _checkDesktopMobile() {
        var w = window.innerWidth;
        if(w<1200 && this.state.isDesktop) {
            this.setState({
                isDesktop: false
            })
        } else if(w>1200 && !this.state.isDesktop) {
            this.setState({
                isDesktop: true
            })
        }
    }
    
    handleDelete = (id) => {

        var _this = this;
        jQuery.confirm({
            title: trans.project_deletepoup_title,
            content: trans.project_deletepoup_content,
            closeIcon: true,
            columnClass: 'col-md-6 col-md-offset-3',
            buttons: {
                cancelAction: {
                    text: trans.project_deletepoup_cancel,
                    action: function () {
                        jQuery(".jconfirm").hide()
                        // hashHistory.push('/dashboard')
                    }
                },
                deleteAction: {
                    text: trans.project_deletepoup_delete,
                    action: function () {
                        ProjectHelper.updateStatus(id, Env.project_status.waiting_for_unpublish).then((response) => {
                            _this.props.fetchProjects()
                        })
                        jQuery(".jconfirm").hide()
                    }
                }
            }
        })

        // alert("Delete Function")
    }

    _renderFlagLink(project) {
        let flag = "be";
        if(project.site_id=3) {
            flag = "fr";
        }
        console.log(project);
        if(!project.related_project_id) return null;
        return (
            <div className="switch_flag_wrapper">
                <i onClick={()=>{AccountHelper.switch_site(project.related_project_id)}} className={"flag-ico-btn " + flag}></i>
                <button onClick={()=>{AccountHelper.switch_site(project.related_project_id)}} className="btn-plain">{trans.switch_flag_title}</button>
            </div>
        )
    }

   _renderMobile() {
        if(jQuery.isEmptyObject(this.props.project_list.data)) {
            return false
        }
        return (
            <div>
                <ul className="list-group list-group--projectoverview">
                    {this.props.project_list.data.map(function(item, index){
                        let status = PROJECT_STATUSES[item.project_status_id]

                        return (
                            <li className="list-group-item" key={index}>
                                <Link to={'/projects/'+item.id}>
                                    <i className={"fs22 mr20 valign-middle "+status.icon_class}></i>
                                    <span className="d-inline-block valign-middle">{item.project_title}</span>
                                    <i className="fa fa-angle-right pull-right fs18"></i>
                                </Link>
                            </li>
                        )}
                    )}
                </ul>
            </div>
        ) 

   }
    _renderDesktop() {
        if(jQuery.isEmptyObject(this.props.project_list.data)) {
            return false
        }
        return (
            <div className="table-wrapper-border">
                <table className="table table-bordered table--default table--projectoverview">
                    <thead>
                        <tr>
                            <th className="wp200">{trans.pageOverview_status}</th>
                            <th>{trans.pageOverview_titel}</th>
                            <th className="wp200">{trans.pageOverview_laatste}</th>
                            <th className="text-center wp100">{trans.pageOverview_link}</th>
                            <th className="text-center wp100">{trans.pageOverview_link_live}</th>
                            <th className="text-center wp100">{trans.pageOverview_verwijder}</th>
                            <th className="text-center wp100">{trans.pageOverview_bewerk}</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.project_list.data.map((item, index) => {
                            let status = PROJECT_STATUSES[item.project_status_id]
                            const province_name = item.province ? item.province['filter_value_name'] : '';
                            const plaat_name = item.plaat ? item.plaat['filter_value_name'] : '';
                            return (
                                <tr key={index}>
                                    <td className="nowrap"><i className={status.icon_class}></i> <span>{status.title}</span></td>
                                    <td>
                                        <span className="title"><span className="title_first">{item.project_title}</span> {this._renderFlagLink(item)}</span>
                                        <span className="subtitle">
                                            {
                                                province_name ?
                                                    <span>{province_name}  </span>
                                                : ''
                                            }
                                            {
                                                (province_name && plaat_name) ?
                                                    <i className="fa fa-circle" aria-hidden="true"></i>
                                                : ''
                                            }
                                            {
                                                plaat_name ?
                                                    <span>{plaat_name}</span>
                                                : ''
                                            }
                                            
                                        </span>
                                    </td>
                                    <td className="color-7C8589">{moment(item.updated_at).format(Env.dateformat_default)}</td>
                                    <td className="text-center link-icon">
                                        <a target="_blank" href={item.url_concept}><i className="iconc iconc-link fs22 i-rotate25"></i></a>
                                    </td>
                                    <td className="text-center link-icon">
                                        <a target="_blank" href={item.url_live}><i className="iconc iconc-link fs22 i-rotate25"></i></a>
                                    </td>
                                    <td className="text-center link-icon">
                                        <button className="btn btn-plain" onClick={()=>{this.handleDelete(item.id)}}><i className="iconc iconc-trash fs22"></i></button>
                                    </td>
                                    <td className="text-center link-icon">
                                        <Link to={'/projects/'+item.id}><i className="iconc iconc-edit fs22 i-rotate25"></i></Link>
                                    </td>
                                </tr>
                            )}
                        )}
                    </tbody>
                </table>
            </div>

        );
    }

     onProjectStatusChange = (item) => {
       this.setState({
           project_status_id: item.value
       })
        
    }

    onProjectTitleSearch = (value) => {
        this.setState({
           project_title: value
       })
    }


    render() {
        // if(jQuery.isEmptyObject(this.props.project_list.data)) {
        //     return false
        // }

        return (
            <div>
                <ContentWrapper hasSidebar={true}>
                    <div className="row dashboard_upper_info">
                        <div className="inner">
                            <div className="form-group">
                                <label>{trans.search_project_title}</label>
                                <InputSearch onChange={this.onProjectTitleSearch} />
                            </div>
                            <div className="form-group">
                            <label>{trans.search_project_status}</label>
                                <DropdownList items={PROJECT_STATUSES_DROPDOWN_LIST} onItemChange={this.onProjectStatusChange} selectedValue={0} />
                            </div>
                        </div>
                    </div>
                    <h3 className="mb20">{trans.pageOverview_locatie_title}</h3>
                    {
                        (this.state.isDesktop) ? this._renderDesktop() : this._renderMobile()
                    }

                    <ul id="project_overview_paginations_list"></ul>
                </ContentWrapper>
            </div>
        );
    }
}


export default ProjectOverview;
