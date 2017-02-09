import React, { PropTypes } from 'react'

import CheckboxButton from './CheckboxButton'
class ChecboxButtonGroup extends React.Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {        
        className: '',
        type: 'text',
        name: 'checkboxes[]',
        checkedValues: '',
        choices: '',
        onChange: function() {},
        isIcon: false,
    }



    render() {
        const {choices, name, checkedValues, onChange} = this.props;
        // console.log(choices)
        const choiceItems = choices.map((choice, index) => {
            const {value} = choice;
            // const checked = value == value;
            var checked = checkedValues.indexOf(value)!==-1 ? true : false;
            // console.log(checked, value, checkedValues);
            return (
                <li className="list-group-item" key={index}>
                    <label >                    
                        <CheckboxButton
                            key={`checkbox-button-${value}`}
                            name={name}
                            value={value | ''}
                            checked={checked}
                            onChange={onChange} />
                        <span>{choice.title}</span>
                    </label>
                </li>
            );
        });
              
        return (

            <div className={'ChekcboxList ' + this.props.className} ref="ChekcboxList">
                <ul className="list-group">
                     {choiceItems}

                </ul>
            </div>

            
            
        );
    }
}
ChecboxButtonGroup.propTypes = {
    
};

export default ChecboxButtonGroup