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
                    </table>
                </ContentWrapper>
            </div>

        );
    }
}


export default ProjectOverview;
