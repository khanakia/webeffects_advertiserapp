import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router'

import ContentWrapper from './shared/ContentWrapper'
import {PROJECT_STATUSES} from '../config'
import {ProjectHelper} from '../helpers'
import DropdownList from './DropdownList'
import InputSearch from './InputSearch'


class ProjectOverview extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isDesktop: false,
            project_status_id: null,
            project_title: null
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
    }

     componentWillUpdate = (nextProps, nextState) => {        
        // console.log(this.state);
        // console.log(nextState);
        if(!_.isEqual(this.state, nextState)) {
            console.log("NOT EQUAL")
            this.props.fetchProjects({
                project_status_id : nextState.project_status_id,
                project_title: nextState.project_title,
            })
        }

    }

     componentDidUpdate() {
        // this.props.fetchProjects({
        //     project_status_id : this.state.project_status_id,
        //     project_title: this.state.project_title,
        // })
     
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
                                        <span className="title">{item.project_title}</span>
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
                    <div>
                        <InputSearch onChange={this.onProjectTitleSearch} />
                        <DropdownList items={this.props.project_formdata.project_status_list} onItemChange={this.onProjectStatusChange} emptyPlaceholder="" />
                    </div>
                    <h3 className="mb20">{trans.pageOverview_locatie_title}</h3>
                    {
                        (this.state.isDesktop) ? this._renderDesktop() : this._renderMobile()
                    }
                </ContentWrapper>
            </div>
        );
    }
}


export default ProjectOverview;
