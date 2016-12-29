import { connect } from 'react-redux'
import {PageResetlink} from '../components'

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


const ResetlinkContainer = connect(mapStateToProps, mapDispatchToProps)(PageResetlink)

export default ResetlinkContainer
