import React, { PropTypes } from 'react'
import {API_URL_ATTACHMENTS_UPLOAD, API_URL_ATTACHMENT_MAPPINGS} from '../../config'

import {AttachmentHelper, AttachmentMappingHelper} from '../../helpers'

class FileInput extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            itemsNew: [],

            isEditing: false,
            editingItemId: ''
        }
    }

    static defaultProps = {        
        className: '',
        name: 'images',
        theme: '',
        selectedItems: [],
        filter_value_id: '', // this i required for Category Tabs
        onAttachmentDeleted: function() {},
        onTitleUpdated: function() {}
        
    }

    componentDidMount() {
        var _this = this;
        jQuery(this.refs.input).change(function(){
            var data = new FormData();
            // var names = [];
            for (var i = 0; i < $(this).get(0).files.length; ++i) {
                // names.push($(this).get(0).files[i].name);
                data.append('file1['+i+']', $(this).get(0).files[i]); // we can put more than 1 image file
            }

            jQuery.ajax({
                type: "POST",
                url : API_URL_ATTACHMENTS_UPLOAD,
                // dataType : "JSON",
                processData: false,
                contentType: false,
                data: data,
                success: function(response){

                    _this.setState({
                        itemsNew: response
                    })
                    
                }.bind(this)
            });
        });
       
    }

    componentWillReceiveProps(nextProps) {
        // If nextProp item are greater than current prop items it means user clicked the Save button so clear all the Newitems in state input because they already saved and will show as NextProp items
        if(nextProps.selectedItems.length > this.props.selectedItems.length) {
            this.setState({itemsNew: []})
        }

    }
 
    deleteMapping(attachment_mapping_id) {

        AttachmentMappingHelper.delete(attachment_mapping_id).then((response)=>{
            this.props.onAttachmentDeleted()
        })
    }


    handleRemoveItem(index) {
        var items = this.state.itemsNew
        this.setState({itemsNew: items.filter((_, i) => i!==index)})
    }

    editTitle(item_id) {
        this.setState({isEditing: true, editingItemId: item_id})
    }

    saveTitle() {
    
        AttachmentHelper.updateTitle(this.state.editingItemId, this.refs.title_input.value).then((response) => {
            this.setState({isEditing: false, editingItemId: ''})
            this.props.onTitleUpdated()
        })
        
    }

    cancelEditing() {
        this.setState({isEditing: false, editingItemId: ''})
    }

    render() {
        var _this = this;
        
        return (
            <div className={'comp-fileinput ' + this.props.className} ref="fileinput">
                <h3>{this.state.itemsNew.length+this.props.selectedItems.length}{" foto's"}</h3>
                <div className="items-wrapper">
                    <div className="item selector">
                        <div className="inner">
                            <label>
                                <div className="icon-placeholder"><i className="iconc-uploaded"></i></div>
                                <div className="placeholder">Voeg foto toe</div>
                                <input type="file" multiple ref="input" />
                            </label>
                        </div>
                    </div>
             

                    {this.state.itemsNew.map(function(item, index) {
                        return (
                            <div className="item" key={item.id}>
                                <button type="button" onClick={() => {this.handleRemoveItem(index)}}>Delete</button><br />
                                
                                <input type="text" name={`${this.props.name}_new[${index}][filter_value_id]`} defaultValue={this.props.filter_value_id} placeholder="filter_value_id" /> <br/> 
                                <input type="text" name={`${this.props.name}_new[${index}][attachment_id]`} defaultValue={item.id} placeholder="attachment_id" />
                                <div className="inner" style={{backgroundImage : 'url("' + item.url + '")'}}>
                                    
                                </div>
                            </div>
                        )
                    }, this)}

                    {this.props.selectedItems.map(function(item, index) {
                        return (
                            <div className="item" key={item.id}>
                                <button type="button" onClick={() => {this.deleteMapping(item.id)}}>Delete</button><br />
                                <input type="text" name="project_id[]" defaultValue={item.object_id} placeholder="project_id" /> <br/>
                                <input type="text" name={`${this.props.name}[${index}][filter_value_id]`} defaultValue={item.filter_value_id} placeholder="filter_value_id" /> <br/> 
                                <input type="text" name={`${this.props.name}[${index}][attachment_id]`} defaultValue={item.attachment.id} placeholder="attachment_id" />
                                <div className="inner" style={{backgroundImage : 'url("' + item.attachment.url + '")'}}>
                                    <div className="title">{item.attachment.attachment_title}</div>
                                    <button type="button" onClick={()=>{this.editTitle(item.attachment.id)}}>Edit</button>
                                </div>

                                {
                                    (this.state.isEditing && this.state.editingItemId==item.attachment.id) ?
                                        <div>
                                            <input type="text" ref="title_input" />
                                            <button type="button" className="btn btn-plain" onClick={()=>{this.saveTitle()}}><i className="fa fa-check"></i></button>
                                            <button type="button" className="btn btn-plain" onClick={()=>{this.cancelEditing()}}><i className="fa fa-close"></i></button>
                                        </div>

                                    : ''
                                }
                            </div>
                        )
                    }, this)}
                </div>
              
            </div>
        );
    }
}
FileInput.propTypes = {
    
};

export default FileInput