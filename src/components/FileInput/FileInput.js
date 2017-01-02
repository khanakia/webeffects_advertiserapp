import React, { PropTypes } from 'react'
import {API_URL_ATTACHMENTS_UPLOAD, API_URL_ATTACHMENT_MAPPINGS} from '../../config'

class FileInput extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            itemsNew: [],
        }
    }

    static defaultProps = {        
        className: '',
        name: 'images',
        theme: '',
        selectedItems: [],
        filter_value_id: '',
        onAttachmentDeleted: function() {}
        
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
 
    deleteMapping(attachment_mapping_id) {
        jQuery.ajax({
            type: "DELETE",
            url : API_URL_ATTACHMENT_MAPPINGS + '/' + attachment_mapping_id,
            dataType : "JSON",
            success: function(response){
                console.log(response);
                this.props.onAttachmentDeleted()
                
            }.bind(this)
        });
    }


    handleRemoveItem(index) {
        var items = this.state.itemsNew
        this.setState({itemsNew: items.filter((_, i) => i!==index)})
    }

    render() {
        var _this = this;
        
        return (
            <div className={'comp-fileinput ' + this.props.className} ref="fileinput">
                <div className="item selector">
                    <div className="inner">
                        <label>
                            <div className="icon-placeholder"><i className="fa fa-upload"></i></div>
                            <div className="placeholder">Voeg foto’s toe</div>
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
                                <div className="title">{item.attachment_title}</div>
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
                            </div>
                        </div>
                    )
                }, this)}
              
            </div>
        );
    }
}
FileInput.propTypes = {
    
};

export default FileInput