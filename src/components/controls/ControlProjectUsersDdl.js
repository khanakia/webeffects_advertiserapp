import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux'

import { fetchProjectUsers } from '../../actions/action_project';

class ControlProjectUsersDdl extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        onUserSelect : function() {},
        className : '',

        project_id : '',
        selectedUsers : [],
        projectUsers : []
    }

    componentWillMount() {
       this.props.fetchProjectUsers(this.props.project_id)
    }
    
    componentDidMount() {
   
    }


    componentDidUpdate() {
        // console.info("ControlProjectUsersDdl componentDidUpdate", this.props.selectedUsers)
    }

    onUserSelect(e, item) {
        e.preventDefault()
        this.props.onUserSelect(item.user)
    }

    renderList(items) {
        if(!items) return false;
        return items.map((item) => {
            const index = _.findIndex(this.props.selectedUsers, {'type' : 'user', id: item.user.id} )
            if(index>=0) return false;
            // console.info(index)
            return (
                <li key={item.id}><a href="#" onClick={(e) => {this.onUserSelect(e,item)}}>{item.user.fullname}</a></li>
            );
        });
    }

    render() {
        
        const data = this.props.projectUsers
        if(!data) return false;
        return (
            <div className="control-filter">
                <div className="btn-group">
                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-user"></i> <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right">
                        {this.renderList(data)}
                    </ul>
                </div>
            </div>
        );
    }
}


// export default ControlNotifyPeople;


const mapStateToProps = (state) => {
    
    return {
        state : state,
        current_org: state.appdata.current_org,  // FETCH_APPDATA_CURRENTORG
        projectCurrent : state.project.current,  // FETCH_PROJECT_CURRENT 
        project_id : state.project.current.id,
        projectUsers : state.project.users,      // FETCH_PROJECT_USERS 
    };
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        dispatch,
        fetchProjectUsers: (project_id) => {
            dispatch(fetchProjectUsers(project_id)).then((response) => {
                
            });
        }
       
    }
}

const ControlProjectUsersDdlContainer = connect(mapStateToProps, mapDispatchToProps)(ControlProjectUsersDdl)

export default ControlProjectUsersDdlContainer
