import { connect } from 'react-redux'
import { fetchOrgs, fetchOrgCurrent, fetchOrgUsers } from '../actions/action_organization';

import OrganizationUsers from '../components/OrganizationUsers';

import OrgHelper from '../helpers/helper_org'



const mapStateToProps = (state) => {
    // console.log(state.posts.orgsList);

    return {
        userlist: state.org.userlist,
        state : state
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchOrgUsers: () => {
          
            dispatch(fetchOrgUsers());

        }
    }
}


const OrganizationUsersContainer = connect(mapStateToProps, mapDispatchToProps)(OrganizationUsers)

export default OrganizationUsersContainer
