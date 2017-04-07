import React, { PropTypes } from 'react'

class TextareaBox extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            value: this.props.value,
        }
    }

    static defaultProps = {        
        className: '',
        name: 'textarea',
        value: '',
        onChange: function() {}
    }

    componentDidMount() {

  
    }

    componentDidUpdate() {
         
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.value!==this.props.value) {
            this.setState({value: nextProps.value})
        }
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
            <textarea name={this.props.name} className={this.props.className}  onChange={this.handleChange} value={this.state.value || ''}> </textarea>
        );
    }
}
TextareaBox.propTypes = {
    
};

export default TextareaBox