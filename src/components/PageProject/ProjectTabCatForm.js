import React, { Component } from 'react';
import ReactDom from 'react-dom';

import FileInput from './FileInput'
import TrouwenRouteInput from './TrouwenRouteInput'


class ProjectTabCatForm extends Component {
    constructor(props) {
        super(props);

   
    }

    static defaultProps = {
        reset: false,
        project_formdata: [],
        geleghendens: [],
        item : [],
        attachment_mappings: [],
        onAttachmentDeleted: function(){},
        onAttachmentTitleUpdated: function(){},

        trouwenroute_description: null,
        trouwenroutes: []
        
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
        console.log("this.props.geleghendensthis.props.geleghendensthis.props.geleghendens", this.props.geleghendens)
       
        if(undefined==fvm.description) {
            $(this.refs.description).trumbowyg('html', "");    
        } else {
            $(this.refs.description).trumbowyg('html', fvm.description);
        }

        var fileinput_tooltip_template = _.template(trans.pageProject_catform_fileinput_tooltip_note);
        var fileinput_tooltip = fileinput_tooltip_template({ 'cat_title': item.title });

        var cat_tooltip_template = _.template(trans.pageProject_tooltip_algemene_beschrijving);
        var cat_tooltip = fileinput_tooltip_template({ 'cat_title': item.title });
  

        return (
            <div>
                <input type="hidden" name={`geleghendens[${item.value}][filter_value_id]`} defaultValue={item.value} />
                <div className="form-group">
                    <label>{trans.pageProject_catform_title}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={cat_tooltip}></a>
                    </label>
                    <textarea className="editor" ref="description" name={`geleghendens[${item.value}][description]`} defaultValue={fvm.description}></textarea>
                </div>
                <div className="form-group">
                    <FileInput 
                        reset={this.props.reset} 
                        heading = {trans.pageProject_catform_fileinput_heading}
                        heading_empty = {trans.pageProject_catform_fileinput_heading_empty}
                        tooltip_note = {fileinput_tooltip}
                        name={`geleghendens[${item.value}][attachments]`} 
                        filter_value_id={item.value} 
                        onAttachmentDeleted={this.props.onAttachmentDeleted} 
                        onTitleUpdated={this.props.onAttachmentTitleUpdated} 
                        items={fvm.attachments} />
                </div>

                <div className="form-group">
                    {
                        fvm.is_trouwen ?
                            <TrouwenRouteInput 
                                trouwenroute_description= {this.props.trouwenroute_description}
                                items= {this.props.trouwenroutes}
                                />
                        : ''
                    }
                </div>
            </div>
        )
    }
}


export default ProjectTabCatForm;
