import { connect } from 'react-redux'
import {Login} from '../components'

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


const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)

export default LoginContainer
