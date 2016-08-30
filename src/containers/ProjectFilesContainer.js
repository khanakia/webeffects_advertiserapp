import { connect } from 'react-redux'
import { fetchProjectFiles} from '../actions/action_project';
import { fetchCategoriesTypeFile} from '../actions/action_category';

import ProjectFiles from '../components/ProjectFiles';

const mapStateToProps = (state) => {
    return {
        state : state,
        current_org: state.appdata.current_org,
        projectFiles: state.project.files,
        categoryList: state.category.type_message_list,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProjectFiles: (project_id, extraParams={}) => {
            dispatch(fetchProjectFiles(project_id, extraParams)).then((response) => {
                // dispatch(fetchCategoriesTypeFile(project_id))
            });
        }
    }
}


const ProjectFilesContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectFiles)

export default ProjectFilesContainer
