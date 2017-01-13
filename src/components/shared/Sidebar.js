import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router'

import ProjectsLinkList from './ProjectsLinkList'
class Sidebar extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {
        project_list: []
    }

    componentDidMount() {
      
    }
 
    render() {

        return (
            <div className="comp-sidebar">
                <div className="logo">
                </div>
                <div className="projects-list-wrapper">
                    <ProjectsLinkList project_list={this.props.project_list} />
                </div>

                <Link to="/projects/add" className="btn btn-green btn--round btn--add"><i className="iconc iconc-plus mr10"></i>{trans.sidebar_voeg_link}</Link>
            </div>
        );
    }
}


export default Sidebar;
