import { connect } from 'react-redux'
import { fetchCategories } from '../../actions/action_category';

import Categories from './Categories';

const mapStateToProps = (state) => {
    return {
        state : state,
        categoryList: state.category.list,
        current_org: state.appdata.current_org
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchCategories: () => {
            dispatch(fetchCategories());
        }
    }
}

const CategoriesContainer = connect(mapStateToProps, mapDispatchToProps)(Categories)

export default CategoriesContainer
