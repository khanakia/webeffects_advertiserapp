import React, { PropTypes } from 'react'

import {ProjectRoomHelper} from '../../helpers'
class Zalen extends React.Component {

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
        onZalenRemoved: function(){}
    }

    componentDidMount() {
        this._checkDesktopMobile()
        window.addEventListener('resize', (event) => {
            this._checkDesktopMobile()
        });

        this.accordionInit()
    }

    compoentDidUpdate() {
        this.accordionInit()   
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
        ProjectRoomHelper.delete(id).then((response) => {
            this.props.onZalenRemoved()
        })
    }

    accordionInit() {
        var $mc = jQuery(this.refs.mobile_container)
        $mc.find(".content").hide();
        $mc.find(".content:first").show().addClass("active");
        jQuery(document).on('click', ".accordion-heading", function(){
            var href = $(this).attr('href');
            if($mc.find('.content'+href).hasClass("active")) {
                return false;
            }

            $mc.find('.content').removeClass('active');
            $mc.find('.content'+href).addClass('active');
            
            $mc.find('.content').slideUp();
            $mc.find('.content'+href).slideDown();

            return false;

        })
    }

    renderList() {
        // return this.props.items.map(function(item, index) {
        //     var checked = this.props.selectedItems.indexOf(item.value)!==-1 ? true : false;
        //     return (
        //         <li className="list-group-item" key={index}>
        //             <label><input type="checkbox" defaultValue={item.value} defaultChecked={checked} />{item.title}</label>
        //         </li>
        //     )
        // }, this)
    }


    _renderDesktop() {
        return (
            <table className="table table-bordered table--horizontal">
                <thead>
                    <tr>
                    <th><i className="fa fa-archive"></i></th>
                    <th>Titel</th>
                    <th>Daglicht</th>
                    <th>U-vorm</th>
                    <th>Carre</th>
                    <th>School</th>
                    <th>Theater</th>
                    <th>Cabaret</th>
                    <th>Receptie</th>
                    <th>Diner</th>
                    <th>Feest</th>
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
                                    <input type="hidden" name={`zalen[${index}][id]`} defaultValue={item.id} />
                                    <input type="text" name={`zalen[${index}][room_name]`} defaultValue={item.room_name} />
                                </td>
                                <td><input type="text" name={`zalen[${index}][daglicht]`} defaultValue={item.daglicht} /></td>
                                <td><input type="text" name={`zalen[${index}][u_vorm]`} defaultValue={item.u_vorm} /></td>
                                <td><input type="text" name={`zalen[${index}][carre]`} defaultValue={item.carre} /></td>
                                <td><input type="text" name={`zalen[${index}][school]`} defaultValue={item.school} /></td>
                                <td><input type="text" name={`zalen[${index}][theater]`} defaultValue={item.theater} /></td>
                                <td><input type="text" name={`zalen[${index}][cabaret]`} defaultValue={item.cabaret} /></td>
                                <td><input type="text" name={`zalen[${index}][receptie]`} defaultValue={item.receptie} /></td>
                                <td><input type="text" name={`zalen[${index}][diner]`} defaultValue={item.diner} /></td>
                                <td><input type="text" name={`zalen[${index}][feest]`} defaultValue={item.feest} /></td>
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
                                    <input type="text" name={`zalen_new[${index}][room_name]`} />
                                </td>
                                <td><input type="text" name={`zalen_new[${index}][daglicht]`} /></td>
                                <td><input type="text" name={`zalen_new[${index}][u_vorm]`} /></td>
                                <td><input type="text" name={`zalen_new[${index}][carre]`} /></td>
                                <td><input type="text" name={`zalen_new[${index}][school]`} /></td>
                                <td><input type="text" name={`zalen_new[${index}][theater]`} /></td>
                                <td><input type="text" name={`zalen_new[${index}][cabaret]`} /></td>
                                <td><input type="text" name={`zalen_new[${index}][receptie]`} /></td>
                                <td><input type="text" name={`zalen_new[${index}][diner]`} /></td>
                                <td><input type="text" name={`zalen_new[${index}][feest]`} /></td>
                            </tr>
                        )
                    }, this)}


                </tbody>
                <tfoot>
                    <tr>
                        <td><button type="button" className="btn btn-plain btn--nopad" onClick={()=>this.handleAddClick()}><i className="fa fa-plus"></i></button></td>
                        <td colSpan="10">
                            <label className="placeholder">Zall toevoegen</label>
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
                        <div key={`z-${item.id}`}>
                            <div className="input-group input-group--style-label">
                                <span className="input-group-addon">
                                    <button type="button" className="btn btn-plain btn--nopad hover-show" onClick={(e) => this.handleRemoveZalen(item.id)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                    <i className="fa fa-link hover-hide"></i>
                                </span>
                                <a className="accordion-heading" href={`#z-${item.id}`}>Vondelkerk</a>
                            </div>
                            <div className="content" id={`z-${item.id}`}>
                                <table className="table table-bordered table--vertical" >
                                    <tbody>
                                        <tr>
                                            <th>Title</th>
                                            <td>
                                                <input type="hidden" name={`zalen[${index}][id]`} defaultValue={item.id} />
                                                <input type="text" name={`zalen[${index}][room_name]`} defaultValue={item.room_name} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td><input type="text" name={`zalen[${index}][daglicht]`} defaultValue={item.daglicht} /></td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td><input type="text" name={`zalen[${index}][u_vorm]`} defaultValue={item.u_vorm} /></td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td><input type="text" name={`zalen[${index}][carre]`} defaultValue={item.carre} /></td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td><input type="text" name={`zalen[${index}][school]`} defaultValue={item.school} /></td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td><input type="text" name={`zalen[${index}][theater]`} defaultValue={item.theater} /></td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td><input type="text" name={`zalen[${index}][cabaret]`} defaultValue={item.cabaret} /></td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td><input type="text" name={`zalen[${index}][receptie]`} defaultValue={item.receptie} /></td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td><input type="text" name={`zalen[${index}][diner]`} defaultValue={item.diner} /></td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td><input type="text" name={`zalen[${index}][feest]`} defaultValue={item.feest} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }, this)}


                {this.state.itemsNew.map(function(item, index) {
                    return (
                        <div key={`z-${item}`}>
                            <div className="input-group input-group--style-label">
                                <span className="input-group-addon">
                                    <button type="button" className="btn btn-plain btn--nopad hover-show" onClick={(e) => this.handleRemoveZalen(item.id)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                    <i className="fa fa-link hover-hide"></i>
                                </span>
                                <a className="accordion-heading" href={`#zn-${item}`}>Vondelkerk</a>
                            </div>
                            <div className="content" id={`zn-${item}`}>
                                <table className="table table-bordered table--vertical" >
                                    <tbody>
                                        <tr>
                                            <th>Title</th>
                                            <td>
                                                <input type="text" name={`zalen_new[${index}][room_name]`} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td><input type="text" name={`zalen_new[${index}][daglicht]`} /></td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td><input type="text" name={`zalen_new[${index}][u_vorm]`} /></td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td><input type="text" name={`zalen_new[${index}][carre]`} /></td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td><input type="text" name={`zalen_new[${index}][school]`} /></td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td><input type="text" name={`zalen_new[${index}][theater]`} /></td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td><input type="text" name={`zalen_new[${index}][cabaret]`} /></td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td><input type="text" name={`zalen_new[${index}][receptie]`} /></td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td><input type="text" name={`zalen_new[${index}][diner]`} /></td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td><input type="text" name={`zalen_new[${index}][feest]`} /></td>
                                        </tr>
                                    </tbody>
                                </table>
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
            <div className={'comp-zalen ' + this.props.className} ref="Zalen">
                {
                    (this.state.isDesktop) ? this._renderDesktop() : this._renderMobile()
                }    
            </div>
        );
    }
}


Zalen.propTypes = {
    
};

export default Zalen