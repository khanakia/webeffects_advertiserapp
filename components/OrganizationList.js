import React, { Component } from 'react';
import { Link } from 'react-router';

import Sidebar from './Sidebar'
import PagePanel from './PagePanel'

class PostsList extends Component {
  componentWillMount() {
    this.props.fetchPosts();
    
  }

  renderCategories(categories) {
     return categories.map((c) => {
        c = c.trim();
        return (
          <Link to={"filter/" + c} key={c} className="list-group-item-text">{" " + c + " "}</Link>
        );
     });
  }

  renderPosts(posts) {
    return posts.map((post) => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link style={{color:'black'}} to={"posts/" + post.id}>
            <h3 className="list-group-item-heading">{post.org_title}</h3>
          </Link>
            
        </li>
      );
    });
  }

  render() {
    const { posts, loading, error } = this.props.postsList;

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
              {this.renderPosts(posts)}
            </ul>
          </div>
        </PagePanel>
      </div>
    );
  }
}


export default PostsList;
