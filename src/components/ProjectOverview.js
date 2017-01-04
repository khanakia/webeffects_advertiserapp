import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router'

import ContentWrapper from './shared/ContentWrapper'
import {PROJECT_STATUSES} from '../config'

class ProjectOverview extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isDesktop: false
        }
    }

    componentDidMount() {
        this.props.fetchProjects()
        this._checkDesktopMobile()
        window.addEventListener('resize', (event) => {
            this._checkDesktopMobile()
        });
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
        alert("Delete Function")
    }

   _renderMobile() {
        return (
            <div>
                <ul className="list-group list-group--projectoverview">
                    {this.props.project_list.map(function(item, index){
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
        return (
            <div>
                    <table className="table table-bordered table--default table--projectoverview">
                        <thead>
                            <tr>
                                <th className="wp200">Status</th>
                                <th>Titel</th>
                                <th className="wp200">Laatste bewerking</th>
                                <th className="text-center wp100">Link</th>
                                <th className="text-center wp100">Verwijder</th>
                                <th className="text-center wp100">Bewerk</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.props.project_list.map((item, index) => {
                                let status = PROJECT_STATUSES[item.project_status_id]

                                return (
                                    <tr key={index}>
                                        <td><i className={status.icon_class}></i> <span>{status.title}</span></td>
                                        <td>
                                            <span className="title">{item.project_title}</span>
                                            <span className="subtitle">Bennekom <i className="fa fa-circle" aria-hidden="true"></i> Gelderland</span>
                                        </td>
                                        <td className="color-7C8589">{item.formatted_updated_at}</td>
                                        <td className="text-center link-icon">
                                            <a target="_blank" href={item.url_concept}><i className="iconc iconc-link fs22 i-rotate25"></i></a>
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


    render() {
        if(jQuery.isEmptyObject(this.props.project_list)) {
            return false
        }

        return (
            <div>
                <ContentWrapper hasSidebar={true}>
                    <h3 className="mb20">Locatie overzicht</h3>
                    {
                        (this.state.isDesktop) ? this._renderDesktop() : this._renderMobile()
                    }
                </ContentWrapper>
            </div>
        );
    }
}


export default ProjectOverview;
