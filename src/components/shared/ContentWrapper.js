import React, { Component, PropTypes } from 'react'

export default class ContentWrapper extends Component {
    componentWillMount() {
        console.log(this.props);

        this.sidebarClass = this.props.hasSidebar ? ' has-sidebar' : '';
    }
    render() {
        return ( < div className = { 'content-wrapper' + this.sidebarClass }
            id = { this.props.id } > { this.props.children } < /div>
        )
    }
}
