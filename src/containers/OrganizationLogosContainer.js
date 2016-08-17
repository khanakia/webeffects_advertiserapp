import { connect } from 'react-redux'
import { fetchCompanies} from '../actions/action_company';

import OrganizationLogos from '../components/OrganizationLogos';


const mapStateToProps = (state) => {

    return {
        companiesList: state.companies.list,
        current_org: state.appdata.current_org
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        // fetchCompanies: () => {
        //     dispatch(fetchCompanies())
        // }
    }
}


const OrganizationLogosContainer = connect(mapStateToProps, mapDispatchToProps)(OrganizationLogos)

export default OrganizationLogosContainer
