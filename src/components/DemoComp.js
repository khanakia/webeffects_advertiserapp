import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class DemoComp extends Component {
    constructor(props, context) {
        super(props);



    }

    
    static defaultProps = {
      
    }

    componentWillMount() {
   
    }

    componentDidMount() {
        console.log(this.context.redux);
    }


    render() {
        
        
        return (
            <div className="DemoComp">
                DEMO COMP
            </div>
        );
    }
}


export default DemoComp;
