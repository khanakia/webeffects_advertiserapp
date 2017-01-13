import React, { PropTypes } from 'react'


class ClonableInput extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            inputs : [],
            inputsNew: []
        }
        
        
    }

    static defaultProps = {        
        className: '',
        theme: '',

        // items: [
        //     {
        //         "id": 1,
        //         "project_id": 1,
        //         "url": 'http://google.com',
        //         "type": 'vimeo'
        //     },

        //     {
        //         "id": 2,
        //         "project_id": 1,
        //         "url": 'http://google2.com',
        //         "type": 'vimeo'
        //     }
        // ],

        items: []
        
    }

    

    componentDidMount() {
        var _this = this;
        jQuery(this.refs.btnAdd).click(function(){
            // jQuery(_this.refs.fieldsWrapper).append("dsfsd");
            _this.appendInput();
        })

        // var inputs = [];
        // for (var i = 0; i < this.props.items.length; i++) {
        //     inputs.push(i)
        // };

        // if(inputs.length>0) {
        //     this.setState({inputs: inputs})
        // }
       
    }

    componentWillReceiveProps(nextProps) {
        console.log("RECEIE")
        var inputs = [];
        for (var i = 0; i < nextProps.items.length; i++) {
            inputs.push(i)
        };

        this.setState({inputs: inputs})

    }

    appendInput() {
       
        var newInput = this.state.inputsNew.length;

        this.setState({ inputsNew: this.state.inputsNew.concat(newInput)});
    }
    
    removeField(e, index) {
        e.preventDefault()
        console.log(index)

    }

    render() {
        var _this = this;
        
        return (
            <div className={'ClonableInput ' + this.props.className} ref="clonableInput">
                <div className="fields" ref="fieldsWrapper">

                </div>

                {this.state.inputs.map(function(index) {
                    var item = _this.props.items[index]
                    console.log(item)
                    return (
                        <div className="room-form" key={index} id={index}>
                            <a href="#" className="remove" onClick={(e) => _this.removeField(e, index)}><i className="fa fa-remove"></i></a>
                            <ul>
                                <li>
                                    <label>{trans.clonableInput_naam_label} <span className="red">*</span></label>
                                    <input type="text" name="videos[]" className="required" ref={'name'+index} defaultValue={item ? item.url : ''}  />
                                </li>

                            </ul>
                        </div>
                    )
                })}

                {this.state.inputsNew.map(function(index) {
                    
                    return (
                        <div className="room-form" key={index} id={index}>
                            <a href="#" className="remove" onClick={(e) => _this.removeField(e, index)}><i className="fa fa-remove"></i></a>
                            <ul>
                                <li>
                                    <label>{trans.clonableInput_naam_label} <span className="red">*</span></label>
                                    <input type="text" className="required" name="videos[]" ref={'name'+index} defaultValue='' />
                                </li>

                            </ul>
                        </div>
                    )
                })}

                <div className="addbtnWrapper">
                    <button ref="btnAdd" type="button">+</button>
                </div>
              
            </div>
        );
    }
}
ClonableInput.propTypes = {
    
};

export default ClonableInput