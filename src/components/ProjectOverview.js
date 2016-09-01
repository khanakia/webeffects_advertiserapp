import React, { Component } from 'react';
import { Link } from 'react-router';

import Auth from '../helpers/auth.js'

import Sidebar from './Sidebar'
import PagePanel from './PagePanel'

import ProjectForm from './project/ProjectForm'


class ProjectOverview extends Component {
    constructor(props, context) {
        super(props, context);
        this.projectId = this.props.params.projectId
    }

    componentWillMount() {
       // this.props.fetchProjects();
       this.props.fetchProjectActivities(this.projectId);
    }

    renderList(items) {
        if(undefined==items) return;
        return items.map((item) => {
            return (
                <li className="list-group-item" key={item.id}>
                    <div className="d-table w100">
                        <div className="d-table-cell xs-d-block w30 xs-w100">
                            <div className="userInfoBlock">
                                <div className="image d-inline-block valign-middle mr20">
                                    <div className="avatar" style={{backgroundImage: "url('" + item.user.profile_image_url +"')"}}>
                                    </div>
                                </div>
                                <div className="summary d-inline-block">
                                    <div className="title fw-b"> {item.user.fullname}</div>
                                </div>
                            </div>
                        </div>
                        <div className="d-table-cell xs-d-block xs-mt20 w30 xs-w100 valign-middle ">
                            {item.activity_type} a {item.object_type}
                        </div>
                        <div className="d-table-cell xs-d-block xs-mt20 w30 xs-w100 valign-middle ">
                               {item.object_type=='comment' 
                                    ? item.data.body 
                                    : ''
                               }
                        </div>

                        <div className="d-table-cell xs-d-block xs-mt20 w30 xs-w100 valign-middle ">
                            {item.created_at}
                        </div>
                        
                    </div>
                </li>
            );
        });
    }

   
    render() {
        const data = this.props.projectActivities;
        console.info("datadatadata", data)
        return (
            <div>
               <ul className="list-group">
                {this.renderList(data)}
               </ul>
            </div>

        );
    }
}


export default ProjectOverview;
