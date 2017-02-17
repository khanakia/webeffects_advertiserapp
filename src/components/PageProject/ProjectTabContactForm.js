import React, { Component } from 'react';
import ReactDom from 'react-dom';


import ContactPersonSingleBlock from '../ContactPersonSingleBlock'
import InputBox from './InputBox'
import EmailInput from './EmailInput'
class ProjectTabContactForm extends Component {
    constructor(props) {
        super(props);

    }

    static defaultProps = {
        reset: false,
        contact_id : '',
        contact_name : null,
        contact_phone : null,
        contact_email : null,
        contact_emails : [],
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
                            {/*<ContactPersonSingleBlock  
                                                                    onAddNewClick={this.props.onContactDropdownAddNewClick} 
                                                                    selectedValue={this.props.contact_id} 
                                                                    items={this.props.contactsList} 
                                                                    emptyPlaceholder={trans.contactPersonDD_empty_placeholder} 
                                                                    contact_phone={this.props.phone}
                                                                    contact_email={this.props.email} />*/}


                            <div className="input-group-vmerge input-group--style-label">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="iconc iconc-person"></i>
                                    </span>
                                    
                                    <InputBox type="text" className="form-control required" name="contact_name" value={this.props.contact_name} />
                                </div>
                                
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="iconc iconc-phone"></i>
                                    </span>
                                    
                                    <InputBox type="text" className="form-control required" name="contact_phone" value={this.props.contact_phone} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                 <div className="form-group input-group-vmerge">
                    <label>Emails</label>
                    <div className="row">
                        <div className="col-md-8">
                            <EmailInput items={this.props.contact_emails} reset={this.props.reset} />
                        </div>
                    </div>
                </div>

                <div className="form-group input-group-vmerge">
                    <label>{trans.pageProject_website_label}</label>
                    <div className="row">
                        <div className="col-md-8">
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
