import React, { Component } from 'react';

import ReactDom from 'react-dom';

import ProjectFileBrowseForm from '../components/project_file/ProjectFileBrowseForm'
import ProjectFileDetailsEditForm from '../components/project_file/ProjectFileDetailsEditForm'

import CommentForm from '../components/project/CommentForm'

export default class PopupHelper {
    constructor() {

    }

    static showProjectFileBrowseForm(args = ProjectFileBrowseForm.defaultProps) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "w800",
            opacity: 0.5,
            blur: false,
            // zindex : 5000,

            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                jQuery('#'+pid + "_background").css('z-index', 5000);
                jQuery('#'+pid + "_wrapper").css('z-index', 5001);
                ReactDom.render(<ProjectFileBrowseForm popup_id={pid} {...args} />, document.getElementById(uniq));
                // console.log(pid);
                // setTimeout(() => jQuery('#'+pid).popup('hide'), 3000); 
            }
        });
    }


    static showProjectFileDetailsEditForm(args = ProjectFileDetailsEditForm.defaultProps) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "w500",
            opacity: 0.5,
            blur: false,
            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                ReactDom.render(<ProjectFileDetailsEditForm popup_id={pid} {...args} />, document.getElementById(uniq));
            }    
        });
    }


    static showCommentForm(args = CommentForm.defaultProps) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "w800",
            opacity: 0.5,
            blur: false,
            autozindex : true,
            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                ReactDom.render(<CommentForm popup_id={pid} {...args} />, document.getElementById(uniq));
            }    
        });
    }


}