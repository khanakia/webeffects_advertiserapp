// import { connect } from 'react-redux'
// import { fetchProjectMessages, fetchProjectMessage} from '../actions/action_project';
// import { fetchCategoriesTypeMessage} from '../actions/action_category';

// import ProjectMessageCreate from '../components/ProjectMessageCreate';

// const mapStateToProps = (state) => {
//     return {
//         state : state,
//         projectMessages: state.project.messages,
//         projectMessage: state.project.messages_current,
//         categoryList: state.category.type_message_list,
//         current_org: state.appdata.current_org
//     };
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         dispatch,
//         fetchProjectMessages: (project_id) => {
//             dispatch(fetchProjectMessages(project_id)).then((response) => {
//                 dispatch(fetchCategoriesTypeMessage(project_id))
//             });
//         },
//         fetchProjectMessage: (id) => {
//             dispatch(fetchProjectMessage(id))
//         },
//         fetchCategoriesTypeMessage: (project_id) => {
//             dispatch(fetchCategoriesTypeMessage(project_id))
//         }
//     }
// }


// const ProjectMessageCreateContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectMessageCreate)

// export default ProjectMessageCreateContainer
