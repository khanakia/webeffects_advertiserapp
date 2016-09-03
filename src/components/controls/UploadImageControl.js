import React, { Component } from 'react';
import ReactDom from 'react-dom';

import {API_URL_ORG_LOGO} from '../../config.js'
import Auth from '../../helpers/auth.js'

import {store} from '../../store/index.js'
import {action_appdata} from '../../actions';
const {fetchCurrentUser, fetchCurrentOrg} = action_appdata
import {fetchProjects} from '../../actions/action_project'
import {fetchCompanies} from '../../actions/action_company'


class UploadImageControl extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        onDataUpdate: function(org) {},
        
        popup_id: '',
        settings : {},

        uploadUrl : '',
        object : '',
        object_type : '',  // user, org, company, project
        object_id : '',   // user_id, org_id, company_id, project_id
        image : ''        // default image to show on Popup Open
    }

    componentWillMount() {

    }

    componentDidMount() {
        
    }


    // static showInPoup(data,uploadurl,userdata) {
    //     var uniq = 'id' + (new Date()).getTime();

    //     Controls.showpopup({
    //         detach : true,
    //         message : '<div id="' + uniq + '"></div>',
    //         opacity: 0.5,
    //         blur: false,
    //         onopen : function(e){
    //           var pid = (jQuery(e).attr('id'));
    //           ReactDom.render(<UploadImageControl has_user={userdata} upload_url={uploadurl} target_id={data.id} popup_id={pid} />, document.getElementById(uniq));
    //           console.log(pid);
    //         }
    //     });
    // }


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

    handleSubmit(e) {
        e.preventDefault();

        const uploadUrl = this.props.uploadUrl;

        var uploadFormEl = jQuery(".uploadform");
        var form = uploadFormEl[0];
        var formdata = new FormData(form);
        formdata.append('object_id', this.props.object_id);
        axios({
            method: 'post',
            url: uploadUrl,
            headers: Auth.header(),
            data : formdata,
        }).then(function(response){
            this.refreshState();                
            this.hidePopup();
        }.bind(this));

        return false;
    }


    refreshState() {
        const object_type =  this.props.object_type;
        if(object_type=="user") {
            store.dispatch(fetchCurrentUser());
        } else if(object_type=="org") {
            store.dispatch(fetchCurrentOrg());
        } else if(object_type=="project") {
            store.dispatch(fetchProjects());
        } else if(object_type=="company") {
            store.dispatch(fetchCompanies());
        }
        
    }

    render() {
        return (
            <div>
                <form className="uploadform" encType="multipart/form-data" ref='form' onSubmit={(e)=>this.handleSubmit(e)}>
                    <input type="hidden" className="form-control" ref="id" name="id" id="id" defaultValue={this.props.target_id} />
                    <div className="heading">
                        <h3 className="title">Upload Image</h3>
                    </div>
                    <div className="uploadform-inner">
                        <div className="row">
                            <div className="col-md-4">
                                <div id="imageview" className="imageview defaultimage" style={{backgroundImage:"url('" + this.props.image + "')"}}></div>
                            </div>
                            <div className="col-md-8">
                                <div className="uploadinstruction">
                                    Upload your profile picture here. The picture may have the following formats: .jpg, .gif or .png.
                                </div>
                                <input type="file" accept="image/x-png, image/gif, image/jpeg" onChange={(e)=>this.handleImage(e)} className="uploadimagefile" id="uploadimagefile" name="uploadimagefile" />
                            </div>
                        </div>
                        <div className="text-right btnUploadSubmit">
                            <button type="submit" className="btn btn-blue">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}


export default UploadImageControl;