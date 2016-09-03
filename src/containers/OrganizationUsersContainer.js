import { connect } from 'react-redux'
import { fetchOrgs, fetchOrgCurrent, fetchOrgUsers, filterOrgUserList } from '../actions/action_organization';

import OrganizationUsers from '../components/OrganizationUsers';

import OrgHelper from '../helpers/helper_org'

const filterList = (items, filterParams) => {
    return _.filter(items, function(item) {
        if(filterParams.user_title && item.user.fullname && item.user.fullname.indexOf(filterParams.user_title) === -1) {
            return false;
        }
        return true;
    })
}


const mapStateToProps = (state) => {
    // console.log(state.posts.orgsList);

    return {
        state : state,
        current_org: state.appdata.current_org,
        // userlist: state.org.userlist,
        userlist: filterList(state.org.userlist.data, state.org.filter_orguserlist_params),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchOrgUsers: () => {
          
            dispatch(fetchOrgUsers());

        },

        filterOrgUserList: (data) => {
            dispatch(filterOrgUserList(data))
        },
    }
}


const OrganizationUsersContainer = connect(mapStateToProps, mapDispatchToProps)(OrganizationUsers)

export default OrganizationUsersContainer
