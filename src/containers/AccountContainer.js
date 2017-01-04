import { connect } from 'react-redux'
import {Account} from '../components'

import { fetchContacts } from '../actions/action_contact';

const mapStateToProps = (state) => {
    return {
        state : state,
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
    }
}


const AccountContainer = connect(mapStateToProps, mapDispatchToProps)(Account)

export default AccountContainer
