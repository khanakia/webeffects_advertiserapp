import React, { PropTypes } from 'react'


class ChekcboxList extends React.Component {

    constructor(props) {
        super(props);
    
        
    }

    static defaultProps = {        
        className: '',
        name: 'checkboxes[]',

        items: [],
        selectedItems: []
    }

    

    componentDidMount() {
       
       
    }

    componentWillReceiveProps(nextProps) {
    

    }

    renderList() {
        // console.log("this.props.selectedItems", this.props.selectedItems)
        return this.props.items.map(function(item, index) {
            var checked = this.props.selectedItems.indexOf(item.value)!==-1 ? true : false;
            return (
                <li className="list-group-item" key={index}>
                    <label>
                        <input type="checkbox" name={this.props.name} defaultValue={item.value} defaultChecked={checked} />
                        <span>{item.title}</span>
                    </label>
                </li>
            )
        }, this)
    }


    render() {
        return (
            <div className={'ChekcboxList ' + this.props.className} ref="ChekcboxList">
                <ul className="list-group">
                    {this.renderList()}
                </ul>
            </div>
        );
    }
}
ChekcboxList.propTypes = {
    
};

export default ChekcboxList