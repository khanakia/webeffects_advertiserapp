import { connect } from 'react-redux'
import { fetchTags, filterTags, selectTag } from '../../actions/action_tag';

import TagHelper from '../../helpers/helper_tag'
import TagSelector from './TagSelector';


const getVisibleTodos = (todos, filter) => {
    // console.log('filter', filter)
    var rows  = [];
    if(filter.tag_title) {
        _.map(todos, function(item) {
            if(item.tag_title.indexOf(filter.tag_title) === -1) {
                return;
            }
            rows.push(item)
        })
        return rows;
    }

    // console.log('todos', rows)
    return todos;
}

const mapStateToProps = (state) => {
    return {
        tags_reducer: state.tags_reducer,
        tags: getVisibleTodos(state.tags_reducer.taglist.tags, state.tags_reducer.filterTags)

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchTags: () => {
            TagHelper.index().then((response) => {
                dispatch(fetchTags(response))
            });
        },

        filterTags: (data) => {

            dispatch(filterTags(data))
        },

        selectTag: (data => {
            dispatch(selectTag(data))
        })
    }
}


const TagSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(TagSelector)

export default TagSelectorContainer
