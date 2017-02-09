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
        name: 'project_iframes',
        theme: '',
        items: [],
        onIframeDeleted: function(){},
        reset: false
    }

    

    componentDidMount() {
       
    }

    componentWillReceiveProps(nextProps) {
        // If nextProp item are greater than current prop items it means user clicked the Save button so clear all the Newitems in state input because they already saved and will show as NextProp items
        // if(nextProps.items.length > this.props.items.length) {
        //     this.setState({itemsNew: []})
        // }

        if(nextProps.reset) {
            this.setState({items: nextProps.items, itemsNew: []})
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
        // ProjectIframeHelper.delete(id).then((response) => {
        //     this.props.onIframeDeleted()
        // })

        let items = Object.assign([], this.state.items); 
        console.log(items);
        items.map(function(item,index) {
            if(item.id==id) {
                item.is_deleted = 1;
            }
        })
        this.setState({ items: items});
        
    }

    render() {
        var _this = this;
        
        return (
            <div className={'IframeInput input-group-vmerge' + this.props.className} ref="IframeInput">
                <div className="fields" ref="fieldsWrapper">

                </div>

                {this.state.items.map(function(item, index) {
                    const cssClassHidden = (item.is_deleted==true) ? 'hidden' : 'abc';
                    // console.log("cssClassHidden", cssClassHidden, item.is_deleted)

                    return (
                        
                            
                        <div className={"input-group " + cssClassHidden} key={item.id}>
                            <span className="input-group-addon">
                                <button type="button" className="btn btn-plain btn--nopad hover-show" onClick={(e) => this.deleteProjectIframe(item.id)}>
                                    <i className="iconc-trash"></i>
                                </button>
                                <i className="fa fa-link hover-hide"></i>
                            </span>
                            
                            <input type="text" className="form-control" name={`${this.props.name}[${index}][tag]`} defaultValue={item.tag} />
                            <input type="hidden" className="form-control" name={`${this.props.name}[${index}][id]`} defaultValue={item.id} />
                            <input type="hidden" className="form-control" name={`${this.props.name}[${index}][is_new]`} defaultValue={item.is_new} />
                            <input type="hidden" className="form-control" name={`${this.props.name}[${index}][is_deleted]`} defaultValue={item.is_deleted} />
                        </div>

                        
                    )
                }, this)}

                {this.state.itemsNew.map(function(key, index) {
                    
                    var uniq_id = (new Date()).getTime();

                    // this is to prevent same input index for above already saved items
                    const indexInput = index + 100;

                    return (
                        <div className="input-group" key={index}>
                            <span className="input-group-addon">
                                <button type="button" className="btn btn-plain btn--nopad" onClick={() => this.handleRemoveRow(index)}>
                                    <i className="iconc-link"></i>
                                </button>
                            </span>
                            <input type="hidden" className="form-control" name={`${this.props.name}[${indexInput}][id]`} defaultValue={uniq_id} />
                            <input type="text" className="form-control" name={`${this.props.name}[${indexInput}][tag]`} />
                            <input type="hidden" className="form-control" name={`${this.props.name}[${indexInput}][is_new]`} defaultValue='1' />
                            <input type="hidden" className="form-control" name={`${this.props.name}[${indexInput}][is_deleted]`} defaultValue='0' />
                        </div>
                    )
                }, this)}


                <div className="input-group">
                    <span className="input-group-addon">
                        <button type="button" className="btn btn-plain btn--nopad" onClick={() => this.handleAddClick()}>
                            <i className="iconc-plus"></i>
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