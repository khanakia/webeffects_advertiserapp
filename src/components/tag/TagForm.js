import React, { Component } from 'react';
import ReactDom from 'react-dom';

import TagHelper from '../../helpers/helper_tag.js'

import TagColorInput from './TagColorInput'


class TagForm extends Component {
    constructor(props) {
        super(props);
        
        // this.data = this.props.data;

        var defaults_settings = {
            is_new : true, // by default we are telling it is new entry
        }
        this.settings = $.extend({}, defaults_settings, this.props.settings);

        var defaults = {
            id : '',
            tag_title : '',
            tag_color : '',
        }

        this.data = $.extend({}, defaults, this.props.data);
    }

    static defaultProps = {
        onTagUpdated: function(tag) { return '';  },
    }

    componentWillMount() {
        
    }

    componentDidMount() {
        // $('#tag_color').colorpicker({
        //     parts:          'draggable',
        //     showNoneButton: true,
        //     alpha:          true
        // });
        // $('#tag_color').colorselector();

    }

    // static showInPoup(settings={}, data={},props={}) {
    static showInPoup({settings={}, data={}, props={}, onTagUpdated=this.defaultProps.onTagUpdated()}) {
        
        
        Controls.showpopup({
            detach : true,
            message : '<div id="abc"></div>',
            opacity: 0.5,
            blur: false,
            onopen : function(e){
              var pid = (jQuery(e).attr('id'));
              ReactDom.render(<TagForm popup_id={pid} settings={settings} data={data} onTagUpdated={onTagUpdated} {...props} />, document.getElementById('abc'));
              console.log(pid);
              // setTimeout(() => jQuery('#'+pid).popup('hide'), 3000); 
            }
        });
    }

    hidePopup = () => {
        if(this.props.popup_id) {
            jQuery('#'+this.props.popup_id).popup('hide');
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();

        let data = jQuery(this.refs.form).serialize();
        data = URI.parseQuery(data);
        

        // var valid = jQuery("#orgForm").valid();
        // if (!valid) {return false};
        if(this.settings.is_new) {
            var ajaxObj = TagHelper.store(data);
        } else {
            console.log("Update");
            var ajaxObj = TagHelper.update(data);
        }

        ajaxObj.then(function(response){
            console.log(response);
            // this.props.fetchTags();
            this.props.onTagUpdated(response.data.tag)
            this.hidePopup();
        }.bind(this));

        return false;
      
    }


    render() {
        return (
            <div>
                <form className="form" ref='form' onSubmit={this.handleSubmit}>
                    <input type="text" className="form-control" name="id" id="id" defaultValue={this.data.id} />
                    <div className="row">
                        <div className="col-md-8">
                            <h3>Add New Tag</h3>
                            <div className="form-group">
                                <label className="col-sm-12 control-label">Tag Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="tag_title" id="tag_title" defaultValue={this.data.tag_title} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-sm-12 control-label">Tag Color</label>
                                <div className="col-sm-10">
                                    <TagColorInput defaultValue={this.props.data.tag_color}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <button type="submit" className="btn btn-success">Save</button>
                    </div>
                </form>

            </div>
        );
    }
}


export default TagForm;
