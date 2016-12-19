import { connect } from 'react-redux'
import {PageLogin} from '../components'

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


const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(PageLogin)

export default LoginContainer
