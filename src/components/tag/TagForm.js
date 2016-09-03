import React, { Component } from 'react';
import ReactDom from 'react-dom';

import TagHelper from '../../helpers/helper_tag.js'

import { fetchTags } from '../../actions/action_tag';
import {store} from '../../store/index.js';

import TagColorInput from './TagColorInput'


class TagForm extends Component {
    constructor(props) {
        super(props);

        this.msg_btn_save_text = 'Create Tag'
        this.msg_heading = 'Create Tag'
    }

    static defaultProps = {
        onDataUpdate: function(data) { },
        
        popup_id: '',
        settings : {},
        data : {
            id: '',
            tag_title: '',
            tag_color: ''
        },

        is_new : true,
    }

    componentWillMount() {
        // console.info('THISPROPS', this.props)
        if(!this.props.is_new) {
            this.msg_btn_save_text = "Update Tag"
            this.msg_heading = 'Edit Tag'
        }
    }

    componentDidMount() {

    }

    // static showInPoup({settings={}, data={}, onDataUpdate=this.defaultProps.onDataUpdate()}) {
    //     var uniq = 'id' + (new Date()).getTime();

    //     Controls.showpopup({
    //         detach : true,
    //         message : '<div id="' + uniq + '"></div>',
    //         container_class : "w500",
    //         blur: false,
    //         onopen : function(e){
    //           var pid = (jQuery(e).attr('id'));
    //           ReactDom.render(<TagForm popup_id={pid} settings={settings} data={data} onDataUpdate={onDataUpdate} />, document.getElementById(uniq));
    //           // console.log(pid);
    //           // setTimeout(() => jQuery('#'+pid).popup('hide'), 3000); 
    //         }
    //     });
    // }

    hidePopup = () => {
        if(this.props.popup_id) {
            jQuery('#'+this.props.popup_id).popup('hide');
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();

        var valid = jQuery(this.refs.form).valid();
        if (!valid) {return false};
        
        let data = jQuery(this.refs.form).serialize();
        // data = URI.parseQuery(data);
        
        TagHelper.save(data).then(function(response) {
            console.log(response);
            
            store.dispatch(fetchTags())
            this.props.onDataUpdate(response.data.tag)
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
                    <input type="hidden" className="form-control" name="id" id="id" defaultValue={this.props.data.id} />
                    <div className="content-area">
                        <div className="form-group">
                            <label className="control-label">Tag Name</label>
                            <input type="text" className="form-control required" name="tag_title" id="tag_title" defaultValue={this.props.data.tag_title} />
                            
                        </div>

                        <div className="form-group">
                            <label className="control-label">Tag Color</label>
                                <TagColorInput defaultValue={this.props.data.tag_color}/>
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


export default TagForm;
