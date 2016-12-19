import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactDOM from 'react-dom'

export default class AppContainer extends Component {

    componentWillMount() {
        
    }

    componentDidMount() {
        
    }

    render() {
        return (
          <div id="main">
            <section id="content">
                {this.props.children}

            </section>
          </div>
        )
    }

}
