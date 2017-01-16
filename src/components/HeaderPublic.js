import React, { Component } from 'react';


class HeaderPublic extends Component {

    constructor(props) {
        super(props);
        
    }

    static defaultProps = {
    }

    componentDidMount() {
        
    }

    compoentDidUpdate() {
           
    }
    
    render() {

        return (
            <header className="headerPublic-wrapper">
            	<div className="img-wrapper">
            		<div className="logo"></div>
            	</div>
            </header>
        );
    }
}


HeaderPublic.propTypes = {
    
};

export default HeaderPublic