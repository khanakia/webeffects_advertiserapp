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
        
    }


    render() {
        console.log('RENDEREDDD NEEE', this.props.data)
        
        return (
            <div className="DemoComp">
                DEMO COMP
                 <input type="text" className="message_title w50 required" name="message_title" value={this.props.data.message_title} />
            </div>
        );
    }
}


export default DemoComp;
