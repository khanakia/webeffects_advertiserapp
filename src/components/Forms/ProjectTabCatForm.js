import React, { Component } from 'react';
import ReactDom from 'react-dom';

import FileInput from 'components/FileInput'


class ProjectTabCatForm extends Component {
    constructor(props) {
        super(props);

   
    }

    static defaultProps = {

        project_formdata: [],
        categories_mapping: [],
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
        let fvm = _.find(this.props.categories_mapping, { 'filter_value_id': item.value });
        fvm = undefined==fvm ? [] : fvm;
        // console.log("fvm", fvm)
        let images = _.filter(this.props.attachment_mappings, { 'filter_value_id': item.value });
        images = undefined==images ? [] : images;

        $(this.refs.description).trumbowyg('html', fvm.description);
        // console.log("images", images)
        return (
            <div>
                <div className="form-group">
                    <label>{trans.pageProject_catform_title+item.title}</label>
                    <textarea className="editor" ref="description" name={`cat[${item.value}][description]`} defaultValue={fvm.description}></textarea>
                </div>
                <div className="form-group">
                    <label>{trans.pageProject_representatieve_label}</label>
                    <FileInput name={"foto_cat_"+item.value} filter_value_id={item.value} onAttachmentDeleted={this.props.onAttachmentDeleted} onTitleUpdated={this.props.onAttachmentTitleUpdated} selectedItems={images} />
                </div>
            </div>
        )
    }
}


export default ProjectTabCatForm;
