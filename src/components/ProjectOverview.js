import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router'

import ContentWrapper from './shared/ContentWrapper'


class ProjectOverview extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.fetchProjects()
    }
   
    render() {
        console.log("this.props.project_list", this.props)
        if(jQuery.isEmptyObject(this.props.project_list)) {
            return false
        }

        return (
            <div>
                <ContentWrapper hasSidebar={true}>
                    <table className="table table-bordered table--default">
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Titel</th>
                                <th>Laatste bewerking</th>
                                <th className="text-center">Link</th>
                                <th className="text-center">Verwijder</th>
                                <th className="text-center">Bewerk</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.props.project_list.map(function(item, index){

                                return (
                                    <tr key={index}>
                                        <td><i className="iconc-concept"></i> <span>{item.project_status_id}</span></td>
                                        <td>
                                            <span className="title">{item.project_title}</span>
                                            <span className="subtitle">Bennekom <i className="fa fa-circle" aria-hidden="true"></i> Gelderland</span>
                                        </td>
                                        <td>{item.updated_at}</td>
                                        <td className="text-center link-icon"><a target="_blank" href=""><i className="iconc iconc-link"></i></a></td>
                                        <td className="text-center link-icon"><button className="btn btn-plain"><i className="iconc iconc-trash"></i></button></td>
                                        <td className="text-center link-icon"><Link to={'/projects/'+item.id}><i className="iconc iconc-edit"></i></Link></td>
                                    </tr>
                                )}
                            )}
                        </tbody>
                    </table>
                </ContentWrapper>
            </div>

        );
    }
}


export default ProjectOverview;
