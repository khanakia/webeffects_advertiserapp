import { connect } from 'react-redux'
import { fetchProjectFiles, fetchProjectFile } from '../actions/action_project';
// import { fetchCategoriesTypeFile} from '../actions/action_category';

import ProjectFile from '../components/ProjectFile';

const mapStateToProps = (state) => {
    return {
        state : state,
        projectFilesCurrent: state.project.files_current,
        current_org: state.appdata.current_org
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProjectFile: (id) => {
            dispatch(fetchProjectFile(id)).then((response) => {
                // dispatch(fetchCategoriesTypeFile(project_id))
            });
        }
    }
}


const ProjectFileContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectFile)

export default ProjectFileContainer
