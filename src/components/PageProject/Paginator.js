import React, { PropTypes } from 'react'

import {ProjectIframeHelper} from '../../helpers'
class IframeInput extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            items: this.props.items,
            itemsNew: [],
        }
    }

    static defaultProps = {        
        className: '',
        onIframeDeleted: function(){},
        reset: false
    }

    

    componentDidMount() {
       
    }

    componentWillReceiveProps(nextProps) {

    }
 

    render() {
                
        return (
            <div className={'paginator-wrapper' + this.props.className} ref="paginator">
                
              
            </div>
        );
    }
}
IframeInput.propTypes = {
    
};

export default IframeInput