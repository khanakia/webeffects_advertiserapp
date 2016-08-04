import { connect } from 'react-redux'
import { fetchPosts, fetchPostsSuccess, fetchPostsFailure } from '../actions/organizations';

import OrganizationList from '../components/OrganizationList';


const mapStateToProps = (state) => {
	// console.log(state.posts.postsList);

  return { 
    postsList: state.posts.postsList,

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    fetchPosts: () => {
      dispatch(fetchPosts()).then((response) => {
            !response.error ? dispatch(fetchPostsSuccess(response.payload)) : dispatch(fetchPostsFailure(response.payload));
             
            // setTimeout(() => dispatch({type: 'RESET_POSTS'}), 3000); 
          });
    }
  }
}


const OrganizationListContainer = connect(mapStateToProps, mapDispatchToProps)(OrganizationList)

export default OrganizationListContainer
