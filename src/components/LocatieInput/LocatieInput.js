import React, { PropTypes } from 'react'

import {ProjectParkingHelper} from '../../helpers'

class LocatieInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            address: this.props.address,
            address_lat: this.props.address_lat,
            address_lng: this.props.address_lng,
            parkingItems: this.props.parkingItems,
            parkingItemsNew: [],
            markers: []
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
        this.gmapInit()
    }

    componentDidUpdate() {
        this.gmapInit()
    }

    gmapInit() {
        this.map = new google.maps.Map(document.getElementById('google-map'), {
            center: {lat: -33.8688, lng: 151.2195},
            zoom: 6,
            disableDefaultUI: true,
            streetViewControl: true,
            scrollwheel: false,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER,
            },
            styles: [{"featureType": "road","elementType": "geometry","stylers": [{"visibility": "off"}]},{"featureType": "administrative.province","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#77bc1f"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType": "road.highway","elementType": "labels","stylers": [{"visibility": "off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#ffffff"},{"visibility":"on"}]}],
        });
    

        var markers = [];

        // Add Project Address Marker
        var marker = new google.maps.Marker({
            map: this.map,
            position: new google.maps.LatLng(this.state.address_lat, this.state.address_lng),
        });
        markers.push(marker)

        // Add Parking Markders
        this.state.parkingItems.map((item, index) => {
            var marker = new google.maps.Marker({
                map: this.map,
                position: new google.maps.LatLng(item.lat, item.lon),
            });
            markers.push(marker)
        })

        // Auto Center Markers
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
            bounds.extend(markers[i].getPosition());
        }

        this.map.fitBounds(bounds);

        this.map_autocomplete_init()

        this.villa_autocomplete_init();
    }

    villa_autocomplete_init() {
        const _this = this;

        var inputbox = (document.getElementById('autocomplete-field'));

        var autocomplete = new google.maps.places.Autocomplete(inputbox);

        autocomplete.addListener('place_changed', function() {
            var place = autocomplete.getPlace();
            _this.setState({address: inputbox.value, address_lat: place.geometry.location.lat(), address_lng: place.geometry.location.lng()});
        });
    }

    map_autocomplete_init() {
        const _this = this;

        var defaultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(-33.8902, 151.1759),
            new google.maps.LatLng(-33.8474, 151.2631)
        );

        var i = 0;
        var options = {
            bounds: defaultBounds,
        };
        var input = document.getElementsByClassName('parking_address');

        let autocomplete = [];
        for (i = 0; i < input.length; i++) {
            let item_id = jQuery(input[i]).data('id')
            let input_elem = input[i];
            autocomplete[i] = new google.maps.places.Autocomplete(input[i], options);
            autocomplete[i].addListener('place_changed', function() {
                var place = this.getPlace();
                var latitude = place.geometry.location.lat();
                var longitude = place.geometry.location.lng();
                var address = jQuery(input_elem).val()
                // console.log(latitude);
                // console.log(longitude);
                _this.updateLatLng(item_id, address, latitude, longitude)
            });
        }
    }


    updateLatLng(item_id, address, lat, lng) {
        let newArray = [];
        this.state.parkingItems.map((item, index) => {
            if(item_id==item.id) {
                var clonedItem = Object.assign({}, item);
                clonedItem.address = address;
                clonedItem.lat = lat;
                clonedItem.lon = lng;
                newArray[index] = clonedItem;
            } else {
                newArray[index] = item;
            }
        })

        // console.log(newArray)
        // console.log(this.state.parkingItemsNew)
        this.setState({ parkingItems: newArray});
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
        // this.setState({ parkingItemsNew: this.state.parkingItemsNew.concat(newKey)});
        var obj = {
            id: newKey,
            address: '',
            lat: '',
            lon: '',
            is_new: 1
        }
        let newArray = [];
        this.state.parkingItems.map((item, index) => {
            newArray[index] = item;
        })
        newArray.push(obj);
        // console.log(newArray)
        // console.log(this.state.parkingItems)
        this.setState({ parkingItems: newArray});
    }


    handelDeleteParkingItem = (item) => {
        console.log(item)
        var newArray = this.state.parkingItems.filter((item_array, index) => {
            return (item_array.id!==item.id)
        })
        this.setState({parkingItems: newArray})
        // console.log(newArray)
        // ContactHelper.delete(id).then((response) => {
        //     this.props.onRowDeleted()
        // })
    }

    onInputChange() {

    }

    render() {
        return (
            <div className={'comp-locatieinput ' + this.props.className} ref="locatieinput">
                <div className="section-heading">
                    <h3>Adres</h3>
                </div>
                <div className="form-group">

                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-addon"><i className="fa fa-key"></i></div>
                        <input type="text" id="autocomplete-field" className="form-control" defaultValue={this.state.address} />
                        <input type="hidden" className="form-control" name="address" ref="address" value={this.state.address} onChange={()=>{this.onInputChange()}} />
                        <input type="hidden" className="form-control" name="address_lat" ref="address_lat" value={this.state.address_lat} onChange={()=>{this.onInputChange()}} />
                        <input type="hidden" className="form-control" name="address_lng" ref="address_lng" value={this.state.address_lng} onChange={()=>{this.onInputChange()}} />
                    </div>

                    {this.state.parkingItems.map(function(item, index) {
                        return (
                            <div className="input-group input-group--style-label" key={index}>
                                <span className="input-group-addon">
                                    <button type="button" className="btn btn-plain btn--nopad hover-show" onClick={(e) => this.handelDeleteParkingItem(item)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                    <i className="fa fa-link hover-hide"></i>
                                </span>
                                <input type="hidden" name={`parkingitem[${index}][id]`} defaultValue={item.id} />
                                <input type="text" className="form-control parking_address" defaultValue={item.address} data-id={item.id} />

                                <input type="hidden" className="form-control" name={`parkingitem[${index}][address]`} value={item.address} data-id={item.id} onChange={()=>{this.onInputChange()}} />

                                <input type="hidden" className="form-control" name={`parkingitem[${index}][lat]`} value={item.lat} onChange={()=>{this.onInputChange()}} />
                                <input type="hidden" className="form-control" name={`parkingitem[${index}][lon]`} value={item.lon} onChange={()=>{this.onInputChange()}} />
                                <input type="text" className="form-control" name={`parkingitem[${index}][is_paid]`} defaultValue={item.is_paid} />
                                <input type="text" className="form-control" name={`parkingitem[${index}][price]`} defaultValue={item.price} />

                                <input type="hidden" className="form-control" name={`parkingitem[${index}][is_new]`} defaultValue={item.is_new} />
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
                        <div id="google-map" className="google-map" ref="gmap"></div>
                    </div>
                </div>
            </div>
        );
    }
}
LocatieInput.propTypes = {
    
};

export default LocatieInput