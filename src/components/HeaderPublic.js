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

        var logoStyle = {
            backgroundImage: "url(" + Env.logo_path + ")"
        };


        return (
            <header className="headerPublic-wrapper">
            	<div className="img-wrapper">
            		<div className="logo" style={logoStyle}></div>
            	</div>
            </header>
        );
    }
}


HeaderPublic.propTypes = {
    
};

export default HeaderPublic