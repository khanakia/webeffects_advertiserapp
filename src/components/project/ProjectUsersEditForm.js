import React, { Component } from 'react';
import ReactDom from 'react-dom';

import ProjectUserHelper from '../../helpers/helper_project_user.js'

import { fetchProjectUsers } from '../../actions/action_project';
import { fetchOrgUsers } from '../../actions/action_organization';

import {store} from '../../store/index.js';

import InputDate from '../controls/InputDate'
import DropdownCompanies from '../controls/DropdownCompanies'


class ProjectUsersEditForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            org_users : [],
            project_users : [],
            search_val : '',
            search_company : ''     
        }
    }

    static defaultProps = {
        onDataUpdate: function(org) { },
        
        popup_id: '',
        settings : {},
        data : {
            project_id: '',
            
        }    
    }

    componentWillMount() {

    }

    componentDidMount() {
        store.dispatch(fetchOrgUsers()).then((response_orgusers) => {
            store.dispatch(fetchProjectUsers(this.props.data.project_id)).then((response_projectusers) => {

                this.setState({
                    org_users : response_orgusers.payload.data,
                    project_users: response_projectusers.payload.data.data
                })
            });
        });
    }


    // static showInPoup({settings={}, data={}, onDataUpdate=this.defaultProps.onDataUpdate()}) {
    //     var uniq = 'id' + (new Date()).getTime();

    //     Controls.showpopup({
    //         detach : true,
    //         message : '<div id="' + uniq + '"></div>',
    //         opacity: 0.5,
    //         blur: false,
    //         onopen : function(e){
    //           var pid = (jQuery(e).attr('id'));
    //           ReactDom.render(<ProjectUsersEditForm popup_id={pid} settings={settings} data={data} onDataUpdate={onDataUpdate} />, document.getElementById(uniq));
    //         }
    //     });
    // }


    hidePopup = () => {
        if (this.props.popup_id) {
            jQuery('#' + this.props.popup_id).popup('hide');
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();

        var valid = jQuery(this.refs.form).valid();
        if (!valid) {return false};

        let data = jQuery(this.refs.form).serialize();
        // data = URI.parseQuery(data);

        console.log(data);

        ProjectUserHelper.store(data).then(function(response) {
            console.log(response);
            
            store.dispatch(fetchProjectUsers(this.props.data.project_id))
            this.props.onDataUpdate(response.data.project)
            this.hidePopup();
        }.bind(this));

        return false;

    }

    renderList(items) {
        console.log(items)
        if(undefined==items) return;

        var resultsCount = 0;
        var output = items.map((item) => {
            if(item.user.first_name.toLowerCase().indexOf(this.state.search_val) === -1) {
                return false;
            }

            // console.log(item.company_id , this.state.search_company)
            if(this.state.search_company!=="" && item.company_id !== parseInt(this.state.search_company)) {
                return false;
            }

            var project_user = _.find(this.state.project_users, { 'user_id': item.user_id });
            if(project_user) return false;

            resultsCount = 1;
            return (
                <li className="list-group-item" key={item.id}>
                    <label className="d-table w100">
                        <div className="d-table-cell wp35">
                            <input type="checkbox" name="user_ids[]" defaultValue={item.user_id} />
                        </div>
                        <div className="d-table-cell">
                            <div className="userInfoBlock">
                                <div className="image d-inline-block valign-middle mr15">
                                    <div className="avatar" style={{backgroundImage: "url('"+item.user.profile_image_url+"')"}}>
                                    </div>
                                </div>
                                <div className="summary d-inline-block valign-middle">
                                    <div className="title fw-b">{item.user.fullname}</div>
                                    <div className="position fs12">{item.job_title}</div>
                                    <div className="company fs12">{item.company_title}</div>
                                </div>
                            </div>
                        </div>
                    </label>
                </li>
            );
        });
        
        
        if(!resultsCount) {
            return (
                <h3>No Results Found.</h3>
            ) 
        }
        return output;
    }

    search(e) {
        var search_val = e.target.value;
        this.setState({
            search_val : search_val
        })
    }

    search_company(e) {
        var search_company = e.target.value;
        console.log(search_company)
        this.setState({
            search_company : search_company
        })
    }

    render() {
        return (
            <div>
                <div className="modal-header">
                    <h4 className="modal-title">Add Users to Project</h4>
                </div>

                <form className="form form-horizontal" ref='form' onSubmit={this.handleSubmit}>
                    <input type="hidden" className="form-control" ref="project_id" name="project_id" id="project_id" defaultValue={this.props.data.project_id} />
                    <div className="content-area">
                        <div className="form-group">
                            <label className="col-sm-2 col-xs-3 control-label xs-mt5">Search</label>
                            <div className="col-sm-3 col-xs-9">
                                <input type="text" className="w100" refs="search_user" onChange={(e) => this.search(e)} />
                            </div>
                            <div className="col-sm-3 col-xs-12 xs-mt15">
                                <DropdownCompanies name="company_id" defaultValue={this.props.data.company_id} onChange={(e) => this.search_company(e)} />
                            </div>
                        </div>

                        <ul className="list-group style2">
                            {this.renderList(this.state.org_users)}
                        </ul>
                    </div>
                    <div className="modal-footer text-right">
                        <button type="submit" className="btn btn-success">Save</button>
                    </div>
                </form>

            </div>
        );
    }
}


export default ProjectUsersEditForm;
