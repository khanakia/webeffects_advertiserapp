import { connect } from 'react-redux'
import { fetchOrgs, fetchOrgCurrent } from '../actions/action_organization';

import OrganizationList from '../components/OrganizationList';

import OrgHelper from '../helpers/helper_org'



const mapStateToProps = (state) => {
    // console.log(state.posts.orgsList);

    return {
        orgsList: state.org.list,
        state : state

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchOrgs: () => {
            // OrgHelper.index().then((response) => {
            //     dispatch(fetchOrgs(response))
            // });

            // dispatch(fetchOrgs())

            dispatch(fetchOrgs()).then((response) => {
                // dispatch(fetchOrgCurrent(response))
            });

            // dispatch(fetchOrgs()).then((response) => {
            //     !response.error ? dispatch(fetchOrgsSuccess(response.payload)) : dispatch(fetchOrgsFailure(response.payload));

            //     // setTimeout(() => dispatch({type: 'RESET_POSTS'}), 3000); 
            // });
        }
    }
}


const OrganizationListContainer = connect(mapStateToProps, mapDispatchToProps)(OrganizationList)

export default OrganizationListContainer
