import React, { PropTypes } from 'react'

import {ProjectVideoHelper} from '../../helpers'
import InputBox from './InputBox'
class EmailInput extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            items: this.props.items,
            itemsNew: [],
        }
    }

    static defaultProps = {        
        className: '',
        name: 'contact_emails[]',
        theme: '',
        items: [],
        reset: false
    }

    

    componentDidMount() {
       
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.reset) {
            this.setState({items: nextProps.items, itemsNew: []})
        }

        // console.info("this.project_videos.items", nextProps.items)

    }
    
    handleAddClick() {
        var newKey = (_.last(this.state.items)||0)+1
        let items = Object.assign([], this.state.items); 
        items.push('');

        // this.setState({ items: this.state.items.push('')});
        this.setState({ items: items});
        // console.log(items)
    }

    handleRemoveRow(index) {
        // console.log(index)
        let items = Object.assign([], this.state.items); 
        // console.log(items);
        
        let filteredItems = items.filter((_, i) => i!==index);
        this.setState({ items: filteredItems});
        // this.setState({items: items.filter((_, i) => i!==index)})
    }

  

    render() {
        var _this = this;
        
        
        return (
            <div className={'EmailInput input-group-vmerge' + this.props.className} ref="EmailInput">
                <div className="fields" ref="fieldsWrapper">

                </div>

                {this.state.items.map(function(item, index) {

                    return (
                        
                        <div className={"input-group "} key={index}>
                            
                            <span className="input-group-addon">
                                <button type="button" className="btn btn-plain btn--nopad hover-show" onClick={(e) => this.handleRemoveRow(index)}>
                                    <i className="iconc-trash"></i>
                                </button>
                                <i className={`hover-hide iconc iconc-mail`}></i>
                            </span>
                            <InputBox type="text" className="form-control" name={`${this.props.name}`} value={item} />
                        </div>
                    )
                }, this)}


                <div className="input-group">
                    <span className="input-group-addon">
                        <button type="button" className="btn btn-plain btn--nopad" onClick={() => this.handleAddClick()}>
                            <i className="iconc-plus"></i>
                        </button>
                    </span>
                    <input type="text" className="form-control" defaultValue={trans.pageProject_email_placeholder} readOnly />
                </div>
            
              
            </div>
        );
    }
}
EmailInput.propTypes = {
    
};

export default EmailInput