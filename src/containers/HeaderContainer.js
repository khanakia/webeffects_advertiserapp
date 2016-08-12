import { connect } from 'react-redux'

import Header from '../components/Header';


const mapStateToProps = (state) => {
	// console.log(state.posts.postsList);
  return { 
    header_title: state.org.current.data.org_title
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
   
  }
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)

export default HeaderContainer
