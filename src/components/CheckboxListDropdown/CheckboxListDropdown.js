import React, {PropTypes} from 'react'

class CheckboxListDropdown extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			selectedItems: this.props.selectedItems,
		}
	}

	static defaultProps = {
		name: 'ddl',
		items: [],
		selectedItems: [],
		emptyPlaceholder: '',
		onItemChange: function(item){},
	}

	componentWillReceiveProps(nextProps) {
        // If nextProp item are greater than current prop items it means user clicked the Save button so clear all the Newitems in state input because they already saved and will show as NextProp items
        if(nextProps.selectedItems !== this.props.selectedItems) {
            this.setState({selectedItems: nextProps.selectedItems})
        }

    }
	

	handleItemChange = (e, item) => {

		var itemValue = e.target.value;

		const status = (jQuery(e.target).is(":checked"))
		console.log(status)
		// console.log(e.target.value)
		var selectedItems = this.state.selectedItems;


		if(status) {
			var index = selectedItems.indexOf(itemValue);
			if(index===-1) {
				// If not exists then push new object
				selectedItems.push(e.target.value);
			}
		} else {
			console.log("remove")
			selectedItems = _.filter(selectedItems, function(o) { 
				return o!==itemValue; 
			});
			
		}

		console.log(selectedItems)

		this.setState({
			selectedItems: selectedItems
		})
		this.props.onItemChange(item)
	}

	render() {
		const dropdownId = this.props.name+'_dropdownMenu1'
		var checked = this.state.isChecked;
		return (
			<div>
				<div className="filters_list">
					{this.state.selectedItems.map(function(value, index){
				  		
				  		return (
						        <label key={index}>
                        			<span>{value}</span>
						        </label>
				  		)
				  	}, this)}
				</div>
				<div className="dropdown dropdown--style1">
				  <button className="btn btn-dropdown dropdown-toggle" type="button" id={dropdownId} data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
				    {this.props.emptyPlaceholder}
				    <i className="iconc-chevron-down"></i>
				  </button>

				  <ul className="dropdown-menu11" aria-labelledby={dropdownId}>
				  	{this.props.items.map(function(item, index){
				  		let checked = this.state.selectedItems.indexOf(item.value)!==-1 ? true : false;
				  		// console.log(this.state.selectedItems)
				  		// console.log(item.value, checked);
				  		return (
						    <li key={index}>
						        <label>
						        	<input type="checkbox" onClick={(e)=>{this.handleItemChange(e, item)}} value={item.value} checked={checked} />
                        			<span>{item.title}</span>
						        </label>

						    </li>
				  		)
				  	}, this)}

				  </ul>
				</div>
			</div>
		)
	}
}

export default CheckboxListDropdown