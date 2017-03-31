import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router'
import {AuthHelper, ProjectHelper} from '../helpers'

import ContentWrapper from './shared/ContentWrapper'


import ProjectTabGeneralForm from './PageProject/ProjectTabGeneralForm'
import ProjectTabDetailForm from './PageProject/ProjectTabDetailForm'
import ProjectTabContactForm from './PageProject/ProjectTabContactForm'
import ProjectTabLocatieForm from './PageProject/ProjectTabLocatieForm'
import ProjectTabCatForm from './PageProject/ProjectTabCatForm'
import RightBlock from './PageProject/RightBlock'
import Zalen from './PageProject/Zalen'

import OfferRequestList from './OfferRequestList'
import SnoobiPage from './SnoobiPage'

import InputBox from './PageProject/InputBox'
import PopupHelper from 'helpers/helper_popup'

import {PROJECT_STATUSES} from '../config'

class PageProject extends Component {
    constructor(props, context) {
        super(props, context);
        this.isReset = false;

        this.state = {
            // project: this.props.project 
            snoobi_args: {}
        }
    }

    static defaultProps = {
        project: {}  

    }

    componentWillMount() {

        this.props.fetchProjectFormdata()
        log(this.props.params.projectId, 'type1')
        if(this.props.params.projectId) {
            this.props.fetchProjectRevision(this.props.params.projectId);
            this.props.fetchOfferRequestDetailsList(this.props.params.projectId);

            this.props.fetchSnoobiData(this.props.params.projectId);

            // this.props.fetchSnoobiList(this.props.params.projectId);
            // this.props.fetchSnoobiGraph(this.props.params.projectId);
            // this.props.fetchSnoobiMostRequestedProjects(this.props.params.projectId);
        }
    }


    componentWillUpdate = (nextProps, nextState) => {        
        // $('.editor').each(function(){ $(this).trumbowyg('destroy'); })
        // console.info(nextProps.params.projectId == this.props.params.projectId)

        var currentLocation = this.props.location.pathname
  
        if(nextProps.params.projectId !== this.props.params.projectId) {
            if(nextProps.params.projectId) {
                // ReactDom.findDOMNode(this.refs.form).reset();

                this.props.fetchProjectRevision(nextProps.params.projectId);
                this.props.fetchOfferRequestDetailsList(nextProps.params.projectId);

                this.isReset = true;
                // window.location.reload()

            } else {
                this.props.createProject();
            }
        }
                
                this.isReset = true;
    }

    componentDidMount() {
        this.initJs()

        // if(this.props.params.projectId) {
        //     this.props.fetchOfferRequestDetailsList(this.props.params.projectId);
        // }

        this.tabsFn();

        // ProjectHelper.projectStatus();

        this.props.createProject();
    }

    componentDidUpdate() {
        this.initJs()
        jQuery('[data-toggle="popover"]').popover()

        // if(this.props.params.projectId) {
        //     this.props.fetchOfferRequestDetailsList(this.props.params.projectId);
        // }

        this.tabsFn();
    }


