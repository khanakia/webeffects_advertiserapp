import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router'
import {AuthHelper, ProjectHelper} from '../helpers'

import ContentWrapper from './shared/ContentWrapper'


import ProjectTabGeneralForm from './PageProject/ProjectTabGeneralForm'
import RightBlock from './PageProject/RightBlock'


import PopupHelper from 'helpers/helper_popup'

import {PROJECT_STATUSES} from '../config'

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
        },
        project: {
            project_title: ''
        }
        
    }

    componentWillMount() {

        this.props.fetchProjectFormdata()
        // console.log(this.props.params.projectId)
        if(this.props.params.projectId) {
            this.props.fetchProject(this.props.params.projectId);
            this.props.fetchOfferRequestDetailsList(this.props.params.projectId);
        }
    }



    componentWillUpdate = (nextProps, nextState) => {        
        // $('.editor').each(function(){ $(this).trumbowyg('destroy'); })
        console.info(nextProps.params.projectId == this.props.params.projectId)

        var currentLocation = this.props.location.pathname
  
        if(nextProps.params.projectId !== this.props.params.projectId) {
            if(nextProps.params.projectId) {
                ReactDom.findDOMNode(this.refs.form).reset();

                this.props.fetchProject(nextProps.params.projectId);
                this.props.fetchOfferRequestDetailsList(nextProps.params.projectId);

                // window.location.reload()
            }
        }
    }

    componentDidMount() {
        this.initJs()

        // if(this.props.params.projectId) {
        //     this.props.fetchOfferRequestDetailsList(this.props.params.projectId);
        // }

        this.tabsFn();

        // ProjectHelper.projectStatus();
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
        if (dataJson.id) {
            ProjectHelper.save(data).then((response) => {
                toastr.success(trans.pageProject_saved_successfully)
                _this.props.fetchProject(_this.props.params.projectId);
                _this.props.fetchProjects()
            })
        } else {
            ProjectHelper.save(data).then((response) => {
                toastr.success(trans.pageProject_saved_successfully)
                hashHistory.push('/dashboard')
            })
        }


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
        jQuery(this.refs.block_right).slideUp('slow', function(){
            jQuery(this).css("display", "")
        });
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

  
    render() {
        console.log(this.props);
        const hiddenClass = this.props.params.projectId ? '' : 'hidden';
        if(this.props.params.projectId && jQuery.isEmptyObject(this.props.project) || jQuery.isEmptyObject(this.props.project_formdata)) {
            return false
        }
        
        const project = this.props.project
     
        const title = this.props.project.project_title ? this.props.project.project_title : trans.pageProject_addnew_title
        let status = PROJECT_STATUSES[project.project_status_id]

        console.log("this.props.project_videos", this.props.project)

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
                                    <input type="hidden" name="id" defaultValue={this.props.project.id} />
                                    <div className="tab-content">
                                        <h3 className="d_active tab_drawer_heading">
                                            <a href="#general" aria-controls="general" role="tab" data-toggle="tab">{trans.pageProject_algemene_label} <i className="iconc-chevron-down"></i></a>
                                        </h3>
                                        <div role="tabpanel" className="tab-pane active" id="general">
                                           
                                                <ProjectTabGeneralForm  
                                                    project_id={this.props.project.id}
                                                    project_formdata= {this.props.project_formdata}
                                                    attachment_mappings = {this.props.project.attachment_mappings}
                                                    project_title = {this.props.project.project_title}
                                                    description= {this.props.project.description}
                                                    onAttachmentDeleted= {this.onAttachmentDeleted}
                                                    onAttachmentTitleUpdated= {this.onAttachmentTitleUpdated}
                                                    project_videos= {this.props.project.project_videos}
                                                    onVideoDeleted= {this.onVideoDeleted}
                                                    project_iframes= {this.props.project.project_iframes}
                                                    onIframeDeleted= {this.onIframeDeleted}
                                                    discount_filter_value_id = {this.props.project.discount_filter_value_id}
                                                    discount_short_title = {this.props.project.discount_short_title}
                                                    discount_long_title = {this.props.project.discount_long_title} />
                                           
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
                                    project_id={this.props.project.id}
                                    project_status_id={this.props.project.project_status_id}
                                    updated_date={this.props.project.formatted_updated_at}
                                    created_date={this.props.project.formatted_updated_at}
                                    url={this.props.project.url}
                                    url_concept={this.props.project.url_concept}
                                    status={status}
                                    handleUpdateStatus={this.handleUpdateStatus}
                                    handleSumbit={this.handleSumbit}
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
