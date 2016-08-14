import React, { Component } from 'react';
import ReactDom from 'react-dom';

import {API_URL_ORG_LOGO} from '../config.js'
import Auth from '../helpers/auth.js'

import {store} from '../store/index.js'


class UploadPopupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {file: '', imagePreviewUrl: ''};
    }

    static defaultProps = {
        onDataUpdate: function(org) {},
        
        popup_id: '',
        settings : {},
        data : {
            id: '',
            org_title: '',
        }    
    }

    componentWillMount() {

    }

    componentDidMount() {
        
    }


    static showInPoup() {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach : true,
            message : '<div id="' + uniq + '"></div>',
            opacity: 0.5,
            blur: false,
            onopen : function(e){
              var pid = (jQuery(e).attr('id'));
              ReactDom.render(<UploadPopupForm popup_id={pid} />, document.getElementById(uniq));
              console.log(pid);
            }
        });
    }


    hidePopup = () => {
        if (this.props.popup_id) {
            jQuery('#' + this.props.popup_id).popup('hide');
        }
    }

    handleImage(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();            
            reader.onload = function (e) {
                jQuery("#imageview").css('background-image', 'url('+e.target.result +')').removeClass("defaultimage");
            }

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var uploadFormEl = jQuery(".uploadform");
        var form = uploadFormEl[0];
        var formdata = new FormData(form);
        axios({
            method: 'post',
            url: API_URL_ORG_LOGO,
            headers: Auth.header(),
            data : formdata,
        }).then(function(response){
            if (response.data.status) {
                toastr.success(response.data.message);
                this.hidePopup();
            } else {
                toastr.error(response.data.message);
            }
        }.bind(this));
        return false;
    }

    render() {
        return (
            <div>
                <form className="uploadform" encType="multipart/form-data" ref='form' onSubmit={this.handleSubmit}>
                    <input type="hidden" className="form-control" ref="id" name="id" id="id" />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading">
                                <h3 className="title">Organization Logo</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div id="imageview" className="imageview defaultimage"></div>
                        </div>
                        <div className="col-md-8">
                            <div className="uploadinstruction">
                                Upload your profile picture here. The picture may have the following formats: .jpg, .gif or .png.
                            </div>
                            <input type="file" accept="image/x-png, image/gif, image/jpeg" onChange={(e)=>this.handleImage(e)} className="uploadimagefile" id="uploadimagefile" name="uploadimagefile" />
                        </div>
                    </div>

                    <div className="text-right btnUploadSubmit">
                        <button type="submit" className="btn btn-success">Save</button>
                    </div>
                </form>
            </div>
        );
    }
}


export default UploadPopupForm;