    tabsFn() {
        var _this = this;
        // $(".tab-pane").hide();
        // $(".tab-pane:first").show();
        $(".tab_drawer_heading.d_active").find("i").removeClass("iconc-chevron-down").addClass("iconc-chevron-up");

        $('.nav-tabs li a').click(function (e) {     
            var href = $(this).attr('href');    
            $('.tab_drawer_heading').removeClass('d_active');
            $('.tab_drawer_heading a[href="'+href+'"]').closest('h3').addClass('d_active');

            $('.tab-pane').hide();
            $('.tab-pane'+href).show();

            // console.log(href);
            if(href="#locatie") {
                _this.refs.locatieForm.handleRefresh();
            }
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
        $('.editor').trumbowyg({
            btns: [['bold', 'italic', 'underline'], ['unorderedList'], ['orderedList']]
            // autogrow: true
        });
       

        // $(this.refs.body).trumbowyg('html', this.props.data.body);
    }

   

    handleSumbit = () => {
                   
        var valid = jQuery(this.refs.form).valid();
        if (!valid) {return false};
        

        var _this = this;
        let data = jQuery(_this.refs.form).serialize();    

        const dataJson = URI.parseQuery(data);

        if(dataJson.plaat_id==false) {
            toastr.error(trans.pageProject_plaat_required);
            return false;
        }

        jQuery.confirm({
            title: trans.pageProject_save_title,
            content: trans.pageProject_save_content,
            closeIcon: true,
            columnClass: 'col-md-6 col-md-offset-3',
            buttons: {
                okAction: {
                    text: trans.pageProject_save_button,
                    btnClass: 'btn btn-green btn--round',
                    action: function () {
                        jQuery(".jconfirm").hide()
                       
                        ProjectHelper.saveRevision(data).then((response) => {
                            toastr.success(trans.pageProject_saved_successfully)
                            if(!this.props.params.projectId) {
                                hashHistory.push('/projects/'+response.data.id)                
                            }
                            _this.props.fetchProject(_this.props.params.projectId);
                            // _this.props.fetchProjects()
                        })
                    }.bind(this)
                },
               
            }
        })


    }

    rightBlock_handleSumbitAdmin = () => {
        var valid = jQuery(this.refs.form).valid();
        if (!valid) {return false};
        

        var _this = this;
        let data = jQuery(_this.refs.form).serialize();   

        const dataJson = URI.parseQuery(data);

        if(dataJson.plaat_id==false) {
            toastr.error(trans.pageProject_plaat_required);
            return false;
        } 

        ProjectHelper.save(data).then((response) => {
            toastr.success(trans.pageProject_saved_successfully)
            _this.props.fetchProject(_this.props.params.projectId);
            // _this.props.fetchProjects()
        })
    }


    handleCancel() {
        jQuery.confirm({
            title: trans.pageProject_confirm_title,
            content: trans.pageProject_confirm_content,
            closeIcon: true,
            columnClass: 'col-md-6 col-md-offset-3',
            buttons: {
                cancelAction: {
                    text: trans.pageProject_confirm_cancel,
                    action: function () {
                        jQuery(".jconfirm").hide()
                        hashHistory.push('/dashboard')
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

  

    onOfferlistDateItemChange = (item) => {
        if(this.props.params.projectId) {
            this.props.fetchOfferRequestDetailsList(this.props.params.projectId, item.value);
        }
    }

    onOfferlistPaginate = (page) => {
        if(this.props.params.projectId) {
            this.props.fetchOfferRequestDetailsList(this.props.params.projectId, page);
        }
    }

    onRightBlockTerugClick (){
        jQuery(this.refs.block_right).slideUp('slow', function(){
            jQuery(this).css("display", "")
        });
    }

    rightBlock_handleLoadActualData = () => {
        this.props.fetchProject(this.props.params.projectId);
        this.isReset = true;
    }

    rightBlock_handleLoadRevisionClick = () => {
        this.props.fetchProjectRevision(this.props.params.projectId);
        this.isReset = true;
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


    handleDelete = (id) => {
        var _this = this;
        jQuery.confirm({
            title: trans.project_deletepoup_title,
            content: trans.project_deletepoup_content,
            closeIcon: true,
            columnClass: 'col-md-6 col-md-offset-3',
            buttons: {
                cancelAction: {
                    text: trans.project_deletepoup_cancel,
                    action: function () {
                        jQuery(".jconfirm").hide()
                        // hashHistory.push('/dashboard')
                    }
                },
                deleteAction: {
                    text: trans.project_deletepoup_delete,
                    action: function () {
                        ProjectHelper.updateStatus(id, Env.project_status.waiting_for_unpublish).then((response) => {
                            _this.props.fetchProject(_this.props.params.projectId); 
                        })
                        jQuery(".jconfirm").hide()
                    }
                }
            }
        })
    }

    handleUpdateStatus = (project_id, status_id) => {
        ProjectHelper.updateStatus(project_id, status_id).then((response) => {
            this.props.fetchProject(this.props.params.projectId); 
        })
        
    }

    onProjectStatusChange = (item) => {
        ProjectHelper.updateStatus(this.props.project.id, item.value).then((response) => {
            this.props.fetchProject(this.props.params.projectId); 
        })
        
    }

    onSnoobiSortItemChange = (item) => {
        let snoobi_args = Object.assign({}, this.state.snoobi_args); 
        snoobi_args.sort = item.value;
        console.log(snoobi_args);

        this.props.fetchSnoobiList(this.props.params.projectId, 1, snoobi_args);
        this.setState({
            snoobi_args: snoobi_args
        })
        // alert(item.value)
    }

    onSnoobiMonthItemChange = (item) => {
        let snoobi_args = Object.assign({}, this.state.snoobi_args); 
        snoobi_args.filter_date = item.value;

        this.props.fetchSnoobiList(this.props.params.projectId, 1, snoobi_args);
        this.setState({
            snoobi_args: snoobi_args
        })
    }

    onSnoobiFilterChange = (filters) => {
        let snoobi_args = Object.assign({}, this.state.snoobi_args); 
        snoobi_args.filter_useractions = filters;

        this.props.fetchSnoobiList(this.props.params.projectId, 1, snoobi_args);
        this.setState({
            snoobi_args: snoobi_args
        })
    }
  
    render() {
        // console.log(this.props);
        const hiddenClass = this.props.params.projectId ? '' : 'hidden';
        if(this.props.params.projectId && jQuery.isEmptyObject(this.props.project) || jQuery.isEmptyObject(this.props.project_formdata)) {
            return false
        }
        
     
        const project = this.props.project
     
        const title = project.project_title ? project.project_title : trans.pageProject_addnew_title
        let status = PROJECT_STATUSES[project.project_status_id]

        // console.log("this.props.project_videos", this.props.project)

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
                                  
                                    <li role="presentation" className={`${hiddenClass}`}>
                                        <a href="#aanvragen" aria-controls="aanvragen" role="tab" data-toggle="tab">{trans.pageProject_tab_aanvragen} <i className="iconc-chevron"></i></a>
                                    </li>
                                    <li role="presentation" className={`${hiddenClass}`}>
                                        <a href="#statistieken" aria-controls="statistieken" role="tab" data-toggle="tab">{trans.pageProject_tab_statistieken} <i className="iconc-chevron"></i></a>
                                    </li>
                                </ul>
                            </div>
                            <div className="page-panel__inner__content">
                                <form className="form-default" ref="form">
                                    <InputBox type="hidden" name="id" value={project.id} />
                                    <div className="tab-content">
                                        <h3 className="d_active tab_drawer_heading">
                                            <a href="#general" aria-controls="general" role="tab" data-toggle="tab">{trans.pageProject_algemene_label} <i className="iconc-chevron-down"></i></a>
                                        </h3>
                                        <div role="tabpanel" className="tab-pane active" id="general">
                                           
                                                <ProjectTabGeneralForm  
                                                    reset={this.isReset}
                                                    project_id={project.id}
                                                    project_formdata= {this.props.project_formdata}
                                                    attachmentsList = {project.attachments}
                                                    project_title = {project.project_title}
                                                    description= {project.description}
                                                    onAttachmentDeleted= {this.onAttachmentDeleted}
                                                    onAttachmentTitleUpdated= {this.onAttachmentTitleUpdated}
                                                    project_videos= {project.project_videos}
                                                    onVideoDeleted= {this.onVideoDeleted}
                                                    project_iframes= {project.project_iframes}
                                                    onIframeDeleted= {this.onIframeDeleted}
                                                    discount_filter_value_id = {project.discount_filter_value_id}
                                                    discount_short_title = {project.discount_short_title}
                                                    discount_long_title = {project.discount_long_title} />
                                           
                                        </div>

                                        <h3 className="tab_drawer_heading">
                                            <a href="#details" aria-controls="details" role="tab" data-toggle="tab">{trans.pageProject_tab_details} <i className="iconc-chevron-down"></i></a>
                                        </h3>
                                        <div role="tabpanel" className="tab-pane " id="details">
                                            <ProjectTabDetailForm  
                                                    reset={this.isReset}
                                                    project_id={project.id}
                                                    person_min= {project.person_min}
                                                    person_max = {project.person_max}
                                                    eigen_catering = {project.eigen_catering}
                                                    gebouwenList= {this.props.project_formdata.gebouwens}
                                                    liggingList= {this.props.project_formdata.liggings}
                                                    eigenschappenList= {this.props.project_formdata.eigenschappens}
                                                    gebouws_mapping_ids= {project.gebouw_ids}
                                                    liggings_mapping_ids= {project.ligging_ids}
                                                    eigenschappens_mapping_ids= {project.eigenschappen_ids} />
                                        </div>


                                        <h3 className="tab_drawer_heading">
                                            <a href="#zalen" aria-controls="zalen" role="tab" data-toggle="tab">{trans.pageProject_tab_zalen} <i className="iconc-chevron-down"></i></a>
                                        </h3>
                                        <div role="tabpanel" className="tab-pane " id="zalen">
                                            <Zalen project_title={project.project_title} items={project.project_rooms} onZalenRemoved={this.onZalenRemoved} />
                                        </div>

                                        <h3 className="tab_drawer_heading">
                                            <a href="#contact" aria-controls="contact" role="tab" data-toggle="tab">{trans.pageProject_tab_contact} <i className="iconc-chevron-down"></i></a>
                                        </h3>
                                        <div role="tabpanel" className="tab-pane " id="contact">
                                             <ProjectTabContactForm  
                                                    reset={this.isReset}
                                                    // contact_id={project.contact_id}
                                                    contact_name= {project.contact_name}
                                                    contact_phone= {project.contact_phone}
                                                    contact_email = {project.contact_email}
                                                    contact_emails = {project.contact_emails}
                                                    website = {project.website}
                                                    contactsList= {this.props.project_formdata.contacts} 
                                                    onContactDropdownAddNewClick={this.onContactDropdownAddNewClick} />
                                        </div>


                                        <h3 className="tab_drawer_heading">
                                            <a href="#locatie" aria-controls="locatie" role="tab" data-toggle="tab">{trans.pageProject_tab_locatie} <i className="iconc-chevron-down"></i></a>
                                        </h3>
                                        <div role="tabpanel" className="tab-pane " id="locatie">
                                            <ProjectTabLocatieForm 
                                                ref="locatieForm"
                                                reset={this.isReset}
                                                address={project.address}
                                                address_lat={project.lat}
                                                address_lng={project.lon}
                                                parkingItems={project.project_parkings}
                                                itemsProvice={this.props.project_formdata.provinces}
                                                itemsPlaats={this.props.project_formdata.plaats}
                                                itemsGebied={this.props.project_formdata.gebieds}
                                                selectedProvinceId={project.province_id | ''}
                                                selectedPlaatId={project.plaat_id | ''}
                                                selectedGebiedId={project.gebied_id | ''}
                                            />
                                        </div>


                                        {
                                            this.props.project_formdata.gelegenhendens.map((item, index) => {
                                                return [
                                                    <h3 className="tab_drawer_heading">
                                                        <a href={`#cat_${item.value}`} aria-controls="general" role="tab" data-toggle="tab">{item.title} <i className="iconc-chevron-down"></i></a>
                                                    </h3>,

                                                    <div role="tabpanel" className="tab-pane" id={`cat_${item.value}`} key={index}>
                                                        <ProjectTabCatForm
                                                            project_id={project.id}
                                                            project_formdata= {this.props.project_formdata}
                                                            item={item}
                                                            geleghendens={project.geleghendens}
                                                            onAttachmentDeleted= {this.onAttachmentDeleted}
                                                            onAttachmentTitleUpdated= {this.onAttachmentTitleUpdated} />
                                                    </div>
                                                ]
                                            })
                                        }

                                        <h3 className={`tab_drawer_heading ${hiddenClass}`}>
                                            <a href="#aanvragen" aria-controls="aanvragen" role="tab" data-toggle="tab">{trans.pageProject_tab_aanvragen} <i className="iconc-chevron-down"></i></a>
                                        </h3>
                                        <div role="tabpanel" className={`tab-pane  ${hiddenClass}`} id="aanvragen">
                                            <OfferRequestList 
                                                categories={this.props.project_formdata.gelegenhendens}
                                                onDateItemChange={this.onOfferlistDateItemChange} 
                                                onPaginate={this.onOfferlistPaginate} 
                                                offer_request_list={this.props.project_offer_request_details_list} />
                                        </div>

                                        <h3 className={`tab_drawer_heading ${hiddenClass}`}>
                                            <a href="#statistieken" aria-controls="statistieken" role="tab" data-toggle="tab">{trans.pageProject_tab_statistieken} <i className="iconc-chevron-down"></i></a>
                                        </h3>
                                        <div role="tabpanel" className={`tab-pane  ${hiddenClass}`} id="statistieken">
                                            <SnoobiPage 
                                                user_actions_list={this.props.project_formdata.user_actions}
                                                onFilterChange={this.onSnoobiFilterChange}
                                                onSortItemChange={this.onSnoobiSortItemChange}
                                                onMonthItemChange={this.onSnoobiMonthItemChange}
                                                data={this.props.snoobi_data}
                                                // graph={this.props.snoobi_graph}
                                                // list={this.props.snoobi_list}
                                                // snoobi_most_requested_projects={this.props.snoobi_most_requested_projects}
                                            />
                                        </div>

                                    </div>
                                    <div className="visible-xs visible-sm twoBtnStyle bottom-buttons-pageproject">
                                        <button type="button" className="btn btn--transparent a-hover-color" onClick={()=>{this.onMeerBtnClick()}}>{trans.pageProject_2btn_meer}</button>
                                        <button type="button" className="btn btn--transparent a-hover-color" onClick={()=>{this.handleSumbit()}}>{trans.pageProject_rightBlock_opslaan}</button>
                                    </div>

                                </form>  
                            </div>
                            <div className="page-panel__inner__right">
                                <RightBlock 
                                    project_id={project.id}
                                    is_live_data={project.is_live_data}
                                    has_revision_data={project.has_revision_data}
                                    projectStatusList={this.props.project_formdata.project_status_list}
                                    onProjectStatusChange = {this.onProjectStatusChange}
                                    project_status_id={project.project_status_id}
                                    updated_date={project.updated_at}
                                    created_date={project.created_at}
                                    url={project.url_live}
                                    url_concept={project.url_concept}
                                    status={status}
                                    handleUpdateStatus={this.handleUpdateStatus}
                                    handleSumbit={this.handleSumbit}
                                    handleSumbitAdmin={this.rightBlock_handleSumbitAdmin}
                                    handleLoadActualData={this.rightBlock_handleLoadActualData}
                                    handleLoadRevisionClick={this.rightBlock_handleLoadRevisionClick}
                                    handleCancel={this.handleCancel}
                                    handleTerugClick={this.onRightBlockTerugClick} />
                            </div>
                        </div>
                    </div>
                </ContentWrapper>

                
            </div>
            
        );
    }
}


export default PageProject;
