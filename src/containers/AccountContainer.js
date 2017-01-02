import { connect } from 'react-redux'
import {Account} from '../components'

const mapStateToProps = (state) => {
    return {
        state : state,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}


const AccountContainer = connect(mapStateToProps, mapDispatchToProps)(Account)

export default AccountContainer
