import { connect } from 'react-redux'
import { fetchCompanies, fetchCompaniesSuccess, fetchCompaniesFailure } from '../actions/action_company';

import CompanyList from '../components/CompanyList';


const mapStateToProps = (state) => {
	// console.log(state.posts.postsList);

  return { 
    companiesList: state.companies.companiesList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    fetchCompanies: () => {
      dispatch(fetchCompanies()).then((response) => {
            !response.error ? dispatch(fetchCompaniesSuccess(response.payload)) : dispatch(fetchCompaniesFailure(response.payload));
             
            // setTimeout(() => dispatch({type: 'RESET_POSTS'}), 3000); 
          });
    }
  }
}


const CompanyListContainer = connect(mapStateToProps, mapDispatchToProps)(CompanyList)

export default CompanyListContainer
