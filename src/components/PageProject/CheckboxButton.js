import React, { PropTypes } from 'react'

class CheckboxButton extends React.Component {

    constructor(props) {
        super(props);
   
    }

    static defaultProps = {        
        className: '',
        type: 'checkbox',
        name: 'input',
        value: '',
        checked: '',
        onChange: function() {}
    }


    handleChange = (event) => {

        this.props.onChange(event.target.value, event.target.checked);
    }

    render() {
              
        return (
            
                <input type={this.props.type} name={this.props.name} className={this.props.className} onChange={this.handleChange} value={this.props.value} checked={this.props.checked} />
            
        );
    }
}
CheckboxButton.propTypes = {
    
};

export default CheckboxButton