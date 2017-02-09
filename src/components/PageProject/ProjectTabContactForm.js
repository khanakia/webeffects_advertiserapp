import React, { Component } from 'react';
import ReactDom from 'react-dom';


import ContactPersonSingleBlock from '../ContactPersonSingleBlock'

class ProjectTabContactForm extends Component {
    constructor(props) {
        super(props);

    }

    static defaultProps = {
        reset: false,
        contact_id : '',
        phone : null,
        email : null,
        contactsList: [],
        website: null,
        
        onContactDropdownAddNewClick: function(){},
    }

    componentWillMount() {
       
    }

    componentDidMount() {
        
    }

    componentDidUpdate() {
        
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <label>{trans.pageProject_details_contactpersonen}</label>

                    <div className="row">
                        <div className="col-md-4">
                            <ContactPersonSingleBlock  
                                        onAddNewClick={this.props.onContactDropdownAddNewClick} 
                                        selectedValue={this.props.contact_id} 
                                        items={this.props.contactsList} 
                                        emptyPlaceholder={trans.contactPersonDD_empty_placeholder} 
                                        contact_phone={this.props.phone}
                                        contact_email={this.props.email} />
                        </div>
                    </div>
                </div>

                <div className="form-group input-group-vmerge">
                    <div className="row">
                        <div className="col-md-8">
                            <label>{trans.pageProject_website_label}</label>
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <button type="button" className="btn btn-plain btn--nopad">
                                        <i className="iconc-globe"></i>
                                    </button>
                                </span>
                                <input type="text" className="form-control" name="website" defaultValue={this.props.website} />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ProjectTabContactForm;
