import React, { PropTypes } from 'react'

class InputBoxGoogleAutocomplete extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            value: this.props.value,
        }
    }

    static defaultProps = {        
        className: '',
        type: 'text',
        name: 'input',
        value: '',
        onChange: function() {},
        onAddressChange: function() {},
        itemId: null
    }

    componentDidMount() {
        this.autocomplete_init()
  
    }

    componentDidUpdate() {
         
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.value!==this.props.value) {
            this.setState({value: nextProps.value})
        }
    }


    autocomplete_init() {
        const _this = this;

        var inputbox = (document.getElementById(this.refs.inputelem));

        var autocomplete = new google.maps.places.Autocomplete(this.refs.inputelem);

        autocomplete.addListener('place_changed', function() {
            var place = autocomplete.getPlace();
            _this.props.onAddressChange(_this.refs.inputelem.value, place.geometry.location.lat(), place.geometry.location.lng(), _this.props.itemId)
            // _this.setState({address: inputbox.value, address_lat: place.geometry.location.lat(), address_lng: place.geometry.location.lng()});
        });
    }



    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
        // The input value.
        this.props.onChange(event.target.value);
    }

    render() {
              
        return (
            <input ref="inputelem" type={this.props.type} name={this.props.name} className={this.props.className}  onChange={this.handleChange} value={this.state.value} />
        );
    }
}
InputBoxGoogleAutocomplete.propTypes = {
    
};

export default InputBoxGoogleAutocomplete