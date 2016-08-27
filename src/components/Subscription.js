import React, { Component } from 'react';
import { Link } from 'react-router';
// import { If, Then, Else } from 'react-if';

import Sidebar from './Sidebar'
import PagePanel from './PagePanel'
import OrganizationAdd from './OrganizationAdd'

import OrgUserSettingForm from './org/OrgUserSettingForm'
import OrgUserInviteForm from './org/OrgUserInviteForm'


import Auth from '../helpers/auth.js'
import PlanHelper from '../helpers/helper_plan.js'
import Util from '../helpers/util'
import Localstore from '../helpers/localstore'

import {API_URL_PLAN} from '../config.js'


class Subscription extends Component {
    constructor(props, context) {
        super(props, context);
        // this.currentOrg = Localstore.getItem('org');

        this.state = {
            data : []
        }
    }

    componentWillMount() {
        // this.props.fetchOrgUsers(); 
        axios({
            method: 'post',
            url: API_URL_PLAN,
            headers: Auth.header(),
            data : "",
        }).then(function(response){
            console.log(response)
            this.setState({
                data  : response.data
            })
        }.bind(this));
        
    }

    planList(plan) {
        return plan.map((plan) => {
            return (
                <th>
                    <div className="plan-name text-center">{plan.plan_title}</div>
                    <div className="plan-price text-center"><sup>$</sup>0</div>
                    <div className="per-month text-center">per month</div>
                </th>
            )
        });
    }

    render() {
        const plan = this.state.data;
        return (

            <div>
                <PagePanel>
                    <div className="control-toolbar1">
                        <div className="left">
                            <span className="title">You are currently using the Small Office plan.</span>
                        </div>
                        <div className="middle">
                        </div>
                    </div>
                    <div className="general-setting">
                    <form className="form" ref='form' onSubmit={this.handleSubmit}>
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th></th>
                                    {this.planList(plan)}
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Active Projects</td>
                                    <td>2</td>
                                    <td>5</td>
                                    <td>15</td>
                                    <td>40</td>
                                    <td>85</td>
                                    <td>200</td>
                                    <td>500</td>
                                </tr>
                                <tr>
                                    <td>File Storage Space</td>
                                    <td>100 MB</td>
                                    <td>1 GB</td>
                                    <td>5 GB</td>
                                    <td>20 GB</td>
                                    <td>45 GB</td>
                                    <td>100 GB</td>
                                    <td>400 GB</td>
                                </tr>
                                <tr>
                                    <td>30 Day Free Trail</td>
                                    <td>Free Forever</td>
                                    <td>YES</td>
                                    <td>YES</td>
                                    <td>YES</td>
                                    <td>YES</td>
                                    <td>YES</td>
                                    <td>YES</td>
                                </tr>
                                <tr>
                                    <td>Time Tracking</td>
                                    <td>YES</td>
                                    <td>YES</td>
                                    <td>YES</td>
                                    <td>YES</td>
                                    <td>YES</td>
                                    <td>YES</td>
                                    <td>YES</td>
                                </tr>
                                <tr>
                                    <td>256 Bit SSL</td>
                                    <td>NO</td>
                                    <td>NO</td>
                                    <td>YES</td>
                                    <td>YES</td>
                                    <td>YES</td>
                                    <td>YES</td>
                                    <td>YES</td>
                                </tr>
                                <tr>
                                    <td>Google Drive Integration</td>
                                    <td>NO</td>
                                    <td>NO</td>
                                    <td>NO</td>
                                    <td>YES</td>
                                    <td>YES</td>
                                    <td>YES</td>
                                    <td>YES</td>
                                </tr>
                                <tr>
                                    <td>BOX.com Integration</td>
                                    <td>NO</td>
                                    <td>NO</td>
                                    <td>NO</td>
                                    <td>NO</td>
                                    <td>YES</td>
                                    <td>YES</td>
                                    <td>YES</td>
                                </tr>
                                <tr>
                                    <td>Single Sign-in</td>
                                    <td>NO</td>
                                    <td>NO</td>
                                    <td>NO</td>
                                    <td>NO</td>
                                    <td>NO</td>
                                    <td>NO</td>
                                    <td>NO</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><button type="button" className="btn btn-default btn-xs">Downgrade</button></td>
                                    <td><button type="button" className="btn btn-default btn-xs">Downgrade</button></td>
                                    <td><button type="button" className="btn btn-default btn-xs">Downgrade</button></td>
                                    <td><button type="button" className="btn btn-primary btn-xs">Default</button></td>
                                    <td><button type="button" className="btn btn-success btn-xs">Upgrade</button></td>
                                    <td><button type="button" className="btn btn-success btn-xs">Upgrade</button></td>
                                    <td><button type="button" className="btn btn-success btn-xs">Upgrade</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    </div>
                </PagePanel>
            </div>
        );
    }
}


export default Subscription;
