// import { connect } from 'react-redux'
// import { fetchTasklist, fetchProjectTasks } from '../actions/action_tasklist';

// import TaskList from '../components/TaskList';

// import TasklistHelper from '../helpers/helper_tasklist'


// const mapStateToProps = (state) => {
//     // console.log(state.posts.postsList);

//     return {
//         tasklistData: state.tasklist
//     };
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         dispatch,
//         fetchTasklist: () => {
//             TasklistHelper.show(1).then((response) => {
//                 dispatch(fetchTasklist(response))

//                 TasklistHelper.tasks(1).then((response) => {
//                     dispatch(fetchProjectTasks(response))
//                 });
//             });
//         }
//     }
// }


// const TaskListContainer = connect(mapStateToProps, mapDispatchToProps)(TaskList)

// export default TaskListContainer
