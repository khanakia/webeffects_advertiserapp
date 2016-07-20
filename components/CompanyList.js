import React, { Component } from 'react';
import { Link } from 'react-router';

import Sidebar from './Sidebar'
import PagePanel from './PagePanel'

class CompanyList extends Component {
  componentWillMount() {
    this.props.fetchCompanies();
    
  }

 

  renderPosts(companies) {
    return companies.map((post) => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link style={{color:'black'}} to={"posts/" + post.id}>
            <h3 className="list-group-item-heading">{post.company_title}</h3>
          </Link>
            
        </li>
      );
    });
  }

  render() {
    const { companies, loading, error } = this.props.companiesList;
    
    if(loading) {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>      
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div>
        <Sidebar>
          ABC
        </Sidebar>
        <PagePanel>
          <div className="container">
            <h1>Posts</h1>
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
