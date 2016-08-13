import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';

import Sidebar from './Sidebar'
import PagePanel from './PagePanel'

import CompanyForm from './CompanyForm'

class CompanyList extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.fetchCompanies();
        // let { dispatch } = this.props
        // console.log(dispatch);
        // this.data = {
        //   company_title:'ddd' 
        // }
    }

    edit(id) {
        console.log(id);

    }
    renderPosts(companies) {
        return companies.map((post) => {
            return (
                <li className="list-group-item" key={post.id}>
                    <div className="d-table">
                        <div className="d-table-cell width-full">
                            <h4 className="list-group-item-heading">{post.company_title}</h4>
                        </div>
                        <div className="d-table-cell">
                            <button data-toggle="tooltip" data-placement="top" title="Edit Company" className="btn btn-link" onClick={()=> this.edit(post.id)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                        </div>

                    </div>
                    
                </li>
            );
        });
    }

    render() {
        const { companies } = this.props.companiesList;
        
        // if(loading) {
        //     return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>      
        // } else if(error) {
        //     return <div className="alert alert-danger">Error: {error.message}</div>
        // }

        return (
            <div>
                <Sidebar>
                    ABC1
                </Sidebar>
                <PagePanel>
                    <div className="container">
                        <div className="heading-bar">
                            <h2 className="pull-left">Organizations</h2>
                            <div className="pull-right">
                                <button className="btn btn-success" onClick={()=> CompanyForm.showInPoup({},this.props)}>Add New Company</button>
                                <button className="btn btn-success" onClick={()=> this.currentData()}>Add 11New Company</button>
                            </div>
                        </div>

                        <div className="table-list-header">
                            <div className="left pull-left">

                            </div>
                            <div className="right pull-right">
                                <div className="select-menu">
                                     <button className="btn btn-link dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        Sort <span className="caret"></span>
                                      </button>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <div className="p10">
                                            <input type="text" />
                                        </div>
                                      </div>
                                </div>
                                <div className="select-menu">
                                     <button className="btn btn-link dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        Sort <span className="caret"></span>
                                      </button>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <div className="p10">
                                            <input type="text" />
                                        </div>
                                      </div>
                                </div>
                            </div>
                        </div>

                        
                        <ul className="list-group">
                            {this.renderPosts(companies)}
                        </ul>
                    </div>
                </PagePanel>
            </div>
        );
    }
}


export default CompanyList;
