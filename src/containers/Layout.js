import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactDOM from 'react-dom'

import Header from '../containers/HeaderContainer'

export default class Layout extends Component {

    componentWillMount() {
        this.props.fetchData()
    }

    componentDidMount() {
        
    }

    render() {
        if (jQuery.isEmptyObject(this.props.current_org) || jQuery.isEmptyObject(this.props.current_user)) return false;

        return (
          <div>
            <Header {...this.props}/>
            <section id="content">
                {this.props.children}
            </section>
          </div>
        )
    }

}
