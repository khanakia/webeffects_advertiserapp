import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Sidebar extends Component {
  componentWillMount() {
    
  }
  render() {
    return (
		<div className="container-fluid page-panel" id="{this.props.id}">
				{this.props.children}
		</div>
    )
  }
}

