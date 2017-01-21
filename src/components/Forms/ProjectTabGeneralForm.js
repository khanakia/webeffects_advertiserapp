import React, { Component } from 'react';
import ReactDom from 'react-dom';


import RadioList from 'components/RadioList'
import FileInput from 'components/FileInput'
import VideoInput from 'components/VideoInput'
import IframeInput from 'components/IframeInput'

class ProjectTabGeneralForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project_title : this.props.project_title,

        }
    
    }

    static defaultProps = {

        project_formdata: [],
        attachment_mappings : [],
        project_title : '',
        description: '',
        onAttachmentDeleted: function(){},
        onAttachmentTitleUpdated: function(){},
        project_videos: [],
        onVideoDeleted: function(){},
        project_iframes: [],
        onIframeDeleted: function(){},
        discount_filter_value_id : '',
        discount_short_title : '',
        discount_long_title : '',  
    }

    componentWillMount() {
       
    }

    componentDidMount() {
        
    }


    componentDidUpdate() {
        $(this.refs.description).trumbowyg('html', this.props.description);
    }

    render() {
        // console.log(this.props.project)
        let images = _.filter(this.props.attachment_mappings, { 'filter_value_id': null});

        let toevoegenList = [];
        toevoegenList.push({
            "title": trans.pageProject_geen_actie,
            "value": '',
        })

        this.props.project_formdata.gelegenhendens.map((item, index) => {
            toevoegenList.push({
                "title": trans.pageProject_actie_voor+' '+item.title,
                "value": item.value,
            })
        })
        

        return (
            <div>
                <div className="form-group">
                    <label>{trans.pageProject_naam_locatie_label}</label>
                    <input type="text" className="form-control required" name="project_title" defaultValue={this.props.project_title} />
                </div>
                <div className="form-group">
                    <label>{trans.pageProject_algemene_label}</label>
                    <textarea className="editor" name="description" ref="description" defaultValue={this.props.description}></textarea>
                </div>
                <div className="form-group">
                    <label>{trans.pageProject_representatieve_label}</label>
                    <FileInput name="foto" onAttachmentDeleted={this.props.onAttachmentDeleted} selectedItems={images} onTitleUpdated={this.props.onAttachmentTitleUpdated} maxItems={5} />
                </div>

                <div className="form-group">
                    <label>{trans.pageProject_video_link_label}</label>
                    <VideoInput items={this.props.project_videos} onVideoDeleted={this.props.onVideoDeleted} />
                </div>
                <div className="form-group">
                    <label>{trans.pageProject_garden_tour_label}</label>
                    <IframeInput items={this.props.project_iframes} onIframeDeleted={this.props.onIframeDeleted} />
                </div>

                <div className="form-group">
                    <label>{trans.pageProject_actie_label}</label>
                    <RadioList name="discount_filter_value_id" items={toevoegenList} selectedValue={this.props.discount_filter_value_id} />
                    
                </div>

                <div className="form-group">
                    <label className="question-mark-icon">{trans.pageProject_Aanbieding_label} <br /> {trans.pageProject_aanbieding_korte_label}
                        <a href="#" className="popoverData" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_aanbieding_korte_data_content}></a>
                    </label>
                    <input type="text" className="form-control" name="discount_short_title" defaultValue={this.props.discount_short_title} placeholder={trans.pageProject_aanbieding_korte_placeholder} />
                    
                </div>

                <div className="form-group">
                    <label className="question-mark-icon">{trans.pageProject_Aanbieding_label} <br /> {trans.pageProject_aanbieding_lange_label}
                        <a href="#" className="popoverData" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_aanbieding_lange_data_content}></a>
                    </label>
                    <input type="text" className="form-control" name="discount_long_title" defaultValue={this.props.discount_long_title} placeholder={trans.pageProject_aanbieding_lange_placeholder} />
                </div>
            </div>
        )
    }
}


export default ProjectTabGeneralForm;
