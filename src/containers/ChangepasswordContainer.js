import { connect } from 'react-redux'
import {PageChangepassword} from '../components'

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


const ChangepasswordContainer = connect(mapStateToProps, mapDispatchToProps)(PageChangepassword)

export default ChangepasswordContainer
