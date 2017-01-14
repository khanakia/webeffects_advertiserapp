import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router'
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
import OfferRequestList from './OfferRequestList'
import LocatieInput from './LocatieInput'
import SnoobiPage from './SnoobiPage'

import PopupHelper from 'helpers/helper_popup'

class PageProject extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {        
        project_province: [],
        project_plaat: [],
        project_gebied: [],
        project_contact: {
            name: ''
        }
        
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

        if(this.props.params.projectId) {
            this.props.fetchOfferRequestDetailsList(this.props.params.projectId);
        }

        this.tabsFn();

        // ProjectHelper.projectStatus();
    }

    componentDidUpdate() {
        this.initJs()
        jQuery('[data-toggle="popover"]').popover()

        this.tabsFn();
    }


    tabsFn() {
        // $(".tab-pane").hide();
        // $(".tab-pane:first").show();
        $(".tab_drawer_heading.d_active").find("i").removeClass("iconc-chevron-down").addClass("iconc-chevron-up");

        $('.nav-tabs li a').click(function (e) {     
            var href = $(this).attr('href');    
            $('.tab_drawer_heading').removeClass('d_active');
            $('.tab_drawer_heading a[href="'+href+'"]').closest('h3').addClass('d_active');

            $('.tab-pane').hide();
            $('.tab-pane'+href).show();
        })

        $('.tab_drawer_heading a').click(function (e) {     
            var href = $(this).attr('href');
            var self = $(this);
            if($('.tab-pane'+href).hasClass("active")) {
                return false;
            }
            $('.nav-tabs li').removeClass('active');
            $('.nav-tabs li a[href="'+href+'"]').closest('li').addClass('active');

            $('.tab_drawer_heading').removeClass('d_active');
            $('.tab_drawer_heading a[href="'+href+'"]').closest('h3').addClass('d_active');


            $('.tab-pane').slideUp();
            $('.tab-pane'+href).slideDown();

            $(".tab_drawer_heading").find("i").addClass("iconc-chevron-down").removeClass("iconc-chevron-up");
            $(".tab_drawer_heading.d_active").find("i").removeClass("iconc-chevron-down").addClass("iconc-chevron-up");
            // self.find("i").removeClass("iconc-chevron-down").addClass("iconc-chevron-up");
        })

    }

    initJs() {
        var _this = this;
        // jQuery(this.refs.submit).click(function(){
           
        //     //     var valid = jQuery(_this.refs.form).valid();
        //     //     if (!valid) {return false};
            
           
        // })


        $('.editor').trumbowyg({
            btns: [['bold', 'italic', 'underline'], ['unorderedList'], ['orderedList']]
            // autogrow: true
        });

        // $(this.refs.body).trumbowyg('html', this.props.data.body);
    }

    handleSumbit() {
        // jQuery.confirm({
        //     title: 'Verwijderen',
        //     content: "Weet u zeker dat u de zaal ‘De Duif’ wilt verwijderen?",
        //     closeIcon: true,
        //     buttons: {
        //         cancelAction: {
        //             text: 'Annuleren',
        //             action: function () {
        //                 jQuery(".jconfirm").hide()
        //             }
        //         },
        //         deleteUser: {
        //             text: 'Verwijder',
        //             action: function () {
        //                 jQuery(".jconfirm").hide()
        //             }
        //         }
        //     }
        // })
        var _this = this;
        let data = jQuery(_this.refs.form).serialize();    

        const dataJson = URI.parseQuery(data);
        if (dataJson.id) {
            ProjectHelper.save(data).then((response) => {
                _this.props.fetchProject(_this.props.params.projectId);
            })
        } else {
            ProjectHelper.save(data).then((response) => {
                hashHistory.push('/dashboard')
            })
        }


    }


    handleCancel() {
        jQuery.confirm({
            title: trans.pageProject_confirm_title,
            content: trans.pageProject_confirm_content,
            closeIcon: true,
            buttons: {
                cancelAction: {
                    text: trans.pageProject_confirm_cancel,
                    action: function () {
                        jQuery(".jconfirm").hide()
                    }
                },
                deleteAction: {
                    text: trans.pageProject_confirm_delete,
                    action: function () {
                        window.location.reload()
                        jQuery(".jconfirm").hide()
                    }
                }
            }
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

    onAttachmentTitleUpdated = () => {
        this.props.fetchProject(this.props.params.projectId);   
    }

    onOfferlistDateItemChange = (item) => {
        if(this.props.params.projectId) {
            this.props.fetchOfferRequestDetailsList(this.props.params.projectId, item.value);
        }
    }

    onRightBlockTerugClick (){
        jQuery(this.refs.block_right).slideUp('slow');
    }

    onMeerBtnClick (){
        jQuery(this.refs.block_right).slideDown('slow');
    }

    onContactFormonDataUpdate = (data) => {
        this.props.fetchProjectFormdata()
    }

    onContactDropdownAddNewClick = () => {
        PopupHelper.showContactForm({onDataUpdate: this.onContactFormonDataUpdate.bind(this)})
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
                    <label>{trans.pageProject_naam_locatie_label}</label>
                    <input type="text" className="form-control" name="project_title" defaultValue={this.props.project.project_title} />
                </div>
                <div className="form-group">
                    <label>{trans.pageProject_algemene_label}</label>
                    <textarea className="editor" name="description" defaultValue={this.props.project.description}></textarea>
                </div>
                <div className="form-group">
                    <label>{trans.pageProject_representatieve_label}</label>
                    <FileInput name="foto" onAttachmentDeleted={this.onAttachmentDeleted} selectedItems={images} onTitleUpdated={this.onAttachmentTitleUpdated} />
                </div>

                <div className="form-group">
                    <label>{trans.pageProject_video_link_label}</label>
                    <VideoInput items={this.props.project.project_videos} onVideoDeleted={this.onVideoDeleted} />
                </div>
                <div className="form-group">
                    <label>{trans.pageProject_garden_tour_label}</label>
                    <IframeInput items={this.props.project.project_iframes} onIframeDeleted={this.onIframeDeleted} />
                </div>

                <div className="form-group">
                    <label>{trans.pageProject_actie_label}</label>
                    <RadioList name="discount_filter_value_id" items={toevoegenList} selectedValue={this.props.project.discount_filter_value_id} />
                    
                </div>

                <div className="form-group">
                    <label className="question-mark-icon">{trans.pageProject_Aanbieding_label} <br /> {trans.pageProject_aanbieding_korte_label}
                        <a href="#" className="popoverData" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_aanbieding_korte_data_content}></a>
                    </label>
                    <input type="text" className="form-control" name="discount_short_title" defaultValue={this.props.project.discount_short_title} />
                    
                </div>

                <div className="form-group">
                    <label className="question-mark-icon">{trans.pageProject_Aanbieding_label} <br /> {trans.pageProject_aanbieding_lange_label}
                        <a href="#" className="popoverData" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_aanbieding_lange_data_content}></a>
                    </label>
                    <input type="text" className="form-control" name="discount_long_title" defaultValue={this.props.project.discount_long_title} />
                </div>
            </div>
        )
    }

    _render_tabDetails() {
        // console.log("this.props.project.eigen_catering", this.props.project.eigen_catering)
        const radioEigenCaterign = [
            {
                "title": trans.pageProject_radio_geen_eigen,
                "value": 0,
                "icon_class": "iconc iconc-no-food"
            },

            {
                "title": trans.pageProject_radio_eigen,
                "value": 1,
                "icon_class": "iconc iconc-food"
            }
        ]
        return (
            <div>
                <div className="form-group aantal-personen">
                    <label>{trans.pageProject_details_aantal_personen}</label>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="iconc-person"></i> {trans.pageProject_details_min}
                                </span>
                                <input type="text" className="form-control" name="person_min" defaultValue={this.props.project.person_min} />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="iconc-person"></i> {trans.pageProject_details_max}
                                </span>
                                <input type="text" className="form-control" name="person_max" defaultValue={this.props.project.person_max} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>{trans.pageProject_details_catering}</label>
                    <RadioList name="eigen_catering" items={radioEigenCaterign} selectedValue={this.props.project.eigen_catering} />

                </div>

                <div className="row">
                    <div className="col-lg-4">
                        <div className="form-group">
                            <label>{trans.pageProject_details_gebouwen}</label>
                            <CheckboxList name='gebouws[]' items={this.props.project_formdata.gebouwens} selectedItems={this.props.project.gebouws_mapping_ids} />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="form-group">
                            <label>{trans.pageProject_details_ligging}</label>
                            <CheckboxList name='liggings[]' items={this.props.project_formdata.liggings} selectedItems={this.props.project.liggings_mapping_ids} />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="form-group">
                            <label>{trans.pageProject_details_eigenschappen}</label>
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
                    <label>{trans.pageProject_details_aantal_personen}</label>
                    <div className="row">
                        <div className="col-md-4">
                            <ContactPersonDropdown
                                onAddNewClick={this.onContactDropdownAddNewClick} 
                                selectedValue={this.props.project.contact_id} 
                                items={this.props.project_formdata.contacts} 
                                emptyPlaceholder={trans.contactPersonDD_empty_placeholder}
                                />
                        </div>

                        {
                            this.props.project_contact ?
                                <div className="col-md-4 input-group-vmerge input-group--style-label">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <i className="iconc iconc-person"></i>
                                        </span>
                                        <label>{this.props.project_contact.name}</label>
                                    </div>
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <i className="iconc iconc-mail"></i>
                                        </span>
                                        
                                        <label>{this.props.project_contact.phone}</label>
                                    </div>
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <i className="iconc iconc-phone"></i>
                                        </span>
                                        
                                        <label>{this.props.project_contact.email}</label>
                                    </div>
                                </div>

                            : ''

                        }
                    </div>
                </div>

                <div className="form-group">
                    <label>{trans.pageProject_website_label}</label>
                    <input type="text" className="form-control" name="website" defaultValue={this.props.project.website} />

                </div>
            </div>
        )
    }

    

    _render_rightBlock() {
        return (
            <div className="block-right" ref="block_right">
                <div className="block-info">
                    <label>{trans.pageProject_rightBlock_bewerkingen}</label>
                    <div className="last_updated mt5">{trans.pageProject_rightBlock_updated}</div>

                    <div className="d-table w100 mt20">
                        <div className="d-table-cell v-align-middle">
                            <button ref="submit" type="button" className="btn btn-green btn--round" onClick={()=>{this.handleSumbit()}}>{trans.pageProject_rightBlock_opslaan}</button>
                        </div>
                        <div className="d-table-cell v-align-middle">
                            <button ref="annuleren" type="button" className="btn btn-plain" onClick={()=>{this.handleCancel()}}>{trans.pageProject_rightBlock_annuleren}</button>
                        </div>
                    </div>
                </div>
                <div className="block-info">
                    <label>{trans.pageProject_rightBlock_locatie}</label>
                    <div><a className="live" href={this.props.project.url} target="_blank">{trans.pageProject_rightBlock_link_live}</a> <i className="iconc-link pull-right px5 i-rotate25"></i></div>
                    <div><a className="concept" href={this.props.project.url_concept} target="_blank">{trans.pageProject_rightBlock_link_concept}</a> <i className="iconc-link pull-right px5 i-rotate25"></i></div>
                </div>
                <div className="block-info">
                    <label>{trans.pageProject_rightBlock_status}</label>
                    <div className="dropdown dropdown--status">
                        <i className="iconc-published before_text"></i>{trans.pageProject_rightBlock_gepubliceerd}
                        <a className="pull-right dropdown-toggle px5 i-rotate25" id="gepubliceerd" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><i className="iconc-edit"></i></a>

                        <ul className="dropdown-menu dropdown-menu--status" aria-labelledby="gepubliceerd">
                            <li>
                                <a href="">
                                    <label>
                                        <input type="radio" name="aanhef" value="dhr" />
                                        <span>{trans.pageProject_rightBlock_gepubliceerd} <i className="iconc-published"></i></span>
                                    </label>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <label>
                                        <input type="radio" name="aanhef" value="concept" />
                                        <span>{trans.pageProject_rightBlock_concept} <i className="iconc-concept"></i></span>
                                    </label>
                                </a>
                            </li>
                            
                        </ul>   
                    </div> 
                </div>
                <div className="block-info">
                    <label>{trans.pageProject_rightBlock_datum}</label>
                    <div className="last_updated">20 oktober 2016 om 17:15</div>
                </div>
                <div className="block-info">
                    <a href="#"><i className="iconc-trash before_text"></i>{trans.pageProject_rightBlock_zet_deze}</a>
                </div>
                <div className="block-info text-center">
                    <button type="button" onClick={()=>{this.onRightBlockTerugClick()}} className="a-hover-color">{trans.pageProject_rightBlock_terug}</button>
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
                    <label>{trans.pageProject_algemene_label}</label>
                    <textarea className="editor" name={`cat[${catitem.value}][description]`} defaultValue={fvm.description}></textarea>
                </div>
                <div className="form-group">
                    <label>{trans.pageProject_representatieve_label}</label>
                    <FileInput name="foto1" filter_value_id={catitem.value} onAttachmentDeleted={this.onAttachmentDeleted} selectedItems={images} />
                </div>
            </div>
        )
    }

    render() {
        console.log(this.props);
        if(this.props.params.projectId && jQuery.isEmptyObject(this.props.project) || jQuery.isEmptyObject(this.props.project_formdata)) {
            return false
        }
        
        const project = this.props.project
     
        const title = this.props.project.project_title ? this.props.project.project_title : 'Add New'
        return (
            <div className="projectPageContent">
                <ContentWrapper hasSidebar={true}>
                    <div className="page-panel">
                        <div className="page-panel__heading">{title}</div>
                        <div className="page-panel__inner">
                            <div className="page-panel__inner__left">
                                <ul className="nav nav-tabs nav-tabs--vertical" role="tablist">
                                    <li role="presentation" className="active">
                                        <a href="#general" aria-controls="general" role="tab" data-toggle="tab">{trans.pageProject_algemene_label} <i className="iconc-chevron"></i></a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#details" aria-controls="details" role="tab" data-toggle="tab">{trans.pageProject_tab_details} <i className="iconc-chevron"></i></a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#zalen" aria-controls="zalen" role="tab" data-toggle="tab">{trans.pageProject_tab_zalen} <i className="iconc-chevron"></i></a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#contact" aria-controls="contact" role="tab" data-toggle="tab">{trans.pageProject_tab_contact} <i className="iconc-chevron"></i></a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#locatie" aria-controls="locatie" role="tab" data-toggle="tab">{trans.pageProject_tab_locatie} <i className="iconc-chevron"></i></a>
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
                                        <a href="#aanvragen" aria-controls="aanvragen" role="tab" data-toggle="tab">{trans.pageProject_tab_aanvragen} <i className="iconc-chevron"></i></a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#statistieken" aria-controls="statistieken" role="tab" data-toggle="tab">{trans.pageProject_tab_statistieken} <i className="iconc-chevron"></i></a>
                                    </li>
                                </ul>
                            </div>
                            <div className="page-panel__inner__content">
                                <form className="form-default" ref="form">
                                    <input type="text" name="id" defaultValue={this.props.project.id} />
                                    <div className="tab-content">
                                        <h3 className="d_active tab_drawer_heading">
                                            <a href="#general" aria-controls="general" role="tab" data-toggle="tab">{trans.pageProject_algemene_label} <i className="iconc-chevron-down"></i></a>
                                        </h3>
                                        <div role="tabpanel" className="tab-pane " id="general">
                                           {this._render_tabGeneral()}
                                        </div>

                                        <h3 className="tab_drawer_heading">
                                            <a href="#details" aria-controls="details" role="tab" data-toggle="tab">{trans.pageProject_tab_details} <i className="iconc-chevron-down"></i></a>
                                        </h3>
                                        <div role="tabpanel" className="tab-pane " id="details">
                                            {this._render_tabDetails()}
                                        </div>

                                        <h3 className="tab_drawer_heading">
                                            <a href="#zalen" aria-controls="zalen" role="tab" data-toggle="tab">{trans.pageProject_tab_zalen} <i className="iconc-chevron-down"></i></a>
                                        </h3>
                                        <div role="tabpanel" className="tab-pane " id="zalen">
                                            <Zalen items={project.project_rooms} onZalenRemoved={this.onZalenRemoved} />
                                        </div>

                                        <h3 className="tab_drawer_heading">
                                            <a href="#contact" aria-controls="contact" role="tab" data-toggle="tab">{trans.pageProject_tab_contact} <i className="iconc-chevron-down"></i></a>
                                        </h3>
                                        <div role="tabpanel" className="tab-pane " id="contact">
                                            {this._render_tabContact()}
                                        </div>

                                        <h3 className="tab_drawer_heading">
                                            <a href="#locatie" aria-controls="locatie" role="tab" data-toggle="tab">{trans.pageProject_tab_locatie} <i className="iconc-chevron-down"></i></a>
                                        </h3>
                                        <div role="tabpanel" className="tab-pane " id="locatie">
                                            <LocatieInput 
                                                address={this.props.project.address}
                                                address_lat={this.props.project.lat}
                                                address_lng={this.props.project.lon}
                                                parkingItems={this.props.project.project_parkings}
                                                itemsProvice={this.props.project_formdata.provinces}
                                                itemsPlaats={this.props.project_formdata.plaats}
                                                itemsGebied={this.props.project_formdata.gebieds}
                                                selectedProvinceId={this.props.project_province.length>0 ? this.props.project.province[0].id : ''}
                                                selectedPlaatId={this.props.project_plaat.length>0 ? this.props.project.plaat[0].id : ''}
                                                selectedGebiedId={this.props.project_gebied.length>0 ? this.props.project.gebied[0].id : ''}
                                            />
                                        </div>

                                        {
                                            this.props.project_formdata.gelegenhendens.map((item, index) => {
                                                return [
                                                    <h3 className="tab_drawer_heading">
                                                        <a href={`#cat_${item.value}`} aria-controls="general" role="tab" data-toggle="tab">{item.title} <i className="iconc-chevron-down"></i></a>
                                                    </h3>,

                                                    <div role="tabpanel" className="tab-pane" id={`cat_${item.value}`} key={index}>
                                                        {this._render_catForm(item)}
                                                    </div>
                                                ]
                                            })
                                        }

                                        <h3 className="tab_drawer_heading">
                                            <a href="#aanvragen" aria-controls="aanvragen" role="tab" data-toggle="tab">{trans.pageProject_tab_aanvragen} <i className="iconc-chevron-down"></i></a>
                                        </h3>
                                        <div role="tabpanel" className="tab-pane active" id="aanvragen">
                                            <OfferRequestList onDateItemChange={this.onOfferlistDateItemChange} items={this.props.project_offer_request_details_list} />
                                        </div>

                                        <h3 className="tab_drawer_heading">
                                            <a href="#statistieken" aria-controls="statistieken" role="tab" data-toggle="tab">{trans.pageProject_tab_statistieken} <i className="iconc-chevron-down"></i></a>
                                        </h3>
                                        <div role="tabpanel" className="tab-pane " id="statistieken">
                                            <SnoobiPage />
                                        </div>

                                    </div>
                                    <div className="visible-xs visible-sm twoBtnStyle">
                                        <button type="button" className="" onClick={()=>{this.onMeerBtnClick()}}>{trans.pageProject_2btn_meer}</button>
                                        <button type="button" className="" onClick={()=>{this.handleSumbit()}}>{trans.pageProject_rightBlock_opslaan}</button>
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
