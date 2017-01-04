import React, { PropTypes } from 'react'

import {ContactHelper} from '../../helpers'
class ContactPersonInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            itemsNew: [],
            isDesktop: false
        }
        
    }

    static defaultProps = {        
        className: '',
        items: [],
        onRemoved: function(){}
    }

    componentDidMount() {
        this._checkDesktopMobile()
        window.addEventListener('resize', (event) => {
            this._checkDesktopMobile()
        });

    }

    compoentDidUpdate() {
    
    }

    _checkDesktopMobile() {
        var w = window.innerWidth;
        if(w<1200 && this.state.isDesktop) {
            this.setState({
                isDesktop: false
            })
        } else if(w>1200 && !this.state.isDesktop) {
            this.setState({
                isDesktop: true
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        // If nextProp item are greater than current prop items it means user clicked the Save button so clear all the Newitems in state input because they already saved and will show as NextProp items
        if(nextProps.items.length > this.props.items.length) {
            this.setState({itemsNew: []})
        }

    }

    handleAddClick() {
        // var itemsNew = this.state.itemsNew.length;
        var newKey = (_.last(this.state.itemsNew)||0)+1
        this.setState({ itemsNew: this.state.itemsNew.concat(newKey)});
    }

    handleRemoveRow(index) {
        var items = this.state.itemsNew
        this.setState({itemsNew: items.filter((_, i) => i!==index)})
    }

    handleRemoveZalen = (id) => {
        ContactHelper.delete(id).then((response) => {
            this.props.onZalenRemoved()
        })
    }

 


    _renderDesktop() {
        return (
            <table className="table table-bordered table--horizontal">
                <thead>
                    <tr>
                        <th><i className="fa fa-archive"></i></th>
                        <th>Naam</th>
                        <th>Mail</th>
                        <th>Telefoon</th>
                        <th>Contactpersoon bedrijf</th>
                    </tr>
                </thead>
                <tbody>

                    {this.props.items.map(function(item, index) {
                        return (
                            <tr key={`z-${item.id}`}>
                                <td>
                                        <button type="button" className="btn btn-plain btn--nopad" onClick={()=>{this.handleRemoveZalen(item.id)}}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                </td>
                                <td>
                                    <input type="hidden" name={`contact[${index}][id]`} defaultValue={item.id} />
                                    <input type="text" name={`contact[${index}][name]`} defaultValue={item.name} />
                                </td>
                                <td><input type="text" name={`contact[${index}][email]`} defaultValue={item.email} /></td>
                                <td><input type="text" name={`contact[${index}][phone]`} defaultValue={item.phone} /></td>
                                <td><input type="checkbox" name={`contact[${index}][is_company]`} defaultChecked={item.is_company} /></td>
                            </tr>
                        )
                    }, this)}


                    {this.state.itemsNew.map(function(item, index) {
                        return (
                            <tr key={item}>
                                <td>
                                    <button type="button" className="btn btn-plain btn--nopad" onClick={()=>{this.handleRemoveRow(index)}}><i className="fa fa-trash"></i></button>
                                </td>
                                <td>
                                    <input type="text" name={`contact_new[${index}][name]`} />
                                </td>
                                <td><input type="text" name={`contact_new[${index}][email]`} /></td>
                                <td><input type="text" name={`contact_new[${index}][phone]`} /></td>
                            </tr>
                        )
                    }, this)}
                </tbody>
                <tfoot>
                    <tr>
                        <td><button type="button" className="btn btn-plain btn--nopad" onClick={()=>this.handleAddClick()}><i className="fa fa-plus"></i></button></td>
                        <td colSpan="10">
                            <label className="placeholder">Nieuw contactpersoon</label>
                        </td>
                    </tr>
                </tfoot>
            </table>
        )
    }

    _renderMobile() {
        return (
            <div ref="mobile_container">
                {this.props.items.map(function(item, index) {
                    return (
                        <div className="" key={`z-${item.id}`}>
                            <input type="hidden" name={`contact[${index}][id]`} defaultValue={item.id} />
                            <div className="input-group input-group--style-label">
                                <span className="input-group-addon">
                                    <button type="button" className="btn btn-plain btn--nopad hover-show" onClick={(e) => this.handleRemoveZalen(item.id)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                    <i className="fa fa-link hover-hide"></i>
                                </span>
                                <input type="text" className="form-control" name={`contact[${index}][name]`} defaultValue={item.name} />
                            </div>

                            <div className="input-group input-group--style-label">
                                <span className="input-group-addon">
                                    <i className="fa fa-link"></i>
                                </span>
                                <input type="text" className="form-control" name={`contact[${index}][email]`} defaultValue={item.email} />
                            </div>

                            <div className="input-group input-group--style-label">
                                <span className="input-group-addon">
                                    <i className="fa fa-link"></i>
                                </span>
                                <input type="text" className="form-control" name={`contact[${index}][phone]`} defaultValue={item.phone} />
                            </div>
                        </div>
                    )
                }, this)}


                {this.state.itemsNew.map(function(item, index) {
                    return (
                        <div className="" key={`z-${item}`}>
                            <div className="input-group input-group--style-label">
                                <span className="input-group-addon">
                                    <button type="button" className="btn btn-plain btn--nopad hover-show" onClick={(e) => this.handleRemoveRow(index)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                    <i className="fa fa-link hover-hide"></i>
                                </span>
                                <input type="text" className="form-control" name={`contact_new[${index}][name]`} />
                            </div>

                            <div className="input-group input-group--style-label">
                                <span className="input-group-addon">
                                    <i className="fa fa-link"></i>
                                </span>
                                <input type="text" className="form-control" name={`contact_new[${index}][email]`} />
                            </div>

                            <div className="input-group input-group--style-label">
                                <span className="input-group-addon">
                                    <i className="fa fa-link"></i>
                                </span>
                                <input type="text" className="form-control" name={`contact_new[${index}][phone]`} />
                            </div>
                        </div>
                    )
                }, this)}




                <div className="input-group input-group--style-label">
                    <span className="input-group-addon">
                        <button type="button" className="btn btn-plain btn--nopad" onClick={(e) => this.handleAddClick()}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </span>
                    <label>Zaal toevoegen</label>
                </div>
            </div>
        )
    }

    render() {

        return (
            <div className={'comp-contactpersoninput ' + this.props.className} ref="contactpersoninput">
                {
                    (this.state.isDesktop) ? this._renderDesktop() : this._renderMobile()
                }    
            </div>
        );
    }
}


ContactPersonInput.propTypes = {
    
};

export default ContactPersonInput