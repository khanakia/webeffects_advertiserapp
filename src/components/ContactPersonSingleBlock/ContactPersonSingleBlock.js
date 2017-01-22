import React, {PropTypes} from 'react'

import ContactPersonDropdown from 'components/ContactPersonDropdown'

class ContactPersonSingleBlock extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			
			contact_email: this.props.contact_email,
			contact_phone: this.props.contact_phone
		}

	}

	static defaultProps = {
		onItemChange: function(item, project_id){},
	}

	onItemChange = (item, project_id) => {
		this.setState({
			contact_email: item.email,
			contact_phone: item.phone
		})
		this.props.onItemChange(item, project_id)
	}

	render() {

		return (
			<div>
				<div className="input-group-vmerge input-group--style-label">
                    <div className="input-group">
                        <span className="input-group-addon">
                            <i className="iconc iconc-person"></i>
                        </span>
                    	<ContactPersonDropdown
                            onAddNewClick={this.props.onAddNewClick} 
                            selectedValue={this.props.selectedValue} 
                            items={this.props.items} 
                            emptyPlaceholder={this.props.emptyPlaceholder}
                            onItemChange={this.onItemChange}
                            />
                        
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon">
                            <i className="iconc iconc-mail"></i>
                        </span>
                        
                        <label>{this.state.contact_phone}</label>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon">
                            <i className="iconc iconc-phone"></i>
                        </span>
                        
                        <label>{this.state.contact_email}</label>
                    </div>
                </div>

			</div>
		)
	}
}

export default ContactPersonSingleBlock