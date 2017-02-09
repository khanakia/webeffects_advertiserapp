import React, { PropTypes } from 'react'

class RadioButton extends React.Component {

    constructor(props) {
        super(props);
   
    }

    static defaultProps = {        
        className: '',
        type: 'radio',
        name: 'input',
        value: '',
        checked: '',
        onChange: function() {}
    }


    handleChange = (event) => {

        this.props.onChange(event.target.value);
    }

    render() {
              
        return (
            
                <input type={this.props.type} name={this.props.name} className={this.props.className} onChange={this.handleChange} value={this.props.value} checked={this.props.checked} />
            
        );
    }
}
RadioButton.propTypes = {
    
};

export default RadioButton