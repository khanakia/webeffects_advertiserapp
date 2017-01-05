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
        var map = new google.maps.Map(document.getElementById('google-map'), {
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

        var inputbox = (document.getElementById('autocomplete-field'));

        var autocomplete = new google.maps.places.Autocomplete(inputbox);
        autocomplete.bindTo('bounds', map);

        var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29)
        });

        autocomplete.addListener('place_changed', function() {
            marker.setVisible(false);
            var place = autocomplete.getPlace();

            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);  // Why 17? Because it looks good.
            }

            marker.setIcon(/** @type {google.maps.Icon} */({
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            }));

            marker.setPosition(place.geometry.location);
            marker.setVisible(true);

            var latitude = place.geometry.location.lat();
            var longitude = place.geometry.location.lng();
            console.log(latitude);
            console.log(longitude);

            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }
        });
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
                        <input type="text" id="autocomplete-field" className="form-control" name="address" ref="address" defaultValue={this.props.address} />
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