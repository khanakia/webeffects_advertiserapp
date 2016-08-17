import { connect } from 'react-redux'
import { fetchTags } from '../actions/action_tag';

import TagList from '../components/TagList';

import TagHelper from '../helpers/helper_tag'


const mapStateToProps = (state) => {
    // console.log(state.posts.postsList);

    return {
        state : state,
        tagsList: state.tag.list,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchTags: () => {
            dispatch(fetchTags())
        }
    }
}


const TagListContainer = connect(mapStateToProps, mapDispatchToProps)(TagList)

export default TagListContainer
