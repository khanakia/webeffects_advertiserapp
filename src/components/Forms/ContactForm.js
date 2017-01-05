import React, { Component } from 'react';
import ReactDom from 'react-dom';

import ContactHelper from '../../helpers'


class ContactForm extends Component {
    constructor(props) {
        super(props);

        this.msg_btn_save_text = 'Create Contact'
        this.msg_heading = 'Create Contact'
    }

    static defaultProps = {
        onDataUpdate: function(org) { },
        
        popup_id: '',
        settings : {},
        data : {
            id: '',
            name: '',
            phone: '',
            email: ''
        },

        is_new : true,
    }

    componentWillMount() {
        if(!this.props.is_new) {
            this.msg_btn_save_text = "Update Contact"
            this.msg_heading = 'Edit Contact'
        }
    }

    componentDidMount() {
        
    }

    hidePopup = () => {
        if (this.props.popup_id) {
            jQuery('#' + this.props.popup_id).popup('hide');
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();

        var valid = jQuery(this.refs.form).valid();
        if (!valid) {return false};
        
        let data = jQuery(this.refs.form).serialize();


        ContactHelper.save(data).then(function(response) {
            this.props.onDataUpdate(response.data)
            this.hidePopup();
        }.bind(this));

        return false;
    }

    render() {
        return (
            <div>
                <div className="modal-header">
                    <h4 className="modal-title">{this.msg_heading}</h4>
                </div>

                <form className="form" ref='form' onSubmit={this.handleSubmit}>
                    <input type="hidden" className="form-control" ref="id" name="id" id="id" defaultValue={this.props.data.id} />
                    <div className="content-area mt10">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control required" name="name" id="name" defaultValue={this.props.data.name} placeholder="" />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="text" className="form-control required" name="phone" id="phone" defaultValue={this.props.data.phone} placeholder="" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control required" name="email" id="email" defaultValue={this.props.data.email} placeholder="" />
                        </div>

                    </div>
                    <div className="modal-footer text-right">
                        <button type="submit" className="btn btn-blue-link">{this.msg_btn_save_text}</button>
                    </div>
                </form>

            </div>
        );
    }
}


export default ContactForm;
