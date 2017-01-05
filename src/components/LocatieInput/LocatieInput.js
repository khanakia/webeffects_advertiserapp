import React, { PropTypes } from 'react'

import {ProjectParkingHelper} from '../../helpers'

class LocatieInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            parkingItems: []
        }
    }

    static defaultProps = {        
        className: '',
        theme: '',
        items: [],

        province_id: '',
        plaat_id: '',
        gebied_id: '',
        distance: '',
        address: '',
        address_lat: '',
        address_lng: '',
        parkingItems: [],


        onRowDeleted: function(){}
    }

    

    componentDidMount() {
  
       
    }


    componentWillReceiveProps(nextProps) {
        // If nextProp item are greater than current prop items it means user clicked the Save button so clear all the Newitems in state input because they already saved and will show as NextProp items
        if(nextProps.items.length > this.props.items.length) {
            this.setState({parkingItems: []})
        }

    }

    handleAddClick() {
        // var itemsNew = this.state.itemsNew.length;
        var newKey = (_.last(this.state.parkingItems)||0)+1
        this.setState({ parkingItems: this.state.parkingItems.concat(newKey)});
    }

    handleRemoveRow(index) {
        var items = this.state.parkingItems
        this.setState({parkingItems: items.filter((_, i) => i!==index)})
    }

    handelDeleteParkingItem = (id) => {
        // ContactHelper.delete(id).then((response) => {
        //     this.props.onRowDeleted()
        // })
    }

  

    render() {
        return (
            <div className={'comp-locatieinput ' + this.props.className} ref="locatieinput">
                <div className="form-group">

                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-addon"><i className="fa fa-key"></i></div>
                        <input type="text" className="form-control" name="address" ref="address" defaultValue={this.props.address} />
                        <input type="text" className="form-control" name="address_lat" ref="address_lat" defaultValue={this.props.address_lat} />
                        <input type="text" className="form-control" name="address_lng" ref="address_lng" defaultValue={this.props.address_lng} />
                    </div>

                    {this.props.parkingItems.map(function(item, index) {
                        return (
                            <div className="input-group input-group--style-label" key={`z-${item.id}`}>
                                <span className="input-group-addon">
                                    <button type="button" className="btn btn-plain btn--nopad hover-show" onClick={(e) => this.handelDeleteParkingItem(index)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                    <i className="fa fa-link hover-hide"></i>
                                </span>
                                <input type="hidden" name={`parkingitem[${index}][id]`} defaultValue={item.id} />
                                <input type="text" className="form-control" name={`parkingitem[${index}][address]`} defaultValue={item.address} />
                                <input type="text" className="form-control" name={`parkingitem[${index}][lat]`} defaultValue={item.lat} />
                                <input type="text" className="form-control" name={`parkingitem[${index}][lon]`} defaultValue={item.lon} />
                                <input type="text" className="form-control" name={`parkingitem[${index}][is_paid]`} defaultValue={item.is_paid} />
                                <input type="text" className="form-control" name={`parkingitem[${index}][price]`} defaultValue={item.price} />
                            </div>
                        )
                    }, this)}

                    {this.state.parkingItems.map(function(item, index) {
                        return (
                            <div className="input-group input-group--style-label" key={`z-${item}`}>
                                <span className="input-group-addon">
                                    <button type="button" className="btn btn-plain btn--nopad hover-show" onClick={(e) => this.handleRemoveRow(index)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                    <i className="fa fa-link hover-hide"></i>
                                </span>
                                <input type="hidden" name={`parkingitem_new[${index}][id]`} defaultValue={item.id} />
                                <input type="text" className="form-control" name={`parkingitem_new[${index}][address]`} defaultValue={item.address} />
                                <input type="text" className="form-control"  name={`parkingitem_new[${index}][lat]`} defaultValue={item.lat} />
                                <input type="text" className="form-control" name={`parkingitem_new[${index}][lon]`} defaultValue={item.lon} />
                                <input type="text" className="form-control" name={`parkingitem_new[${index}][is_paid]`} defaultValue={item.is_paid} />
                                <input type="text" className="form-control" name={`parkingitem_new[${index}][price]`} defaultValue={item.price} />
                            </div>
                        )
                    }, this)}


                    <div className="input-group input-group--style-label">
                        <span className="input-group-addon">
                            <button type="button" className="btn btn-plain btn--nopad" onClick={(e) => this.handleAddClick()}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </span>
                        <label>Zaal toevoegen</label>
                    </div>

                    <div>
                        <div ref="gmap"></div>
                    </div>
                </div>
            </div>
        );
    }
}
LocatieInput.propTypes = {
    
};

export default LocatieInput