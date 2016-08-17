import { connect } from 'react-redux'
import { fetchCompanies} from '../actions/action_company';

import OrganizationCompanies from '../components/OrganizationCompanies';


const mapStateToProps = (state) => {

    return {
        companiesList: state.companies.list,
        current_org: state.appdata.current_org
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


const OrganizationCompaniesContainer = connect(mapStateToProps, mapDispatchToProps)(OrganizationCompanies)

export default OrganizationCompaniesContainer
