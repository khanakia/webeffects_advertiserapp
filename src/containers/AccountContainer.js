import { connect } from 'react-redux'
import {Account} from '../components'

import { fetchContacts } from '../actions/action_contact';
import { fetchCurrentUser } from '../actions/action_appdata';

const mapStateToProps = (state) => {
    return {
        state : state,
        current_user: state.appdata.current_user,
        contact_list: state.contact.list,
        project_list: state.project.list,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchContacts: () => {
            dispatch(fetchContacts()); 
        },

        fetchCurrentUser: () => {
            dispatch(fetchCurrentUser());
        },

    }
}


const AccountContainer = connect(mapStateToProps, mapDispatchToProps)(Account)

export default AccountContainer
