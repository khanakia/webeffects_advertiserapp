import React, { Component } from 'react';

import OrgHelper from '../helpers/helper_org.js'

class OrganizationAdd extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    handleSubmit = (e) => {
        e.preventDefault();
        var valid = jQuery("#orgForm").valid();
        if (!valid) {return false};
        // this.props.dispatch({type: 'REMOVE'});
        // this.props.fetchOrgs();

        OrgHelper.store({
            org_title : this.refs.org_title.value
        }).then(function(response){
            $('#orgFormModal').modal('hide');
            this.props.fetchOrgs();
        }.bind(this));
    }

    render() {

        return (
            <div>
                <a href="#" className="btn btn-success"  data-toggle="modal" data-target="#orgFormModal">Add Organization</a>

                <div className="modal fade" id="orgFormModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                  <div className="modal-dialog" role="document">
                    
                    <form className="modal-content" onSubmit={this.handleSubmit} id="orgForm">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>
                        <h4 className="modal-title" id="myModalLabel">Add</h4>
                      </div>
                      <div className="modal-body">
                        
                          <div className="form-group">
                            <label htmlFor="org_title" className="control-label">Recipient:</label>
                            <input type="text" className="form-control required" id="org_title" ref='org_title'/>
                          </div>
                        
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary">Save changes</button>
                      </div>
                    </form>
                  </div>
                </div>
            </div>
        );
    }
}


export default OrganizationAdd;
