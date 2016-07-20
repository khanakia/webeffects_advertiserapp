import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactDOM from 'react-dom'

import { hashHistory } from 'react-router'

// import Header from '../components/Header'
import Header from '../containers/HeaderContainer'



export default class Layout extends Component {
    componentWillMount() {
        // hashHistory.push('login')
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
