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
                                <th>Link</th>
                                <th>Verwijder</th>
                                <th>Bewerk</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.project_list.map(function(item, index){
                                return (
                                    <tr key={index}>
                                        <td>{item.project_status_id}</td>
                                        <td>{item.project_title}</td>
                                        <td>{item.updated_at}</td>
                                        <td><a target="_blank" href=""><i className="iconc iconc-link"></i></a></td>
                                        <td><button className="btn btn-plain"><i className="iconc iconc-trash"></i></button></td>
                                        <td><Link to={'/projects/'+item.id}><i className="iconc iconc-edit"></i></Link></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </ContentWrapper>
            </div>

        );
    }
}


export default ProjectOverview;
