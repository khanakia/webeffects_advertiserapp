import { connect } from 'react-redux'
import { fetchCompanies} from '../actions/action_company';

import OrganizationGeneral from '../components/OrganizationGeneral';


const mapStateToProps = (state) => {

    return {
        companiesList: state.companies.list,
        current_org: state.appdata.current_org
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // dispatch,
        // fetchCompanies: () => {
        //     dispatch(fetchCompanies())
        // }
    }
}


const OrganizationGeneralContainer = connect(mapStateToProps, mapDispatchToProps)(OrganizationGeneral)

export default OrganizationGeneralContainer
