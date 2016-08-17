import React, { Component } from 'react';
import ReactDom from 'react-dom';

class TagColorInput extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        onValueChange: function() { return '';  },
        defaultValue : '#A0522D'
    }

    componentWillMount() {
        
    }

    componentDidMount() {
        // $('#tag_color').colorselector();
        $(this.refs.tag_color).colorselector({
                callback: function (value, color, title) {
                    this.props.onValueChange(color);
                }.bind(this)
        });
    }

    // handleChange: function(e) {
    //     this.props.onValueChange(/* pass the element or the value */)
    // }


    render() {
        return (
            <div>
                <select id="tag_color" name="tag_color" ref="tag_color" defaultValue={this.props.defaultValue}>
                    <option value="#A0522D" data-color="#A0522D">sienna</option>
                    <option value="#CD5C5C" data-color="#CD5C5C">indianred</option>
                    <option value="#FF4500" data-color="#FF4500">orangered</option>
                    <option value="#008B8B" data-color="#008B8B">darkcyan</option>
                    <option value="#B8860B" data-color="#B8860B">darkgoldenrod</option>
                    <option value="#32CD32" data-color="#32CD32">limegreen</option>
                    <option value="#DCBE1F" data-color="#DCBE1F">gold</option>
                    <option value="#48D1CC" data-color="#48D1CC">mediumturquoise</option>
                    <option value="#87CEEB" data-color="#87CEEB">skyblue</option>
                    <option value="#FF69B4" data-color="#FF69B4">hotpink</option>
                    <option value="#CD5C5C" data-color="#CD5C5C">indianred</option>
                    <option value="#87CEFA" data-color="#87CEFA">lightskyblue</option>
                    <option value="#6495ED" data-color="#6495ED">cornflowerblue</option>
                    <option value="#DC143C" data-color="#DC143C">crimson</option>
                    <option value="#FF8C00" data-color="#FF8C00">darkorange</option>
                    <option value="#C71585" data-color="#C71585">mediumvioletred</option>
                    <option value="#000000" data-color="#000000">black</option>
                </select>
            </div>
        );
    }
}


export default TagColorInput;
