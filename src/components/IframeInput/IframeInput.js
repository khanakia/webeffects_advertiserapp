import React, { PropTypes } from 'react'

import {ProjectIframeHelper} from '../../helpers'
class IframeInput extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            itemsNew: [],
        }
    }

    static defaultProps = {        
        className: '',
        theme: '',
        items: [],
        onIframeDeleted: function(){}
    }

    

    componentDidMount() {
       
    }

    componentWillReceiveProps(nextProps) {
        // If nextProp item are greater than current prop items it means user clicked the Save button so clear all the Newitems in state input because they already saved and will show as NextProp items
        if(nextProps.items.length > this.props.items.length) {
            this.setState({itemsNew: []})
        }

    }
    
    handleAddClick() {
        var newKey = (_.last(this.state.itemsNew)||0)+1
        this.setState({ itemsNew: this.state.itemsNew.concat(newKey)});
    }

    handleRemoveRow(index) {
        var items = this.state.itemsNew
        this.setState({itemsNew: items.filter((_, i) => i!==index)})
    }

    removeField(index) {
        console.log(index)
    }

    deleteProjectIframe(id) {
        ProjectIframeHelper.delete(id).then((response) => {
            this.props.onIframeDeleted()
        })
        
    }

    render() {
        var _this = this;
        
        return (
            <div className={'IframeInput input-group-vmerge' + this.props.className} ref="IframeInput">
                <div className="fields" ref="fieldsWrapper">

                </div>

                {this.props.items.map(function(item, index) {
                    
                    return (
                        
                            
                        <div className="input-group" key={index}>
                            <span className="input-group-addon">
                                <button type="button" className="btn btn-plain btn--nopad hover-show" onClick={(e) => this.deleteProjectIframe(item.id)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                                <i className="fa fa-link hover-hide"></i>
                            </span>
                            <input type="text" className="form-control" name="iframe_tag[]" defaultValue={item.tag} />
                            <input type="hidden" className="form-control" name="iframe_id[]" defaultValue={item.id} />
                        </div>

                        
                    )
                }, this)}

                {this.state.itemsNew.map(function(key, index) {
                    
                    return (
                        <div className="input-group" key={key}>
                            <span className="input-group-addon">
                                <button type="button" className="btn btn-plain btn--nopad" onClick={() => this.handleRemoveRow(index)}>
                                    <i className="fa fa-link"></i>
                                </button>
                            </span>
                            <input type="text" className="form-control" name="iframe_tag_new[]" />
                        </div>
                    )
                }, this)}


                <div className="input-group">
                    <span className="input-group-addon">
                        <button type="button" className="btn btn-plain btn--nopad" onClick={() => this.handleAddClick()}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </span>
                    <input type="text" className="form-control" defaultValue="360 graden tour iframe toevoegen" readOnly />
                </div>
            
              
            </div>
        );
    }
}
IframeInput.propTypes = {
    
};

export default IframeInput