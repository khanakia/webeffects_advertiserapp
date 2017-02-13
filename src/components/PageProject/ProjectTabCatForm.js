import React, { Component } from 'react';
import ReactDom from 'react-dom';

import FileInput from './FileInput'


class ProjectTabCatForm extends Component {
    constructor(props) {
        super(props);

   
    }

    static defaultProps = {

        project_formdata: [],
        geleghendens: [],
        item : [],
        attachment_mappings: [],
        onAttachmentDeleted: function(){},
        onAttachmentTitleUpdated: function(){},
        
    }

    componentWillMount() {
       
    }

    componentDidMount() {
        
    }


    componentDidUpdate() {
        
    }

    render() {
        const item = this.props.item;
        let fvm = _.find(this.props.geleghendens, { 'filter_value_id': item.value });
        fvm = undefined==fvm ? [] : fvm;

       
        if(undefined==fvm.description) {
            $(this.refs.description).trumbowyg('html', "");    
        } else {
            $(this.refs.description).trumbowyg('html', fvm.description);
        }

        return (
            <div>
                <input type="text" name={`geleghendens[${item.value}][filter_value_id]`} defaultValue={item.value} />
                <div className="form-group">
                    <label>{trans.pageProject_catform_title+item.title}</label>
                    <textarea className="editor" ref="description" name={`geleghendens[${item.value}][description]`} defaultValue={fvm.description}></textarea>
                </div>
                <div className="form-group">
                    <label>{trans.pageProject_representatieve_label}</label>
                    <FileInput name={`geleghendens[${item.value}][attachments]`} filter_value_id={item.value} onAttachmentDeleted={this.props.onAttachmentDeleted} onTitleUpdated={this.props.onAttachmentTitleUpdated} items={fvm.attachments} />
                </div>
            </div>
        )
    }
}


export default ProjectTabCatForm;