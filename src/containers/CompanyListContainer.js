import { connect } from 'react-redux'
import { fetchCompanies} from '../actions/action_company';

import CompanyList from '../components/CompanyList';


const mapStateToProps = (state) => {

    return {
        companiesList: state.companies.list
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchCompanies: () => {
            dispatch(fetchCompanies())
        }
    }
}


const CompanyListContainer = connect(mapStateToProps, mapDispatchToProps)(CompanyList)

export default CompanyListContainer
