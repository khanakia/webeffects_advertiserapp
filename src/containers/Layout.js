import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactDOM from 'react-dom'

import Header from '../containers/HeaderContainer'

export default class Layout extends Component {

    componentWillMount() {
      
    }

    componentDidMount() {
        
    }

    render() {
        return (
          <div>
            <Header />
            <section id="content">
                {this.props.children}
            </section>
          </div>
        )
    }

}
