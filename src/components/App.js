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
        // this.props.fethcInitialData()
        this.props.fetchCurrentUser()
        this.props.fetchProjects()
    }

    componentDidMount() {
        
    }

    componentDidUpdate() {
       
    }

    onDataUpdate = (response) => {  
        if(response.success=="ok") {
            // toastr.success(trans.resetpwd_reset_successfully)
            
            setTimeout(function() {
                window.location.reload()
            }, 1000); 
        } else {
            // toastr.error(trans[response.message])
        }
    }


    render() {
        if(jQuery.isEmptyObject(this.props.current_user)) {
            return false
        }

        if(this.props.current_user.has_changed_pwd==false) {
            if(undefined==window.ChangePasswordForm_popupid) {
                PopupHelper.showChangePasswordForm({layout: 'layout1', onDataUpdate: this.onDataUpdate})
            }
        }
        
        return (
          <div id="main">
            <Header userTitle={this.props.current_user.name ? this.props.current_user.name : this.props.current_user.email} project_list={this.props.project_list.data} />
            <div id="main-inner">
                {this.props.children}
            </div>
          </div>
        )
    }

}
