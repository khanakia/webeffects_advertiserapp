import React, { Component } from 'react';

import {ProjectHelper} from '../helpers'

import ContentWrapper from './shared/ContentWrapper'
import Tab from './Tab'
import ClonableInput from './ClonableInput'
import CheckboxList from './CheckboxList'
import RadioList from './RadioList'
import Zalen from './Zalen'

import FileInput from './FileInput'
import VideoInput from './VideoInput'
import IframeInput from './IframeInput'
import ContactPersonDropdown from './ContactPersonDropdown'

class PageProject extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {

        this.props.fetchProjectFormdata()
        // console.log(this.props.params.projectId)
        if(this.props.params.projectId) {
            this.props.fetchProject(this.props.params.projectId);
        }
    }

    componentDidMount() {
        this.initJs()
    }

    componentDidUpdate() {
        this.initJs()
    }

    initJs() {
        var _this = this;
        // jQuery(this.refs.submit).click(function(){
           
        //     //     var valid = jQuery(_this.refs.form).valid();
        //     //     if (!valid) {return false};
            
           
        // })


        $('.editor').trumbowyg({
            autogrow: true
        });

        // $(this.refs.body).trumbowyg('html', this.props.data.body);
    }

    handleSumbit() {
        var _this = this;
        let data = jQuery(_this.refs.form).serialize();    

        ProjectHelper.update(data).then((response) => {
            _this.props.fetchProject(_this.props.params.projectId);
        })
    }

    onAttachmentDeleted = () => {
        if(this.props.params.projectId) {
            this.props.fetchProject(this.props.params.projectId);
        }
    }

    onZalenRemoved = () => {
        this.props.fetchProject(this.props.params.projectId);
    }

    onVideoDeleted = () => {
        this.props.fetchProject(this.props.params.projectId);   
    }

    onIframeDeleted = () => {
        this.props.fetchProject(this.props.params.projectId);   
    }

    _render_tabGeneral() {
        // console.log(this.props.project)
        let images = _.filter(this.props.project.attachment_mappings, { 'filter_value_id': null});

        let toevoegenList = [];
        toevoegenList.push({
            "title": "Geen actie",
            "value": '',
        })

        this.props.project_formdata.gelegenhendens.map((item, index) => {
            toevoegenList.push({
                "title": 'Actie voor '+item.title,
                "value": item.value,
            })
        })

        return (
            <div>
                <div className="form-group">
                    <label>Naam locatie</label>
                    <input type="text" className="form-control" name="project_title" defaultValue={this.props.project.project_title} />
                </div>
                <div className="form-group">
                    <label>Algemene beschrijving</label>
                    <textarea className="editor" name="description" defaultValue={this.props.project.description}></textarea>
                </div>
                <div className="form-group">
                    <label>Representatieve buitenafbeelding</label>
                    <FileInput name="foto" onAttachmentDeleted={this.onAttachmentDeleted} selectedItems={images} />
                </div>

                <div className="form-group">
                    <label>3 video links</label>
                    <VideoInput items={this.props.project.project_videos} onVideoDeleted={this.onVideoDeleted} />
                </div>
                <div className="form-group">
                    <label>360 graden tour iframe</label>
                    <IframeInput items={this.props.project.project_iframes} onIframeDeleted={this.onIframeDeleted} />
                </div>

                <div className="form-group">
                    <label>Actie toevoegen</label>
                    <RadioList name="discount_filter_value_id" items={toevoegenList} selectedValue={this.props.project.discount_filter_value_id} />
                    
                </div>

                <div className="form-group">
                    <label>Aanbieding (korte versie - max 40 karakters)</label>
                    <input type="text" className="form-control" name="discount_short_title" defaultValue={this.props.project.discount_short_title} />
                    
                </div>

                <div className="form-group">
                    <label>Aanbieding (lange versie - max 80 karakters)</label>
                    <input type="text" className="form-control" name="discount_long_title" defaultValue={this.props.project.discount_long_title} />
                </div>
            </div>
        )
    }

    _render_tabDetails() {
        // console.log("this.props.project.eigen_catering", this.props.project.eigen_catering)
        const radioEigenCaterign = [
            {
                "title": "Geen eigen catering mogelijk",
                "value": 0,
                "icon_class": "iconc iconc-no-food"
            },

            {
                "title": "Eigen catering mogelijk",
                "value": 1,
                "icon_class": "iconc iconc-food"
            }
        ]
        return (
            <div>
                <div className="form-group">
                    <label>Aantal personen</label>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="fa fa-users"></i> Min.
                                </span>
                                <input type="text" className="form-control" name="person_min" defaultValue={this.props.project.person_min} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="fa fa-users"></i> Min.
                                </span>
                                <input type="text" className="form-control" name="person_max" defaultValue={this.props.project.person_max} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>Catering</label>
                    <RadioList name="eigen_catering" items={radioEigenCaterign} selectedValue={this.props.project.eigen_catering} />

                </div>

                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Gebouwen</label>
                            <CheckboxList name='gebouws[]' items={this.props.project_formdata.gebouwens} selectedItems={this.props.project.gebouws_mapping_ids} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Ligging</label>
                            <CheckboxList name='liggings[]' items={this.props.project_formdata.liggings} selectedItems={this.props.project.liggings_mapping_ids} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Eigenschappen</label>
                            <CheckboxList name='eigenschappens[]' items={this.props.project_formdata.eigenschappens} selectedItems={this.props.project.eigenschappens_mapping_ids} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    _render_tabContact() {
        return (
            <div>
                <div className="form-group">
                    <label>Aantal personen</label>
                    <div className="row">
                        <div className="col-md-4">
                            <ContactPersonDropdown selectedValue={this.props.project.contact_id} items={this.props.project_formdata.contacts} />
                        </div>
                        <div className="col-md-4 input-group-vmerge input-group--style-label">
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="iconc iconc-person"></i>
                                </span>
                                <label>{this.props.project.contact.name}</label>
                            </div>
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="iconc iconc-mail"></i>
                                </span>
                                
                                <label>{this.props.project.contact.phone}</label>
                            </div>
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="iconc iconc-phone"></i>
                                </span>
                                
                                <label>{this.props.project.contact.email}</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>Website</label>
                    <input type="text" className="form-control" name="website" defaultValue={this.props.project.website} />

                </div>
            </div>
        )
    }

    _render_rightBlock() {
        return (
            <div>
                <div className="block-info">
                    <label>Bewerkingen</label>
                    <div className="last_updated mt5">Zojuist om 11:38</div>

                    <div className="d-table w100 mt20">
                        <div className="d-table-cell v-align-middle">
                            <button ref="submit" type="button" className="btn btn-green btn--round" onClick={()=>{this.handleSumbit()}}>Opslaan</button>
                        </div>
                        <div className="d-table-cell v-align-middle">
                            <button ref="annuleren" type="button" className="btn btn-plain">Annuleren</button>
                        </div>
                    </div>
                </div>
                <div className="block-info">
                    <label>Locatie bekijken</label>
                    <div><a className="live" href="#">Live</a> <i className="fa fa-link pull-right"></i></div>
                    <div><a className="concept" href="#">Concept</a> <i className="fa fa-link pull-right"></i></div>
                </div>
                <div className="block-info">
                    <label>Status</label>
                    <div className="dropdown dropdown--status">
                        <i className="iconc-published before_text"></i>Gepubliceerd
                        <a className="pull-right dropdown-toggle" id="gepubliceerd" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><i className="fa fa-pencil"></i></a>

                        <ul className="dropdown-menu dropdown-menu--status" aria-labelledby="gepubliceerd">
                            <li>
                                <a href="">
                                    <label>
                                        <input type="radio" name="aanhef" value="dhr" />
                                        <span>Gepubliceerd <i className="iconc-published"></i></span>
                                    </label>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <label>
                                        <input type="radio" name="aanhef" value="concept" />
                                        <span>Concept <i className="iconc-concept"></i></span>
                                    </label>
                                </a>
                            </li>
                            
                        </ul>   
                    </div> 
                </div>
                <div className="block-info">
                    <label>Datum van publicatie</label>
                    <div className="last_updated">20 oktober 2016 om 17:15</div>
                </div>
                <div className="block-info">
                    <a href="#"><i className="iconc-trash before_text"></i>Zet deze locatie offline</a>
                </div>
            </div>
        )
    }



    _render_catForm(catitem) {
        let fvm = _.find(this.props.project.categories_mapping, { 'filter_value_id': catitem.value });
        fvm = undefined==fvm ? [] : fvm;
        // console.log("fvm", fvm)
        let images = _.filter(this.props.project.attachment_mappings, { 'filter_value_id': catitem.value });
        images = undefined==images ? [] : images;
        // console.log("images", images)
        return (
            <div>
                <div className="form-group">
                    <label>Algemene beschrijving</label>
                    <textarea className="editor" name={`cat[${catitem.value}][description]`} defaultValue={fvm.description}></textarea>
                </div>
                <div className="form-group">
                    <label>Representatieve buitenafbeelding</label>
                    <FileInput name="foto1" filter_value_id={catitem.value} onAttachmentDeleted={this.onAttachmentDeleted} selectedItems={images} />
                </div>
            </div>
        )
    }

    render() {
        if(!this.props.params.projectId || jQuery.isEmptyObject(this.props.project) || jQuery.isEmptyObject(this.props.project_formdata)) {
            return false
        }
        
        const project = this.props.project
     
        const title = this.props.project.project_title ? this.props.project.project_title : 'Add New'
        return (
            <div className="">
                <ContentWrapper hasSidebar={true}>
                    <div className="page-panel">
                        <div className="page-panel__heading">{title}</div>
                        <div className="page-panel__inner">
                            <div className="page-panel__inner__left">
                                <ul className="nav nav-tabs nav-tabs--vertical" role="tablist">
                                    <li role="presentation" className="active">
                                        <a href="#general" aria-controls="general" role="tab" data-toggle="tab">Algemene beschrijving <i className="iconc-chevron"></i></a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#details" aria-controls="details" role="tab" data-toggle="tab">Details <i className="iconc-chevron"></i></a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#zalen" aria-controls="zalen" role="tab" data-toggle="tab">Zalen <i className="iconc-chevron"></i></a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#contact" aria-controls="contact" role="tab" data-toggle="tab">Contact <i className="iconc-chevron"></i></a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#locatie" aria-controls="locatie" role="tab" data-toggle="tab">Locatie & parkeren <i className="iconc-chevron"></i></a>
                                    </li>

                                    {
                                        this.props.project_formdata.gelegenhendens.map((item, index) => {
                                            return (
                                                <li role="presentation" key={index}>
                                                    <a href={`#cat_${item.value}`} role="tab" data-toggle="tab">{item.title} <i className="iconc-chevron"></i></a>
                                                </li>
                                            )
                                        })

                                    }

                                    <li role="presentation">
                                        <a href="#aanvragen" aria-controls="aanvragen" role="tab" data-toggle="tab">Aanvragen <i className="iconc-chevron"></i></a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#statistieken" aria-controls="statistieken" role="tab" data-toggle="tab">Statistieken <i className="iconc-chevron"></i></a>
                                    </li>
                                </ul>
                            </div>
                            <div className="page-panel__inner__content">
                                <form className="form-default" ref="form">
                                    <input type="text" name="id" defaultValue={project.id} />
                                    <div className="tab-content">
                                        <h3 className="d_active tab_drawer_heading">
                                            <a href="#general" aria-controls="general" role="tab" data-toggle="tab">Algemene beschrijving</a>
                                        </h3>
                                        <div role="tabpanel" className="tab-pane " id="general">
                                           {this._render_tabGeneral()}
                                        </div>

                                        <h3 className="tab_drawer_heading">
                                            <a href="#details" aria-controls="details" role="tab" data-toggle="tab">Details</a>
                                        </h3>
                                        <div role="tabpanel" className="tab-pane " id="details">
                                            {this._render_tabDetails()}
                                        </div>
                                        <div role="tabpanel" className="tab-pane " id="zalen">
                                            <Zalen items={project.project_rooms} onZalenRemoved={this.onZalenRemoved} />
                                        </div>

                                        <div role="tabpanel" className="tab-pane active" id="contact">
                                            {this._render_tabContact()}
                                        </div>

                                        <div role="tabpanel" className="tab-pane " id="locatie">
                                            Locatie
                                        </div>


                                        {
                                            this.props.project_formdata.gelegenhendens.map((item, index) => {
                                                return (
                                                    <div role="tabpanel" className="tab-pane" id={`cat_${item.value}`} key={index}>
                                                        {this._render_catForm(item)}
                                                    </div>
                                                )
                                            })
                                        }


                                        <div role="tabpanel" className="tab-pane " id="aanvragen">
                                            Aanvragen
                                        </div>


                                        <div role="tabpanel" className="tab-pane " id="statistieken">
                                            Statistieken
                                        </div>




                                    </div>
                                </form>  
                            </div>
                            <div className="page-panel__inner__right">
                                {this._render_rightBlock()}
                            </div>
                        </div>
                    </div>
                </ContentWrapper>
            </div>
        );
    }
}


export default PageProject;
