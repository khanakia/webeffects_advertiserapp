import { connect } from 'react-redux'
import {action_appdata} from '../actions';
const {fetchCurrentOrg, fetchCurrentUser} = action_appdata

import Layout from './Layout';

import * as Helpers from '../helpers'

const mapStateToProps = (state) => {

    return {
        current_org: state.appdata.current_org,
        current_user: state.appdata.current_user,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchData: () => {
            dispatch(fetchCurrentOrg()).then((response) => {
        		dispatch(fetchCurrentUser())
            })
        }
    }
}


const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Layout)

export default LayoutContainer
