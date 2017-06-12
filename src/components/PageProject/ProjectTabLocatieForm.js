import React, { PropTypes } from 'react'

import {ProjectParkingHelper, UtilHelper} from 'helpers'

import {ROOT_URL} from '../../config'

import DropdownList from '../DropdownList'
import InputBox from './InputBox'
import TextareaBox from './TextareaBox'
import InputBoxGoogleAutocomplete from './InputBoxGoogleAutocomplete'

class ProjectTabLocatieForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            address: this.props.address,
            address_lat: this.props.address_lat,
            address_lng: this.props.address_lng,
            ligging: this.props.ligging,
            parkeren: this.props.parkeren,
            parkingItems: this.props.parkingItems,
            parkingItemsNew: [],
            markers: [],
        }

        this.mapDefault = {
            lat: 52.3745291,
            lng: 4.7585319
        }

        this.tableObject = {
            id: null,
            project_id: null,
            address: '',
            lat: '',
            lon: '',
            is_paid: 0,
            price: 0,
            is_new: 1,
            is_deleted: 0
        }
    }

    static defaultProps = {        
        className: '',
        theme: '',
        items: [],

        itemsProvice: [],
        itemsPlaats: [],
        itemsGebied: [],
        selectedProvinceId: '',
        selectedPlaatId: '',
        selectedGebiedId: '',

        radius: '',

        distance: '',
        address: '',
        address_lat: '',
        address_lng: '',
        ligging: '',
        parkeren: '',
        parkingItems: [],
        onRowDeleted: function(){},

        reset: false,

        compare_json: []
    }

    componentDidMount() {
        this.gmapInit()
        this.priceChange();
        this.handleChange();
    }

    componentDidUpdate() {
        this.gmapInit()
    }

    componentWillReceiveProps(nextProps) {
        // console.log("nextProps.reset", nextProps.reset)
        if(nextProps.reset) {
            this.setState({
                address: nextProps.address,
                address_lat: nextProps.address_lat,
                address_lng: nextProps.address_lng,
                parkingItems: nextProps.parkingItems,
                parkingItemsNew: [],

            })
        }

    }

    handleRefresh = () => {
        // google.maps.event.trigger(this.map, 'resize')
        this.gmapInit()
    }

    gmapInit() {

        var center_lat = this.state.address_lat || this.mapDefault.lat;
        var center_lng = this.state.address_lng || this.mapDefault.lng;

        this.map = new google.maps.Map(document.getElementById('google-map'), {
            center: {lat: center_lat, lng: center_lng},
            zoom: 5,
            disableDefaultUI: true,
            streetViewControl: true,
            scrollwheel: false,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM,
            },
            styles: [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}],
        });

        var markers = [];

        // Add Project Address Marker
        if(this.state.address_lat) {
            var marker = new google.maps.Marker({
                map: this.map,
                icon: ROOT_URL+'/images/marker.png',
                position: new google.maps.LatLng(this.state.address_lat, this.state.address_lng),
            });
            markers.push(marker)
        }

        // Add Parking Markders
        this.state.parkingItems.map((item, index) => {
            if(!item.is_deleted) {
                var icontype = item.is_paid ? "parking-paid" : "parking";

                // console.log(icontype);
                var marker = new google.maps.Marker({
                    map: this.map,
                    icon: ROOT_URL+'/images/'+icontype+'-marker.png',
                    position: new google.maps.LatLng(item.lat, item.lon),
                });
                markers.push(marker)
            }
        })

        // Auto Center Markers
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
            bounds.extend(markers[i].getPosition());
        }

        // console.log("markers", markers)
        if(markers.length>1) {
            this.map.fitBounds(bounds);            
        }
        if(markers.length==1) {
            this.map.setZoom(7)
        }
        this.map_autocomplete_init()

        // this.villa_autocomplete_init();
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

 

    handleAddClick() {
        // var itemsNew = this.state.itemsNew.length;
        // var newKey = (_.last(this.state.parkingItems)||0)+1
        // console.log(newKey);
        var uniq_id = (new Date()).getTime();
        // this.setState({ parkingItemsNew: this.state.parkingItemsNew.concat(newKey)});
        var obj = {
            id: uniq_id,
            project_id: null,
            address: '',
            lat: '',
            lon: '',
            is_paid: 0,
            price: 0,
            is_new: 1,
            is_deleted: 0
        }

        let newArray = [];
        this.state.parkingItems.map((item, index) => {
            newArray[index] = item;
        })
        newArray.push(obj);
        this.setState({ parkingItems: newArray});
        


    }


    handelDeleteParkingItem = (itemParking) => {
        // console.log(item)
        // var newArray = this.state.parkingItems.filter((item_array, index) => {
        //     return (item_array.id!==item.id)
        // })
        // this.setState({parkingItems: newArray})
        

        let items = Object.assign([], this.state.parkingItems); 
        // console.log(items);
        items.map(function(item,index) {
            if(item.id==itemParking.id) {
                item.is_deleted = 1;
            }
        })
        this.setState({ parkingItems: items});



    }

    onInputChange() {

    }

    handleChange() {
        const _this = this;
        jQuery(".price-icon input").each(function(){
            var inputvalue = jQuery(this).data("checked");
            if (inputvalue == 1) {
                jQuery(this).prop('checked', true);
            } else {
                jQuery(this).prop('checked', false);
            }
            _this._priceChange(this);
        });
    }

    priceChange(event) {
        const _this = this;
        jQuery(document).on("change", ".price-icon input", function(){
            _this._priceChange(this);
        });
    }

    _priceChange(element){
        if(jQuery(element).prop("checked") == true) {
            jQuery(element).parents(".price-icon").addClass("active");
            jQuery(element).parents(".input-group-custom").find(".price-field").css("position", "static");
        } else {
            jQuery(element).parents(".price-icon").removeClass("active");
            jQuery(element).parents(".input-group-custom").find(".price-field").css("position", "absolute");
        }
    }

    handleIsPaidCheckboxChange = (e, index) => {
        var state = Object.assign({}, this.state);
        state.parkingItems[index].is_paid = e.target.checked;
        this.setState({
            parkingItems: state.parkingItems
        })
        // console.log(state.parkingItems)
        // console.log(e.target.checked)
    }

    onAddressChange = (address, latitude, longitude, itemId) => {
        this.updateLatLng(itemId, address, latitude, longitude)
    }

    onProjectAddressChange = (address, latitude, longitude, itemId) => {
       this.setState({address: address, address_lat: latitude, address_lng: longitude});
    }
    
    // onRadiusChange = (item) => {
    //     // console.log(item)

    //     if(this.state.address_lat) {
    //         var pyrmont = new google.maps.LatLng(this.state.address_lat, this.state.address_lng);

    //     } else {
    //         var pyrmont = new google.maps.LatLng(this.mapDefault.lat,this.mapDefault.lng);
    //     }

    //     var request = {
    //         location: pyrmont,
    //         radius: item.value,
    //         types: ['parking']
    //     };

    //     var service = new google.maps.places.PlacesService(this.map);
    //     service.nearbySearch(request, this.googleParkingPlaceServiceCallback);

    //     // function callback(results, status) {
    //     //   if (status == google.maps.places.PlacesServiceStatus.OK) {
    //     //     for (var i = 0; i < results.length; i++) {
    //     //       var place = results[i];
    //     //       console.log(place)
    //     //     }
    //     //   }
    //     // }
    // }

    findParkingsinRadius = () => {
        if(this.state.address_lat) {
            var pyrmont = new google.maps.LatLng(this.state.address_lat, this.state.address_lng);

        } else {
            var pyrmont = new google.maps.LatLng(this.mapDefault.lat,this.mapDefault.lng);
        }

        var request = {
            location: pyrmont,
            radius: 500,
            types: ['parking']
        };

        var service = new google.maps.places.PlacesService(this.map);
        service.nearbySearch(request, this.googleParkingPlaceServiceCallback);
    }

    googleParkingPlaceServiceCallback = (results, status) => {
        let items = Object.assign([], this.state.parkingItems); 
        
        var newKey = (_.last(this.state.parkingItems)||0)
        var uniq_id = (new Date()).getTime();

        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                    
                    var tableObj = Object.assign([], this.tableObject);
                    tableObj.id = uniq_id++;
                    tableObj.lat = place.geometry.location.lat();
                    tableObj.lon = place.geometry.location.lng();
                    tableObj.address = place.name;
                    items.push(tableObj);
            }
        }

        this.setState({ parkingItems: items});
    }
    

    render() {
        // console.log("this.state.parkingItems", this.state.parkingItems)
        // console.log("this.state.parkingItemsNew", this.state.parkingItemsNew)
        const countitems = [
            {"value": 1000, "title": '+1 km'},
            {"value": 2000, "title": '+2 km'},
            {"value": 3000, "title": '+3 km'},
            {"value": 4000, "title": '+4 km'},
            {"value": 5000, "title": '+5 km'},
        ]
        const itemsprovice = this.props.itemsProvice;
        const itemsplaats = this.props.itemsPlaats;
        const itemsgebied = this.props.itemsGebied;


        const class_ligging = UtilHelper.compareJsonGetClass('ligging', this.props.compare_json);
        const class_parkeren = UtilHelper.compareJsonGetClass('parkeren', this.props.compare_json);
        const class_province_id = UtilHelper.compareJsonGetClass('province_id', this.props.compare_json);
        const class_plaat_id = UtilHelper.compareJsonGetClass('plaat_id', this.props.compare_json);
        const class_gebied_id = UtilHelper.compareJsonGetClass('gebied_id', this.props.compare_json);
        const class_address = UtilHelper.compareJsonGetClass('address', this.props.compare_json);
        const class_project_parkings = UtilHelper.compareJsonGetClass('project_parkings', this.props.compare_json);

        return (
            <div className={'comp-locatieinput ' + this.props.className} ref="locatieinput">
                {/*<button type="button" onClick={this.handleRefresh}>REFRESH</button>*/}
                
         
                <div className="form-group input-group-vmerge mt20">
                    <label className={class_ligging}>{trans.locatieInput_ligging}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_ligging}></a>
                    </label>
                    <div className="row">
                        <div className="col-md-4">
                            <TextareaBox className="form-control" name={`ligging`} value={this.props.ligging} />
                        </div>
                    </div>
                </div>


                <div className="form-group section-data">
                    <label className={class_ligging}>{trans.locatieInput_locations}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_locatie_titles}></a>
                    </label>
                    <span className={"wp200 " + class_province_id}>
                        <DropdownList items={itemsprovice} selectedValue={this.props.selectedProvinceId} name="province_id" emptyPlaceholder={trans.select_empty_placeholder_province} />
                    </span>
                    <span className={"wp200 " + class_gebied_id}>
                        <DropdownList items={itemsgebied} selectedValue={this.props.selectedGebiedId} name="gebied_id" emptyPlaceholder={trans.select_empty_placeholder_regio} isDefaultEmpty={true} />
                    </span>
                    <span className={"wp200 " + class_plaat_id}>
                        <DropdownList items={itemsplaats} selectedValue={this.props.selectedPlaatId} name="plaat_id" emptyPlaceholder={trans.select_empty_placeholder_plaats} />
                    </span>
                </div>

                <div className="form-group input-group-vmerge">
                    <label className={class_parkeren}>{trans.locatieInput_parkeren}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_parkeren}></a>
                    </label>
                    <div className="row">
                        <div className="col-md-4">
                            <TextareaBox className="form-control" name={`parkeren`} value={this.props.parkeren} />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label className={class_address + class_project_parkings}>{trans.locatieInput_adres}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_address}></a>
                    </label>
                </div>
                
                <div className="form-group mt20">
                    <div className="section-zoek">
                        <span>{trans.locatieInput_zoek}</span> <br/>
                        <button ref="submit" type="button" className="btn btn-green btn--round" onClick={()=>{this.findParkingsinRadius()}}>{trans.locatieInput_zoek_parkeerplaatsen}</button>
                        {/*<span className="zoek_text">{trans.locatieInput_zoek}</span>
                                            <span className="short-dropdown">
                                                <DropdownList items={countitems} selectedValue={3} name="" onItemChange={this.onRadiusChange} emptyPlaceholder={trans.select_empty_placeholder} />
                                            </span>*/}
                        
                    </div>
                </div>

                
                <div className="form-group clonable-wrapper">
                    <div className="input-group-custom">
                        <div className="input-group-addon"><i className="iconc-location-pointer"></i></div>
                        {/*<input type="text" id="autocomplete-field" className="form-control" defaultValue={this.state.address} />*/}
                         <InputBoxGoogleAutocomplete type="text" className="form-control" value={this.state.address}  onAddressChange={this.onProjectAddressChange} />

                        <input type="hidden" className="form-control" name="address" ref="address" value={this.state.address || ''} onChange={()=>{this.onInputChange()}} />
                        <input type="hidden" className="form-control" name="lat" ref="address_lat" value={this.state.address_lat || ''} onChange={()=>{this.onInputChange()}} />
                        <input type="hidden" className="form-control" name="lon" ref="address_lng" value={this.state.address_lng || ''} onChange={()=>{this.onInputChange()}} />
                    </div>

                    {this.state.parkingItems.map(function(item, index) {

                        const cssClassHidden = (item.is_deleted==true) ? 'hidden' : '';

                        // console.log(item.id)

                        return (
                            <div className={"group-wrapper " + cssClassHidden} key={index}>
                                <div className="input-group-custom">
                                    <div className="parking-icon small-cell">
                                        <button type="button" className="btn btn-plain btn--nopad hover-show" onClick={(e) => this.handelDeleteParkingItem(item)}>
                                            <i className="iconc-trash"></i>
                                        </button>
                                        <i className="iconc-icn-parking hover-hide"></i>
                                    </div>
                                    <div className="parking-field small-cell">
                                        <InputBoxGoogleAutocomplete type="text" className="form-control" value={item.address} itemId={item.id} onAddressChange={this.onAddressChange} />
                                        {/*<input type="text" className="form-control parking_address" defaultValue={item.address} data-id={item.id} />*/}
                                    </div>
                                    <label className="price-icon small-cell">
                                        <InputBox type="checkbox" className="hidden-ispaid" name={`project_parkings[${index}][is_paid]`} data-checked={item.is_paid || ''} value="0" onChange={(e)=>{this.handleIsPaidCheckboxChange(e, index)}} />
                                        €
                                    </label>
                                    <div className="price-field small-cell">
                                        <InputBox type="number" className="form-control" name={`project_parkings[${index}][price]`} value={item.price || ''} />
                                        <span>per uur</span>
                                    </div>

                                    <InputBox type="hidden" name={`project_parkings[${index}][id]`} value={item.id} />
                                    <InputBox type="hidden" className="form-control" name={`project_parkings[${index}][address]`} value={item.address} data-id={item.id} onChange={()=>{this.onInputChange()}} />

                                    <InputBox type="hidden" className="form-control" name={`project_parkings[${index}][lat]`} value={item.lat || ''} onChange={()=>{this.onInputChange()}} />
                                    <InputBox type="hidden" className="form-control" name={`project_parkings[${index}][lon]`} value={item.lon || ''} onChange={()=>{this.onInputChange()}} />

                                    <InputBox type="hidden" className="form-control" name={`project_parkings[${index}][is_new]`} value={item.is_new} />
                                    <InputBox type="hidden" className="form-control" name={`project_parkings[${index}][is_deleted]`} value={item.is_deleted} />
                                </div>
                            </div>
                        )
                    }, this)}


                    <div className="input-group input-group--style-label">
                        <span className="input-group-addon">
                            <button type="button" className="btn btn-plain btn--nopad" onClick={(e) => this.handleAddClick()}>
                                <i className="iconc-plus"></i>
                            </button>
                        </span>
                        <label>{trans.locatieInput_zaal}</label>
                    </div>

                    <div>
                        <div id="google-map" className="google-map" ref="gmap"></div>
                    </div>
                </div>
            </div>
        );
    }
}
ProjectTabLocatieForm.propTypes = {
    
};

export default ProjectTabLocatieForm