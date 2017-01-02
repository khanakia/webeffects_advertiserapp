import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactDOM from 'react-dom'


import Header from './shared/Header'
export default class AppContainer extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        project_list: []
    }

    componentWillMount() {
        this.props.fetchProjects()
    }

    componentDidMount() {
        
    }

    render() {
        if(jQuery.isEmptyObject(this.props.project_list)) {
            return false
        }

        
        return (
          <div id="main">
            <Header project_list={this.props.project_list} />
            <div id="main-inner">
                {this.props.children}
            </div>
          </div>
        )
    }

}
