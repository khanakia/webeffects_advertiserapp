import React, {PropTypes} from 'react'

class DropdownList extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			selectedValue: this.props.selectedValue
		}
	}

	static defaultProps = {
		name: 'ddl',
		items: [],
		selectedValue: '',
		emptyPlaceholder: '',
		onItemChange: function(item){},
		isDefaultEmpty: false
	}

	componentWillReceiveProps(nextProps) {
        // If nextProp item are greater than current prop items it means user clicked the Save button so clear all the Newitems in state input because they already saved and will show as NextProp items
        if(nextProps.selectedValue !== this.props.selectedValue) {
            this.setState({selectedValue: nextProps.selectedValue})
        }

    }
	

	handleItemChange(e, item) {
		e.preventDefault()
		this.setState({
			selectedValue: item.value
		})
		this.props.onItemChange(item)
	}

	handleChange(event) {
	    // this.setState({value: event.target.value});
	}


	render() {
		
		let emptyObj = [{
			"title" : this.props.emptyPlaceholder,
			"value" : 0
		}]

		const items = this.props.isDefaultEmpty ? [...emptyObj, ...this.props.items] : this.props.items
		// console.log("sdfsdfasdfdsafa", items)

		const selectedItem = _.find(items, {"value": this.state.selectedValue})
		const dropdownId = this.props.name+'_dropdownMenu1'
	
		return (
			<div>
				<input type="hidden" name={this.props.name} value={this.state.selectedValue} onChange={this.handleChange} />
				<div className="dropdown dropdown--style1">
				  <button className="btn btn-dropdown dropdown-toggle" type="button" id={dropdownId} data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
				    <span>{selectedItem ? selectedItem.title : this.props.emptyPlaceholder}</span>
				    <i className="iconc-chevron-down"></i>
				  </button>

				  <ul className="dropdown-menu" aria-labelledby={dropdownId}>
				  	{items.map(function(item, index){
				  		return (
						    <li key={index}>
						        <a onClick={(e)=>{this.handleItemChange(e, item)}}>{item.title}</a>
						    </li>
				  		)
				  	}, this)}

				  </ul>
				</div>
			</div>
		)
	}
}

export default DropdownList