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

		const selectedItem = _.find(this.props.items, {"value": this.state.selectedValue})
		const dropdownId = this.props.name+'_dropdownMenu1'
	
		return (
			<div>
				<input type="hidden" name={this.props.name} value={this.state.selectedValue} onChange={this.handleChange} />
				<div className="dropdown dropdown--style1">
				  <button className="btn btn-dropdown dropdown-toggle" type="button" id={dropdownId} data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
				    {selectedItem ? selectedItem.title : this.props.emptyPlaceholder}
				    <i className="fa fa-angle-down"></i>
				  </button>

				  <ul className="dropdown-menu" aria-labelledby={dropdownId}>
				  	{this.props.items.map(function(item, index){
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