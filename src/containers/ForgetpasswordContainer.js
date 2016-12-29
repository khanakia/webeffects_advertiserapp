import { connect } from 'react-redux'
import {PageForgetpassword} from '../components'

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


const ForgetpasswordContainer = connect(mapStateToProps, mapDispatchToProps)(PageForgetpassword)

export default ForgetpasswordContainer
