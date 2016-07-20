import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Sidebar extends Component {
  componentWillMount() {
    
  }
  render() {
    return (
		<div className="sidebar">
			<div className="sidebar-wrapper">
				{this.props.children}
			</div>
		</div>
    )
  }
}

