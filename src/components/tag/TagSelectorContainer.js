import { connect } from 'react-redux'
import { fetchTags, filterTags, selectTag } from '../../actions/action_tag';

// import TagHelper from '../../helpers/helper_tag'
import TagSelector from './TagSelector';


const getVisibleTodos = (todos, filter) => {
    // console.log('filter', filter)
    var rows  = [];
    if(filter.tag_title) {
        _.map(todos, function(item) {
            if(item.tag_title && item.tag_title.indexOf(filter.tag_title) === -1) {
                return;
            }
            // console.log(item.tag_title)
            rows.push(item)
        })
        return rows;
    }

    // console.log('todos', rows)
    return todos;
}

const mapStateToProps = (state) => {
    return {
        // tagList: state.tag.list,
        tagList: getVisibleTodos(state.tag.list, state.tag.filterTags),
        current_org: state.appdata.current_org

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchTags: () => {
            dispatch(fetchTags())
        },

        filterTags: (data) => {
            dispatch(filterTags(data))
        },

        // selectTag: (data => {
        //     dispatch(selectTag(data))
        // })
    }
}


const TagSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(TagSelector)

export default TagSelectorContainer
