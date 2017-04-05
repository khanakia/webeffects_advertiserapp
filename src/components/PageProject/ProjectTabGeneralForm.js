import React, { Component } from 'react';
import ReactDom from 'react-dom';


// import RadioList from 'components/RadioList'

import RadioButtonGroup from './RadioButtonGroup'
import FileInput from './FileInput'
import VideoInput from './VideoInput'
import IframeInput from './IframeInput'
import InputBox from './InputBox'


class ProjectTabGeneralForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project_title : this.props.project_title,
            discount_filter_value_id: this.props.discount_filter_value_id
        }
    
    }

    static defaultProps = {
        reset: false,
        project_formdata: [],
        attachmentsList : [],
        project_title : '',
        description: '',
        onAttachmentDeleted: function(){},
        onAttachmentTitleUpdated: function(){},
        project_videos: [],
        onVideoDeleted: function(){},
        project_iframes: [],
        onIframeDeleted: function(){},
        discount_filter_value_id : null,
        discount_short_title : '',
        discount_long_title : '',  
    }

    componentWillMount() {
       
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.reset) {
            this.setState({
                discount_filter_value_id: nextProps.discount_filter_value_id
            })
        }
    }


    componentDidUpdate() {
        $(this.refs.description).trumbowyg('html', this.props.description);
    }

    handleChange = (value) => {
        this.setState({
          discount_filter_value_id: value
        });
        console.log(value)
      }

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
        

        return (
            <div>
                <div className="form-group">
                    <label>{trans.pageProject_naam_locatie_label}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_naam_locatie}></a>
                    </label>
                    <InputBox type="text" className="form-control required" name="project_title" value={this.props.project_title} />
                </div>
                <div className="form-group">
                    <label>{trans.pageProject_algemene_label}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_algemene_beschrijving}></a>
                    </label>
                    <textarea className="editor" name="description" ref="description" defaultValue={this.props.description}></textarea>
                </div>
                <div className="form-group">
                    <FileInput
                        reset={this.props.reset} 
                        onAttachmentDeleted={this.props.onAttachmentDeleted} 
                        items={this.props.attachmentsList} 
                        onTitleUpdated={this.props.onAttachmentTitleUpdated} 
                        maxItems={100} />
                </div>

                <div className="form-group">
                    <label>{trans.pageProject_video_link_label}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_video_links}></a>
                    </label>
                    <VideoInput items={this.props.project_videos} onVideoDeleted={this.props.onVideoDeleted} reset={this.props.reset} />
                </div>
                <div className="form-group">
                    <label>{trans.pageProject_garden_tour_label}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_360_graden_tour_iframe}></a>
                    </label>
                    <IframeInput items={this.props.project_iframes} onIframeDeleted={this.props.onIframeDeleted} />
                </div>

                <div className="form-group">
                    <label>{trans.pageProject_actie_label}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_actie_toevoegen}></a>
                    </label>
                    {/*<RadioList name="discount_filter_value_id" items={toevoegenList} selectedValue={this.props.discount_filter_value_id} />*/}

                    <RadioButtonGroup name="discount_filter_value_id" choices={toevoegenList} checkedValue={this.state.discount_filter_value_id} onChange={this.handleChange} />
                    
                </div>

                <div className="form-group">
                    <label>{trans.pageProject_Aanbieding_label} <br /> {trans.pageProject_aanbieding_korte_label}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_aanbieding_korte}></a>
                    </label>
                    <InputBox type="text" className="form-control" name="discount_short_title" value={this.props.discount_short_title} placeholder={trans.pageProject_tooltip_aanbieding_korte} />
                    
                </div>

                <div className="form-group">
                    <label>{trans.pageProject_Aanbieding_label} <br /> {trans.pageProject_aanbieding_lange_label}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_aanbieding_lange}></a>
                    </label>
                    <InputBox type="text" className="form-control" name="discount_long_title" value={this.props.discount_long_title} placeholder={trans.pageProject_tooltip_aanbieding_lange} />
                </div>
            </div>
        )
    }
}


export default ProjectTabGeneralForm;
