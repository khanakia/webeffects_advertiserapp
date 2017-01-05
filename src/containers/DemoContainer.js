import { connect } from 'react-redux'



import {Demo} from '../components'
const mapStateToProps = (state) => {
    return {
        state : state,
        
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        
    }
}


const DemoContainer = connect(mapStateToProps, mapDispatchToProps)(Demo)

export default DemoContainer
