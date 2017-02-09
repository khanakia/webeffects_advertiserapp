import React, { PropTypes } from 'react'

import RadioButton from './RadioButton'
class RadioButtonGroup extends React.Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {        
        className: '',
        type: 'text',
        name: 'radios[]',
        checkedValue: '',
        choices: '',
        onChange: function() {},
        isIcon: false,
    }



    render() {
        const {choices, name, checkedValue, onChange} = this.props;
        // console.log(choices)
        const choiceItems = choices.map((choice, index) => {
          const {value} = choice;
          const checked = value == checkedValue;
          // console.log(checked, value, checkedValue);
          return (
            <div className="input-group" key={index}>
                {this.props.isIcon ?
                    <span className="input-group-addon" id="basic-addon1"><i className={choice.icon_class}></i></span>
                : '' }
                <label className="form-control">                    
                    <RadioButton
                      key={`radio-button-${value}`}
                      name={name}
                      value={value | ''}
                      checked={checked}
                      onChange={onChange} />
                    <span>{choice.title}</span>
                </label>
            </div>
          );
        });
              
        return (
            <div className={'comp-radiolist input-group-vmerge input-groups-radiocheck' + this.props.className} ref="radiolist">
            {choiceItems}

            </div>

            
            
        );
    }
}
RadioButtonGroup.propTypes = {
    
};

export default RadioButtonGroup