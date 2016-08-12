import React, { Component } from 'react';
import ReactDom from 'react-dom';

class InputDate extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        defaultValue : '',
        className : '',
        name : 'input_date',
        format :  'DD/MM/YYYY'

    }

    componentWillMount() {
    }

    componentDidMount() {
        jQuery(this.refs.input_date).datetimepicker({
            format: this.props.format
        });
    }

    // handleChange: function(e) {
    //     this.props.onValueChange(/* pass the element or the value */)
    // }


    render() {
        return (
            <div className="control-inputdate">
                <input type="text" className={ 'input_date' + this.props.className} ref="input_date" name={this.props.name} defaultValue={this.props.defaultValue}/>
            </div>
        );
    }
}


export default InputDate;
