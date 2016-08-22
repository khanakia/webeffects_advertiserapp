import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { Auth,  ProjectFileHelper } from '../../helpers'


class ProjectFileDetailsEditForm extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        onDataUpdate: function(response) { },
        
        popup_id: '',
        settings : {},
        data : {
            id: '',
            file_description: '',
            file_displayname: '',
        }
    }

    componentWillMount() {
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
        // const dataJson = URI.parseQuery(data);

        ProjectFileHelper.update(data).then(function(response) {
            this.props.onDataUpdate(response)
            this.hidePopup();
        }.bind(this));

        return false;

    }

  
    render() {
        return (
            <div className="comp-projectfiledetailseditform">
                <div className="modal-header">
                    <h4 className="modal-title">Edit File Detail</h4>
                </div>
                
                <form className="form" ref='form' onSubmit={this.handleSubmit}>
                    <input type="text" name="id" defaultValue={this.props.data.id} />
                    <div className="content-area">
                        <div className="mb20">
                            <label>File Name</label>
                            <input type="text" className="w100 required" name="file_displayname" ref="file_displayname" defaultValue={this.props.data.project_file_version_latest.file_displayname} />
                        </div>
                        <ul className="nav nav-tabs" role="tablist">
                            <li role="presentation" className="active"><a href="#option" aria-controls="option" role="tab" data-toggle="tab">Options</a></li>
                            <li role="presentation"><a href="#description" aria-controls="description" role="tab" data-toggle="tab">Description</a></li>
                        </ul>
                        <div className="tab-content">
                            <div role="tabpanel" className="tab-pane active" id="option">
                               
                            </div>
                            <div role="tabpanel" className="tab-pane" id="description">
                               <textarea name="file_description" defaultValue={this.props.data.file_description}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer text-right">
                        <button type="submit" className="btn btn-success" ref="btn_save" >Save</button>
                    </div>
                </form>
            </div>
        );
    }
}


export default ProjectFileDetailsEditForm;
