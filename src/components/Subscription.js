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
                            <span className="title">You are currently using the Office plan.</span>
                        </div>
                        <div className="middle">
                        </div>
                    </div>
                    <div className="general-setting">
                    <form className="form subscribeForm" ref='form' onSubmit={this.handleSubmit}>
                        <ul>
                            <li>
                                <table className="table featureBox">
                                    <tbody>
                                        <tr><td>Active Projects</td></tr>
                                        <tr><td>File Storage Space</td></tr>
                                        <tr><td>30 Day Free Trail</td></tr>
                                        <tr><td>Time Tracking</td></tr>
                                        <tr><td>256 Bit SSL</td></tr>
                                        <tr><td>Google Drive Integration</td></tr>
                                        <tr><td>BOX.com Integration</td></tr>
                                        <tr><td>Single Sign-in</td></tr>
                                    </tbody>
                                </table>
                            </li>
                            <li>
                                <div className="inner style1">
                                    <div className="plan-details">
                                        <div className="plan-name">Free Forever</div>
                                        <div className="plan-price"><sup>$</sup>0</div>
                                        <div className="per-month">per month</div>                                    
                                    </div>
                                    <table className="table">
                                        <tbody>
                                            <tr><td>2</td></tr>
                                            <tr><td>100 MB</td></tr>
                                            <tr><td>Free Forever</td></tr>
                                            <tr><td><i className="fa fa-check"></i></td></tr>
                                            <tr><td><i className="fa fa-times"></i></td></tr>
                                            <tr><td><i className="fa fa-times"></i></td></tr>
                                            <tr><td><i className="fa fa-times"></i></td></tr>
                                            <tr><td><i className="fa fa-times"></i></td></tr>
                                        </tbody>
                                    </table>
                                    <button type="button" className="btn btn-style">Downgrade</button>
                                </div>
                            </li>
                            <li>
                                <div className="inner style2">
                                    <div className="plan-details">
                                        <div className="plan-name">Personal</div>
                                        <div className="plan-price"><sup>$</sup>24</div>
                                        <div className="per-month">per month</div>                                    
                                    </div>
                                    <table className="table">
                                        <tbody>
                                            <tr><td>5</td></tr>
                                            <tr><td>1 GB</td></tr>
                                            <tr><td><i className="fa fa-check"></i></td></tr>
                                            <tr><td><i className="fa fa-check"></i></td></tr>
                                            <tr><td><i className="fa fa-times"></i></td></tr>
                                            <tr><td><i className="fa fa-times"></i></td></tr>
                                            <tr><td><i className="fa fa-times"></i></td></tr>
                                            <tr><td><i className="fa fa-times"></i></td></tr>
                                        </tbody>
                                    </table>
                                    <button type="button" className="btn btn-style">Downgrade</button>
                                </div>
                            </li>
                            <li>
                                <div className="inner style3">
                                    <div className="plan-details">
                                        <div className="plan-name">Office</div>
                                        <div className="plan-price"><sup>$</sup>99</div>
                                        <div className="per-month">per month</div>
                                    </div>
                                    <table className="table">
                                        <tbody>
                                            <tr><td>15</td></tr>
                                            <tr><td>5 GB</td></tr>
                                            <tr><td><i className="fa fa-check"></i></td></tr>
                                            <tr><td><i className="fa fa-check"></i></td></tr>
                                            <tr><td><i className="fa fa-check"></i></td></tr>
                                            <tr><td><i className="fa fa-times"></i></td></tr>
                                            <tr><td><i className="fa fa-times"></i></td></tr>
                                            <tr><td><i className="fa fa-times"></i></td></tr>
                                        </tbody>
                                    </table>
                                    <button type="button" className="btn btn-style">Default</button>
                                </div>
                            </li>
                            <li>
                                <div className="inner style4">
                                    <div className="plan-details">
                                        <div className="plan-name">Professional</div>
                                        <div className="plan-price"><sup>$</sup>149</div>
                                        <div className="per-month">per month</div>
                                    </div>
                                    <table className="table">
                                        <tbody>
                                            <tr><td>85</td></tr>
                                            <tr><td>45 GB</td></tr>
                                            <tr><td><i className="fa fa-check"></i></td></tr>
                                            <tr><td><i className="fa fa-check"></i></td></tr>
                                            <tr><td><i className="fa fa-check"></i></td></tr>
                                            <tr><td><i className="fa fa-check"></i></td></tr>
                                            <tr><td><i className="fa fa-check"></i></td></tr>
                                            <tr><td><i className="fa fa-times"></i></td></tr>
                                        </tbody>
                                    </table>
                                    <button type="button" className="btn btn-style">Upgrade</button>
                                </div>
                            </li>
                            <li>
                                <div className="inner style5">
                                    <div className="plan-details">
                                        <div className="plan-name">Business</div>
                                        <div className="plan-price"><sup>$</sup>249</div>
                                        <div className="per-month">per month</div>
                                    </div>
                                    <table className="table">
                                        <tbody>
                                            <tr><td>500</td></tr>
                                            <tr><td>400 GB</td></tr>
                                            <tr><td><i className="fa fa-check"></i></td></tr>
                                            <tr><td><i className="fa fa-check"></i></td></tr>
                                            <tr><td><i className="fa fa-check"></i></td></tr>
                                            <tr><td><i className="fa fa-check"></i></td></tr>
                                            <tr><td><i className="fa fa-check"></i></td></tr>
                                            <tr><td><i className="fa fa-check"></i></td></tr>
                                        </tbody>
                                    </table>
                                    <button type="button" className="btn btn-style">Upgrade</button>
                                </div>
                            </li>
                        </ul>
                    </form>
                    </div>
                </PagePanel>
            </div>
        );
    }
}


export default Subscription;
