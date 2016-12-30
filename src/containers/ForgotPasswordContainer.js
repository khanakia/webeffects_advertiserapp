import { connect } from 'react-redux'
import {ForgetPassword} from '../components'

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


const ForgotPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(ForgetPassword)

export default ForgotPasswordContainer
