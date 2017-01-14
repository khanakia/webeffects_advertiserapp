import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactDOM from 'react-dom'

import PopupHelper from 'helpers/helper_popup'
import Header from './shared/Header'
export default class AppContainer extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        project_list: []
    }

    componentWillMount() {
        this.props.fetchCurrentUser()
        this.props.fetchProjects()
    }

    componentDidMount() {
        
    }

    onDataUpdate = (response) => {  
        if(response.status=="ok") {
            toastr.success(trans.resetpwd_reset_successfully)
            window.location.reload()
        } else {
            toastr.error(trans[response.message])
        }
    }


    render() {
        if(jQuery.isEmptyObject(this.props.project_list) || jQuery.isEmptyObject(this.props.current_user)) {
            return false
        }

        if(this.props.current_user.has_changed_pwd==false) {
            PopupHelper.showChangePasswordForm({layout: 'layout1', onDataUpdate: this.onDataUpdate})
        }
        
        return (
          <div id="main">
            <Header userTitle={this.props.current_user.name} project_list={this.props.project_list} />
            <div id="main-inner">
                {this.props.children}
            </div>
          </div>
        )
    }

}
