import React, { Component } from 'react';

import ReactDom from 'react-dom';

import ProjectFileBrowseForm from '../components/project_file/ProjectFileBrowseForm'
import ProjectFileDetailsEditForm from '../components/project_file/ProjectFileDetailsEditForm'

export default class PopupHelper {
	constructor() {
		
	}
	
    static showProjectFileBrowseForm(args=ProjectFileBrowseForm.defaultProps) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach : true,
            message : '<div id="' + uniq + '"></div>',
            container_class : "w800",
            opacity: 0.5,
            blur: false,
            onopen : function(e){
              var pid = (jQuery(e).attr('id'));
              ReactDom.render(<ProjectFileBrowseForm popup_id={pid} {...args} />, document.getElementById(uniq));
              console.log(pid);
              // setTimeout(() => jQuery('#'+pid).popup('hide'), 3000); 
            }
        });
    }


    static showProjectFileDetailsEditForm(args=ProjectFileDetailsEditForm.defaultProps) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach : true,
            message : '<div id="' + uniq + '"></div>',
            container_class : "w800",
            opacity: 0.5,
            blur: false,
            onopen : function(e){
              var pid = (jQuery(e).attr('id'));
              ReactDom.render(<ProjectFileDetailsEditForm popup_id={pid} {...args} />, document.getElementById(uniq));
              console.log(pid);
              // setTimeout(() => jQuery('#'+pid).popup('hide'), 3000); 
            }
        });
    }


}