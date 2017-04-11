import React, { Component } from 'react';
import ReactDom from 'react-dom';

import {AuthHelper} from 'helpers'
import ContactPersonSingleBlock from '../ContactPersonSingleBlock'
import InputBox from './InputBox'
import EmailInput from './EmailInput'
import RadioButtonGroup from './RadioButtonGroup'
class ProjectTabContactForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disable_website_field: this.props.disable_website_field,
        }

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
        disable_website_field: null,
        
        onContactDropdownAddNewClick: function(){},
    }

    componentWillMount() {
       
    }

    componentDidMount() {
        
    }

    componentDidUpdate() {
        
    }

    handleChange = (value) => {
        this.setState({
          disable_website_field: value
        });
        console.log(value)
    }

    render() {
        let cssClass = !AuthHelper.is_admin() ? 'hidden' : '';

        const radioDisableWebsiteField = [
            {
                "title": trans.ja,
                "value": 1,
                "icon_class": "iconc iconc-no-food"
            },

            {
                "title": trans.nee,
                "value": 0,
                "icon_class": "iconc iconc-food"
            }
        ]

        return (
            <div>
                <div className="form-group">
                    <label>{trans.pageProject_details_contactpersonen}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_contactpersoon}></a>
                    </label>

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
                    <label>{trans.pageProject_email_label}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_emails}></a>
                    </label>
                    <div className="row">
                        <div className="col-md-8">
                            <EmailInput items={this.props.contact_emails} reset={this.props.reset} />
                        </div>
                    </div>
                </div>

                <div className="form-group input-group-vmerge">
                    <label>{trans.pageProject_website_label}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_website}></a>
                    </label>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <button type="button" className="btn btn-plain btn--nopad">
                                        <i className="iconc-globe"></i>
                                    </button>
                                </span>
                                {/*<input type="text" className="form-control" name="website" defaultValue={this.props.website} />*/}
                                <InputBox type="text" className="form-control required" name="website" value={this.props.website} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"form-group " + cssClass}>
                    <label>{trans.pageProject_contact_disable_website_title}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_contact_disable_website_tooltip}></a>
                    </label>
                    <div className="row">
                        <div className="col-md-2">
                            <RadioButtonGroup name="disable_website_field" choices={radioDisableWebsiteField} checkedValue={this.state.disable_website_field} onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ProjectTabContactForm;
