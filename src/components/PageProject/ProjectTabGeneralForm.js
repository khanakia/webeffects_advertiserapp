import React, { Component } from 'react';
import ReactDom from 'react-dom';


// import RadioList from 'components/RadioList'

import RadioButtonGroup from './RadioButtonGroup'
import FileInput from './FileInput'
import VideoInput from './VideoInput'
import IframeInput from './IframeInput'
import InputBox from './InputBox'


import {UtilHelper} from 'helpers'


class ProjectTabGeneralForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project_title : this.props.project_title,
            // discount_filter_value_id: this.props.discount_filter_value_id
        }
    
    }

    static defaultProps = {
        reset: false,
        project_formdata: [],
        attachmentsList : [],
        project_id : null,
        project_title : '',
        description: '',
        onAttachmentDeleted: function(){},
        onAttachmentTitleUpdated: function(){},
        project_videos: [],
        onVideoDeleted: function(){},
        project_iframes: [],
        onIframeDeleted: function(){},
        // discount_filter_value_id : null,
        discount_short_title : '',
        discount_long_title : '',  

        compare_json: []
    }

    componentWillMount() {
       
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps) {
        // if(nextProps.reset) {
        //     this.setState({
        //         discount_filter_value_id: nextProps.discount_filter_value_id
        //     })
        // }
    }


    componentDidUpdate() {
        $(this.refs.description).trumbowyg('html', this.props.description);
    }

    // handleChange = (value) => {
    //     this.setState({
    //       discount_filter_value_id: value
    //     });
    //     console.log(value)
    // }

    render() {
        // console.log(this.props.project)
        // let images = _.filter(this.props.attachment_mappings, { 'filter_value_id': null});

        let toevoegenList = [];
        toevoegenList.push({
            "title": trans.pageProject_geen_actie,
            "value": 0,
        })

        this.props.project_formdata.gelegenhendens.map((item, index) => {
            toevoegenList.push({
                "title": trans.pageProject_actie_voor+' '+item.title,
                "value": item.value,
            })
        }) 


        const class_project_title = UtilHelper.compareJsonGetClass('project_title', this.props.compare_json);
        const class_description = UtilHelper.compareJsonGetClass('description', this.props.compare_json);
        const class_attachments = UtilHelper.compareJsonGetClass('attachments', this.props.compare_json);
        const class_discount_short_title = UtilHelper.compareJsonGetClass('discount_short_title', this.props.compare_json);
        const class_discount_long_title = UtilHelper.compareJsonGetClass('discount_long_title', this.props.compare_json);
        const class_project_videos = UtilHelper.compareJsonGetClass('project_videos', this.props.compare_json);
        const class_project_iframes = UtilHelper.compareJsonGetClass('project_iframes', this.props.compare_json);

        // console.log("field_project_title_classfield_project_title_class", class_project_title)

        // const field_project_title_class = this.props.compare_json.project_title.altered ? ' altered' : "";
        // console.log("this.props.compare_jsonthis.props.compare_json", this.props.compare_json.sdfdsfasd.dsfds)
        

        return (
            <div>
                <div className="form-group">
                    <label className={class_project_title}>{trans.pageProject_naam_locatie_label}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_naam_locatie}></a>
                    </label>
                    <InputBox type="text" className="form-control required" name="project_title" value={this.props.project_title} />
                </div>
                <div className="form-group">
                    <label className={class_description}>{trans.pageProject_algemene_label}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_algemene_beschrijving}></a>
                    </label>
                    <textarea className="editor" name="description" ref="description" defaultValue={this.props.description}></textarea>
                </div>
                <div className="form-group">
                    <FileInput
                        project_id={this.props.project_id}
                        className={class_attachments}
                        heading = {trans.pageProject_fileinput_heading}
                        heading_empty = {trans.pageProject_fileinput_heading}
                        tooltip_note= {trans.pageProject_fileinput_tooltip_note}
                        reset={this.props.reset} 
                        onAttachmentDeleted={this.props.onAttachmentDeleted} 
                        items={this.props.attachmentsList} 
                        onTitleUpdated={this.props.onAttachmentTitleUpdated} 
                        maxItems={100} />
                </div>

                <div className="form-group">
                    <label className={class_project_videos}>{trans.pageProject_video_link_label}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_video_links}></a>
                    </label>
                    <VideoInput items={this.props.project_videos} onVideoDeleted={this.props.onVideoDeleted} reset={this.props.reset} />
                </div>
                <div className="form-group">
                    <label className={class_project_iframes}>{trans.pageProject_garden_tour_label}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_360_graden_tour_iframe}></a>
                    </label>
                    <IframeInput items={this.props.project_iframes} onIframeDeleted={this.props.onIframeDeleted} reset={this.props.reset} />
                </div>

                {/*<div className="form-group">
                                    <label>{trans.pageProject_actie_label}
                                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_actie_toevoegen}></a>
                                    </label>
                                    
                
                                    <RadioButtonGroup name="discount_filter_value_id" choices={toevoegenList} checkedValue={this.state.discount_filter_value_id} onChange={this.handleChange} />
                                    
                                </div>*/}

                <div className="form-group">
                    <label className={class_discount_short_title}>{trans.pageProject_Aanbieding_label} <br /> {trans.pageProject_aanbieding_korte_label}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_aanbieding_korte}></a>
                    </label>
                    <InputBox type="text" className="form-control" name="discount_short_title" value={this.props.discount_short_title} placeholder={trans.pageProject_tooltip_aanbieding_korte} />
                    
                </div>

                <div className="form-group">
                    <label className={class_discount_long_title}>{trans.pageProject_Aanbieding_label} <br /> {trans.pageProject_aanbieding_lange_label}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_aanbieding_lange}></a>
                    </label>
                    <InputBox type="text" className="form-control" name="discount_long_title" value={this.props.discount_long_title} placeholder={trans.pageProject_tooltip_aanbieding_lange} />
                </div>
            </div>
        )
    }
}


export default ProjectTabGeneralForm;
