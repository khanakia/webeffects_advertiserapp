import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {connectWithStore} from '../../store/index.js';

// import CompanyHelper from '../../helpers/helper_company'
import { fetchProjectUsers } from '../../actions/action_project';

class ControlAssignPeople extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        onChange : function() {},

        className : '',
        name : 'assignpeoples[]',

        selectedUsers : [],

        project_id : '',
        projectUsers : []
    }

    componentWillMount() {
        this.props.fetchProjectUsers(this.props.project_id)
    }
    
    componentDidMount() {
        // this.selectpickerInit();
    }

    shouldComponentUpdate = (nextProps, nextState, nextContext) => {
        return !(nextProps.projectUsers == this.props.projectUsers);
    }

    componentDidUpdate() {
        this.selectpickerInit();
        // console.info("Controlassignpeople componentDidUpdate")
    }

    selectpickerInit() {
        jQuery(this.refs.controlassignpeople).selectpicker('destroy'); // Destroy already initiated instance so we can reinit it with new data
        
        jQuery(this.refs.controlassignpeople).selectpicker({
            actionsBox : true,
            liveSearch : true,
            size: 6
        });

        // Set Selected Values
        jQuery(this.refs.controlassignpeople).selectpicker('val', _.map(this.props.selectedUsers, 'id'));
        
    }

    renderList(items) {
        return items.map((item) => {
            return (
                <option key={item.id} value={item.user_id} >{item.user.fullname}</option>
            );
        });
    }

    render() {
        
        const data = this.props.projectUsers
        return (
            <div className="control-controlassignpeople">
                <select className={ 'controlassignpeople' + this.props.className} ref="controlassignpeople" name={this.props.name} onChange={(e) => this.props.onChange(e)} multiple={true} >
                    {this.renderList(data)}
                </select>
            </div>
        );
    }
}


// export default ControlAssignPeople;


const mapStateToProps = (state) => {
    
    return {
        state : state,
        current_org: state.appdata.current_org,  // FETCH_APPDATA_CURRENTORG
        projectUsers : state.project.users,      // FETCH_PROJECT_USERS 
        projectCurrent : state.project.current,  // FETCH_PROJECT_CURRENT 
        project_id : state.project.current.id
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

const ControlAssignPeopleContainer = connectWithStore(ControlAssignPeople, mapStateToProps, mapDispatchToProps)

export default ControlAssignPeopleContainer
