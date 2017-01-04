import React, { PropTypes } from 'react'


class OfferRequestList extends React.Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {        
        className: '',
        theme: '',
        items: []
        
    }

    

    componentDidMount() {
  
       
    }

  

    render() {
        return (
            <div className={'comp-offerrequestlist ' + this.props.className} ref="offerrequestlist">
   
            
   
              
            </div>
        );
    }
}
OfferRequestList.propTypes = {
    
};

export default OfferRequestList