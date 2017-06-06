import React, { PropTypes } from 'react'
import {API_URL_ATTACHMENTS_UPLOAD, API_URL_ATTACHMENT_MAPPINGS, API_URL_ATTACHMENTS_IMP} from '../../config'

import {AttachmentHelper, AttachmentMappingHelper} from '../../helpers'

import InputBox from './InputBox'

class FileInput extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            items: this.props.items,
            itemsNew: [],
            itemsCount: 0,
            isEditing: false,
            editingItemIndex: '',

            reset: false
        }
    }

    static defaultProps = {        
        className: '',
        name: 'attachments',
        theme: '',
        items: [],
        project_id: null,
        filter_value_id: '', // this i required for Category Tabs
        onAttachmentDeleted: function() {},
        onTitleUpdated: function() {},
        maxItems: 100,

        heading_empty : '',
        heading : '',
        tooltip_note : '',
        
    }

    componentDidMount() {

         this.onFileChange();

         var $fileinput = jQuery(this.refs.fileinput)

         $fileinput.find(".items-wrapper").sortable({
          // connectWith: ".comp-fileinput .item",
            items: '.item:not(.selector)',
            stop: function () {
                var nbElems = $fileinput.find('.item:not(.selector)');
                // console.log(nbElems)
                nbElems.each(function(idx) {
                    // $(this).val(nbElems - idx);
                    jQuery(this).find('.sort_order').val(idx)
                    // console.log(idx)
                });
            }
          
        });
        var drag_txt = trans.fileInput_placeholder_voeg;
        var drag_msg = "<div class='upload-loader upload-indicator' style='display:none;'><div class='loader01'></div></div><div class='upload-indicator icon-upload-wrapper'><div class='icon-placeholder'><i class='iconc-uploaded'></i></div><div class='placeholder'>"+drag_txt+"</div></div>";
        var drag_drop_file = jQuery('.drag_drop_file [type="file"]');
        jQuery(this.refs.input).ezdz({
            text: drag_msg,
            reject: function(file, errors) {
            }
        });
    }

    componentDidUpdate() {
        this.onFileChange();

        if(this.state.isEditing) {
        
            setTimeout(() => {
                jQuery(this.refs.title_input).focus();
            }, 500);

            $(this.refs.title_input).on('keypress', (e) => {
                if(e.which === 13){
                    this.saveTitle()
                }
            });

            $(this.refs.title_input).on('keydown', (e) => {
                // Tab Key Pressed
                if(e.which === 9){
                    this.saveTitle(true)
                }
           });
        }
    }

    componentWillReceiveProps(nextProps) {
        // If nextProp item are greater than current prop items it means user clicked the Save button so clear all the Newitems in state input because they already saved and will show as NextProp items
        // if(nextProps.items.length > this.props.items.length) {
        //     this.setState({itemsNew: []})
        // }

        if(nextProps.reset) {
            this.setState({items: nextProps.items})
        }

    }

    onFileChange() {
        var popup_content = _.template(trans.fileInput_confirm_subtitle);
        var fileInput_confirm_subtitle = popup_content({ 'no_of_files': 10 });
        
        var _this = this;
        jQuery(this.refs.input).unbind("change").change(function(){

            
            if(this.files.length>_this.props.maxItems) {
                jQuery.confirm({
                    title: trans.fileInput_confirm_title,
                    content: fileInput_confirm_subtitle,
                    closeIcon: false,
                    columnClass: 'col-md-6 col-md-offset-3',
                    buttons: {
                        cancelAction: {
                            text: trans.fileInput_confirm_cancel_text,
                            action: function () {
                                jQuery(".jconfirm").hide()
                            }
                        },
                    }
                })
                return false;
            }
        
            var data = new FormData();
            // var names = [];
            data.append('site_id', Env.site_id);
            for (var i = 0; i < $(this).get(0).files.length; ++i) {
                // names.push($(this).get(0).files[i].name);
                data.append('file1['+i+']', $(this).get(0).files[i]); // we can put more than 1 image file
            }


            jQuery(".upload-indicator").toggle();

            jQuery.ajax({
                type: "POST",
                url : API_URL_ATTACHMENTS_UPLOAD,
                // dataType : "JSON",
                processData: false,
                contentType: false,
                data: data,
                headers: Auth.header(),

                success: function(response){

                    _this.setState({
                        items: _this.state.items.concat(response),
                        itemsCount: response.length
                    })

                    jQuery(".upload-indicator").toggle();
                    
                }.bind(this)
            });
        });    
    }
 
    // deleteMapping(id) {

    //     // AttachmentMappingHelper.delete(attachment_mapping_id).then((response)=>{

    //     //     this.props.onAttachmentDeleted()
    //     // })
    // }


    handleRemoveItem(indexItem) {
        let items = Object.assign([], this.state.items); 
        
        if(items[indexItem].is_new) {
            this.setState({items: items.filter((_, i) => i!==indexItem)})
        } else {
            items.map(function(item,index) {
                if(index==indexItem) {
                    item.is_deleted = 1;
                }
            })
            this.setState({ items: items});
        }
    }

    editTitle(item_id) {
        this.setState({isEditing: true, editingItemIndex: item_id})
    }

    saveTitle(isTab=false) {
    
        // AttachmentHelper.updateTitle(this.state.editingItemIndex, this.refs.title_input.value).then((response) => {
        //     this.setState({isEditing: false, editingItemIndex: ''})
        //     this.props.onTitleUpdated()
        // })

        let items = Object.assign([], this.state.items); 
        
        items.map((item,index) => {
            if(index==this.state.editingItemIndex) {
                item.attachment_title = this.refs.title_input.value;
            }
        })
        this.setState({ items: items, isEditing: false}, function() {
            if(isTab) {
                this.editTitle(this.state.editingItemIndex+1)
            }
        });
        
    }

    cancelEditing() {
        this.setState({isEditing: false, editingItemIndex: ''})
    }


    imp() {
        jQuery.ajax({
            type: "POST",
            url : API_URL_ATTACHMENTS_IMP,
            dataType : "JSON",
            // processData: false,
            // contentType: false,
            data: {
                project_id: this.props.project_id,
                cat_id: this.props.filter_value_id
            },
            headers: Auth.header(),

            success: function(response){
                console.log(response);
                this.setState({
                    items: response,
                    itemsCount: response.length
                })
                
            }.bind(this)
        });
    }

    _renderImportButton() {
        /*if(Env.site_id==2 || Env.site_id==3) {
            return (
               <div className="form-group">
                    <button type="button" className="btn-link btn-link-style1" onClick={()=>{this.imp()}}>{trans.import_photots_title}</button>
                </div>
            )
        }*/
        return null;
    }

    render() {
        var _this = this;
        // console.log( "this.state.itemsNew.length", this.state.itemsNew.length, this.props.maxItems)
        const itemsCount = this.state.itemsNew.length + this.props.items.length

        var totalItemCount = this.state.itemsNew.length+this.props.items.length;
        var heading = this.props.heading_empty;
        if(itemsCount>1) {
            var heading_template = _.template(this.props.heading);
            heading = heading_template({ 'item_count': totalItemCount });
            
        }
        
        return (
            <div className={'comp-fileinput ' + this.props.className} ref="fileinput">
                
                <div className="form-group">
                    <label>{heading}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={this.props.tooltip_note}></a>
                    </label>
                </div>

                {this._renderImportButton()}
                <div className="items-wrapper">
                    {
                        itemsCount<this.props.maxItems ?

                            <div className="item selector">
                                <div className="inner drag_drop_field">
                                    <div className="drag_drop_file text-center" ref="drag_drop_file">
                                        <input type="file" name="input_file2" className="input_file" multiple="true" accept="image/x-png, image/gif, image/jpeg" ref="input" />

                                    </div>  
                                </div>
                            </div>

                        : ''
                    }
             


                    {this.state.items.map(function(item, index) {
                        const cssClassHidden = (item.is_deleted==true) ? 'hidden' : '';
                        // this is to prevent same input index for above already saved items
                        // const indexInput = index + 100;

                        return (
                            <div className={"item " + cssClassHidden} key={index}>

                                <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][id]`} value={item.id} />
                                <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][attachment_id]`} value={item.attachment_id} />
                                <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][object_key]`} value={item.object_key} />
                                <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][object_type]`} value={item.object_type} />
                                <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][object_id]`} value={item.object_id} />
                                <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][filter_value_id]`} value={item.filter_value_id} />
                                <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][filename]`} value={item.filename} />
                                <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][filename_large]`} value={item.filename_large} />
                                <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][filename_medium]`} value={item.filename_medium} />
                                <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][filename_thumb]`} value={item.filename_thumb} />
                                <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][filename_thumb]`} value={item.filename_thumb} />
                                <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][mime_type]`} value={item.mime_type} />
                                <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][is_new]`} value={item.is_new} />
                                <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][is_deleted]`} value={item.is_deleted || 0} />
                                <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][attachment_title]`} value={item.attachment_title || ''} />
                                <InputBox type="hidden" className="sort_order" name={`${this.props.name}[${index}][sort_order]`} value={item.sort_order || 0} />


                                <div className="inner" style={{backgroundImage : 'url("' + item.url_thumb + '")'}}>
                                    <div className="title" onClick={()=>{this.editTitle(index)}}>{item.attachment_title}</div>
                                    <div className="control-bar">
                                        <button type="button" className="btn btn-plain editBtn" onClick={()=>{this.editTitle(index)}}><i className="iconc-edit"></i></button>
                                        <span className="dimensions">{item.width + ' x ' + item.height}</span>
                                        <button type="button" className="btn btn-plain deleteBtn" onClick={() => {this.handleRemoveItem(index)}}><i className="iconc-cross"></i></button>
                                    </div>
                                </div>

                                {
                                    (this.state.isEditing && this.state.editingItemIndex==index) ?
                                        <div className="image-popup">
                                            <input type="text" ref="title_input" />
                                            <div className="button-wrapper">
                                                <button type="button" className="btn btn-plain ml10 mr5 green-color" onClick={()=>{this.saveTitle()}}><i className="iconc-check"></i></button>
                                                <button type="button" className="btn btn-plain red-color" onClick={()=>{this.cancelEditing()}}><i className="iconc-cross"></i></button>
                                            </div>
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