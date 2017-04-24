import React, {PropTypes} from 'react'
import { Link, hashHistory } from 'react-router'

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

	componentDidMount() {
	
	}

	componentDidUpdate() {
		var _this = this;

		$(document).click(function(e) {
			var parent_length = ($(e.target).parents(".dropdown").length);
      		const $dropdown = $(_this.refs.dropdown);
			if(parent_length==0) {
				$dropdown.removeClass("open");
			}
  			
		})

		$(this.refs.dropdown).on('hide.bs.dropdown', function (e) {
		    return false;
		});
		
	}

	componentWillReceiveProps(nextProps) {
        // If nextProp item are greater than current prop items it means user clicked the Save button so clear all the Newitems in state input because they already saved and will show as NextProp items
        if(nextProps.selectedItems !== this.props.selectedItems) {
            this.setState({selectedItems: nextProps.selectedItems})
        }

    }
	

	handleItemChange = (e, item) => {

		var itemValue = e.target.value;
		// console.log(itemValue);

		const status = (jQuery(e.target).is(":checked"))

		var selectedItems = this.state.selectedItems;

		if(status) {
			var index = selectedItems.indexOf(itemValue);
			if(index===-1) {
				// If not exists then push new object
				selectedItems.push((e.target.value));
			}
		} else {
			// console.log("remove")
			selectedItems = _.filter(selectedItems, function(o) { 
				// console.log(o, itemValue);
				return (o)!==(itemValue); 
			});
			
		}

		// console.log(selectedItems)

		this.setState({
			selectedItems: selectedItems
		})
		this.props.onItemChange(selectedItems)
	}

	removeFilter = (value) => {
		var selectedItems = this.state.selectedItems;

		selectedItems = _.filter(selectedItems, function(o) { 
			return o!==value; 
		});

		this.setState({
			selectedItems: selectedItems
		})
	}

	render() {
		const dropdownId = this.props.name+'_dropdownMenu1'
		var checked = this.state.isChecked;
		var filterTitle;
		return (
			<div className="dropdown-wrapper">
				<div className="dropdown dropdown--style1 keep-open" ref="dropdown">
				  <button className="btn btn-dropdown dropdown-toggle" type="button" id={dropdownId} data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
				    {this.props.emptyPlaceholder}
				    <i className="iconc-chevron-down"></i>
				  </button>

				  <ul className="dropdown-menu" ref="dropdown-menu" aria-labelledby={dropdownId}>
				  	{this.props.items.map(function(item, index){
				  		let checked = this.state.selectedItems.indexOf(item.value)!==-1 ? true : false;
				  		// console.log(this.state.selectedItems)
				  		// console.log(item.value, checked);
				  		return (
						    <li className="list-group-item" key={index}>
						        <label>
						        	<input type="checkbox" onClick={(e)=>{this.handleItemChange(e, item)}} value={item.value} checked={checked} />
                        			<span>{item.title}</span>
						        </label>

						    </li>
				  		)
				  	}, this)}

				  </ul>
				</div>
				<div className="filters_list">
					{this.state.selectedItems.map(function(value, index){
						{this.props.items.map(function(item){
							if (value == item.value) {
								filterTitle = item.title;
							}
						}, this)}
				  		return (
					        <label key={index}>
                    			<span className="filterSelectedValue">{filterTitle} <button type="button" className="btn btn-plain" onClick={()=>{this.removeFilter(value)}}><i className="iconc-cross"></i></button></span>
					        </label>
				  		)
				  	}, this)}
				</div>
			</div>
		)
	}
}

export default CheckboxListDropdown