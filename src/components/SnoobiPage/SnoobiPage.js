import React, { PropTypes } from 'react'

class SnoobiPage extends React.Component {

    constructor(props) {
        super(props);
    }


    componentWillMount() {
    }

    componentDidMount() {

    }

    static defaultProps = {        
        className: '',
        theme: '',
        items: []
        
    }
  

    render() {
        return (
            <div>
                Snoobi Page
            </div>
        ) 
    }
}
SnoobiPage.propTypes = {
    
};

export default SnoobiPage