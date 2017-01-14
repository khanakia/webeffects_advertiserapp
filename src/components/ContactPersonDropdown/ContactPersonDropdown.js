import React, {PropTypes} from 'react'

class ContactPersonDropdown extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			selectedValue: this.props.selectedValue
		}
	}

	static defaultProps = {
		name: 'contact_id',
		items: [],
		selectedValue: '',
		emptyPlaceholder: '',

		onAddNewClick: function(){},
		onItemChange: function(item, project_id){},

		isVisibleAddNewButton: true,

		project_id : null // this i used in ProjectContactInput Control where contact dropdonw should specify project_id
	}

	componentWillReceiveProps(nextProps) {
        // If nextProp item are greater than current prop items it means user clicked the Save button so clear all the Newitems in state input because they already saved and will show as NextProp items
        if(nextProps.selectedValue !== this.props.selectedValue) {
            this.setState({selectedValue: nextProps.selectedValue})
        }

    }
	

	handleItemChange(item) {
		this.setState({
			selectedValue: item.id
		})
		this.props.onItemChange(item, this.props.project_id)
	}

	handleAddNewClick() {
		this.props.onAddNewClick()
	}

	handleChange(event) {
	    // this.setState({value: event.target.value});
	}

	render() {

		const selectedItem = _.find(this.props.items, {"id": this.state.selectedValue})
		
		// console.info("this.props.items", this.props.items)
		// console.info("selectedItem", selectedItem)
		
		return (
			<div>
				<input type="hidden" name={this.props.name} value={this.state.selectedValue} onChange={this.handleChange} />
				<div className="dropdown dropdown--style1">
				  <button className="btn btn-dropdown dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
				    {selectedItem ? selectedItem.name : this.props.emptyPlaceholder}
				    <i className="iconc-chevron-down"></i>
				  </button>

				  <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
				  	{this.props.items.map(function(item, index){
				  		return (
						    <li key={index}>
						    	<div className="input-group input-group--style-button">
						            <span className="input-group-addon">
						                <i className="iconc iconc-person"></i>
						            </span>
						            <button type="button" onClick={(e)=>{this.handleItemChange(item)}}>{item.name}</button>
						        </div>
						    </li>
				  		)
				  	}, this)}

				  	{this.props.isVisibleAddNewButton  ?
					    <li>
					    	<div className="input-group input-group--style-button">
					            <span className="input-group-addon">
					                <i className="iconc iconc-plus"></i>
					            </span>
					            <button type="button" onClick={()=>{this.handleAddNewClick()}}>{trans.contactPersonDD_empty_placeholder}</button>
					        </div>
					    </li>
				  		: ''
				  	}
				  </ul>
				</div>
			</div>
		)
	}
}

export default ContactPersonDropdown