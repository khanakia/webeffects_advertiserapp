import { connect } from 'react-redux'
import { fetchCompanies} from '../actions/action_company';

import Subscription from '../components/Subscription';


const mapStateToProps = (state) => {

    return {
        // companiesList: state.companies.list,
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


const SubscriptionContainer = connect(mapStateToProps, mapDispatchToProps)(Subscription)

export default SubscriptionContainer
