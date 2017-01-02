import { connect } from 'react-redux'
import {ResetPassword} from '../components'

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


const ResetPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(ResetPassword)

export default ResetPasswordContainer
