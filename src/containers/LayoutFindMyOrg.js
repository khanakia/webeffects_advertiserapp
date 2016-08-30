import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactDOM from 'react-dom'

import {ROOT_HOST} from '../config.js';

import OrgHelper from '../helpers/helper_org.js'

export default class LayoutFindMyOrg extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orgs : []
        }
    }

    componentWillMount() {

    }

    handleSubmit = (e) => {
        e.preventDefault();
        var valid = jQuery(this.refs.form).valid();
        if (!valid) {return false};

        OrgHelper.getAllOrgsByEmail(this.refs.email.value).then(function(response) {
            console.log(response);
            this.setState({
                orgs: response.data
            })
        }.bind(this));

        return false;
    }

    renderList() {
        return this.state.orgs.map((org) => {
            return (
                <li className="list-group-item" key={org.id}>
                    <h4 className="list-group-item-heading">
                        {org.name}
                    </h4>
                    <a href={OrgHelper.getLoginURL(org)}>Click here to Login</a>
                </li>
            );
        });
    }

    // getLoginURL(org) {
    //     let url = org.org_slug+'.'+ROOT_HOST;
    //     if (org.org_domain)  {
    //         url = org.org_domain;
    //     }

    //     return 'http://'+url;
    // }

    render() {
        console.log(this.state.orgs);
        return (
            <div>
                <div className="container mt100">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            <div className="panel panel-default">
                                <div className="panel-heading"><h4>FIND YOUR ORGANIZATION</h4></div>
                                <div className="panel-body">
                                    <form onSubmit={this.handleSubmit} ref="form">
                                        <div className="form-group">
                                            <label>Enter Your Email address</label>
                                            <input type="email" className="form-control required email" id="email" placeholder="Email" ref='email' defaultValue="khanakia@live.com" />
                                        </div>
                                        <button type="submit" className="btn btn-default">Submit</button>
                                    </form>
                                </div>
                            </div>

                            <ul className="list-group style11">
                                {this.renderList()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
