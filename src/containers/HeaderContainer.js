import { connect } from 'react-redux'

import Header from '../components/Header';


const mapStateToProps = (state) => {
	// console.log(state.posts.postsList);
  return { 
    header_title: state.header
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
   
  }
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)

export default HeaderContainer
