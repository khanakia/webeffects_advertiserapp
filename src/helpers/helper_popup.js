import React, { Component } from 'react';
import ReactDom from 'react-dom';

import ContactForm from 'components/Forms/ContactForm'
import ChangePasswordForm from 'components/Forms/ChangePasswordForm'

export default class PopupHelper {
    constructor() {

    }


    static openPopup(args={}, onopen) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "w700",
            opacity: 0.5,
            blur: false,
            // zindex : 5000,

            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                //  jQuery('#'+pid + "_background").css('z-index', 5000);
                // jQuery('#'+pid + "_wrapper").css('z-index', 5001);
                onopen(uniq, pid)
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }
        });

    }


    static openPopupNoCloseButton(args={}, onopen) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "w700",
            opacity: 0.5,
            blur: false,
            container_class: 'no-close',
            // zindex : 5000,

            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                //  jQuery('#'+pid + "_background").css('z-index', 5000);
                // jQuery('#'+pid + "_wrapper").css('z-index', 5001);
                onopen(uniq, pid)
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }
        });

    }

    static showContactForm(args = {}) {
        PopupHelper.openPopup(args,function(uniq,pid){
            ReactDom.render(<ContactForm popup_id={pid} {...args} />, document.getElementById(uniq));
        })
    }

    static showChangePasswordForm(args = {}) {
        PopupHelper.openPopupNoCloseButton(args,function(uniq,pid){
            ReactDom.render(<ChangePasswordForm popup_id={pid} {...args} />, document.getElementById(uniq));
        })
    }
}