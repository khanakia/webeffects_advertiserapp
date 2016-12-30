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
        return (
            <div>
                <div className="form-group">
                    <label>Naam locatie</label>
                    <input type="text" className="form-control" name="project_title" defaultValue={this.props.project.project_title} />
                </div>
                <div className="form-group">
                    <label>Algemene beschrijving</label>
                    {/*<textarea className="editor" name="description" defaultValue={this.props.project.description}></textarea>*/}
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
        console.log("this.props.project.eigen_catering", this.props.project.eigen_catering)
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
                    <RadioList items={radioEigenCaterign} selectedValue={this.props.project.eigen_catering} />

                </div>

                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Gebouwen</label>
                            <CheckboxList items={this.props.project_formdata.gebouwens} selectedItems={[]} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Ligging</label>
                            <CheckboxList items={this.props.project_formdata.liggings} selectedItems={[]} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Eigenschappen</label>
                            <CheckboxList items={this.props.project_formdata.eigenschappens} selectedItems={[]} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    _render_rightBlock() {
        return (
            <div>
                <div className="block-info">
                    <label>Bewerkingen</label>
                    <div className="last_updated">Zojuist om 11:38</div>

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
                    <div><a className="" href="#">Live</a> <i className="fa fa-link pull-right"></i></div>
                    <div><a className="" href="#">Concept</a> <i className="fa fa-link pull-right"></i></div>
                </div>
                <div className="block-info">
                    <label>Status</label>
                    <div className="">
                        <i className="fa fa-file"></i>Gepubliceerd
                        <a className="pull-right" href="#"><i className="fa fa-pencil"></i></a>
                    </div>    
                </div>
                <div className="block-info">
                    <label>Datum van publicatie</label>
                    <div className="last_updated">20 oktober 2016 om 17:15</div>
                </div>
                <div className="block-info">
                    <a href="#"><i className="fa fa-trash"></i>Zet deze locatie offline</a>
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
                    <textarea className="editor" name="description" defaultValue={fvm.description}></textarea>
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
     
        
        return (
            <div className="">
                <ContentWrapper hasSidebar={true}>
                    <div className="page-panel">
                        <div className="page-panel__heading">Account instellingen</div>
                        <div className="page-panel__inner">
                            <div className="page-panel__inner__left">
                                <ul className="nav nav-tabs nav-tabs--vertical" role="tablist">
                                    <li role="presentation" className="active">
                                        <a href="#general" aria-controls="general" role="tab" data-toggle="tab">Algemene beschrijving</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#details" aria-controls="details" role="tab" data-toggle="tab">Details</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#zalen" aria-controls="zalen" role="tab" data-toggle="tab">Zalen</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#contact" aria-controls="contact" role="tab" data-toggle="tab">Contact</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#locatie" aria-controls="locatie" role="tab" data-toggle="tab">Locatie & parkeren</a>
                                    </li>

                                    {
                                        this.props.project_formdata.gelegenhendens.map((item, index) => {
                                            return (
                                                <li role="presentation" key={index}>
                                                    <a href={`#cat_${item.value}`} role="tab" data-toggle="tab">{item.title}</a>
                                                </li>
                                            )
                                        })

                                    }

                                    <li role="presentation">
                                        <a href="#aanvragen" aria-controls="aanvragen" role="tab" data-toggle="tab">Aanvragen</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#statistieken" aria-controls="statistieken" role="tab" data-toggle="tab">Statistieken</a>
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
                                        <div role="tabpanel" className="tab-pane active" id="details">
                                            {this._render_tabDetails()}
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



                                        <div role="tabpanel" className="tab-pane " id="zalen">
                                            <Zalen items={project.project_rooms} onZalenRemoved={this.onZalenRemoved} />
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
