import React, { PropTypes } from 'react'


class RadioList extends React.Component {

    constructor(props) {
        super(props);
    
        
    }

    static defaultProps = {        
        className: '',
        name: 'radios[]',
        items: [],
        selectedValue: '',
        isIcon: false,
    }

    

    componentDidMount() {
       
       
    }

    componentWillReceiveProps(nextProps) {
    

    }

    renderList() {
        // console.log("selectedValue", this.props.selectedValue)
        return this.props.items.map(function(item, index) {
            var checked = this.props.selectedValue===item.value ? true : false;
            return (
                <div className="input-group" key={index}>
                    {this.props.isIcon ?
                        <span className="input-group-addon" id="basic-addon1"><i className={item.icon_class}></i></span>
                    : '' }
                    <label className="form-control">
                        <input type="radio" name={this.props.name} defaultValue={item.value} defaultChecked={checked} />
                        <span>{item.title}</span>
                        </label>
                </div>
            )
        }, this)
    }


    render() {
        return (
            <div className={'comp-radiolist input-group-vmerge input-groups-radiocheck' + this.props.className} ref="radiolist">
                
                    {this.renderList()}
                
            </div>
        );
    }
}
RadioList.propTypes = {
    
};

export default RadioList