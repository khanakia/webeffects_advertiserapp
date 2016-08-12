import { connect } from 'react-redux'
import { fetchTags } from '../actions/action_tag';

import TagList from '../components/TagList';

import TagHelper from '../helpers/helper_tag'


const mapStateToProps = (state) => {
    // console.log(state.posts.postsList);

    return {
        tags_reducer: state.tags_reducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchTags: () => {
            TagHelper.index().then((response) => {
                dispatch(fetchTags(response))
            });
        }
    }
}


const TagListContainer = connect(mapStateToProps, mapDispatchToProps)(TagList)

export default TagListContainer
