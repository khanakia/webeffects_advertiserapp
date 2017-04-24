import React, { PropTypes } from 'react'

import {ProjectRoomHelper, UtilHelper} from '../../helpers'
import InputBox from './InputBox'

class Zalen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items,
            itemsNew: [],
            isDesktop: true,
            zalen: this.props.zalen,
        }
        
    }

    static defaultProps = {        
        className: '',
        name: 'project_rooms',
        items: [],
        onZalenRemoved: function(){},
        reset: false,
        zalen: '',

        compare_json: []
    }

    componentDidMount() {
        this._checkDesktopMobile()
        window.addEventListener('resize', (event) => {
            this._checkDesktopMobile()
        });

        this.accordionInit()
    }

    componentDidUpdate() {
        
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
        // if(nextProps.items.length > this.props.items.length) {
        //     this.setState({itemsNew: []})
        // }

        if(nextProps.reset) {
            this.setState({items: nextProps.items, itemsNew: []})
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

    handleRemoveZalen = (itemZalen) => {
        var popup_content = _.template(trans.zalen_confirm_subtitle);
        var zalen_confirm_subtitle = popup_content({ 'title': itemZalen.room_name });

        jQuery.confirm({
            title: trans.zalen_confirm_title,
            content: zalen_confirm_subtitle,
            closeIcon: true,
            buttons: {
                cancelAction: {
                    text: trans.zalen_confirm_cancel_text,
                    action: function () {
                        jQuery(".jconfirm").hide()
                    }
                },
                deleteAction: {
                    text: trans.zalen_confirm_delete_text,
                    action: function () {
                        jQuery(".jconfirm").hide()
                        // ProjectRoomHelper.delete(item.id).then((response) => {
                        //     this.props.onZalenRemoved()
                        // })

                        let items = Object.assign([], this.state.items); 
                        // console.log(items);
                        items.map(function(item,index) {
                            if(item.id==itemZalen.id) {
                                item.is_deleted = 1;
                            }
                        })
                        this.setState({ items: items});


                    }.bind(this)
                }
            }
        })
    }

    accordionInit() {
        var $mc = jQuery(this.refs.mobile_container)
        // console.log("ACCORDION");
        // console.log($mc);
        $mc.find(".content").hide();
        // $mc.find(".content:first").show().addClass("active");
        // $mc.find(".accordion-heading:first").addClass("active");
        $mc.find(".accordion-heading").click(function(){
            var href = $(this).attr('href');
            $(".accordion-heading").removeClass("active");
            $(this).addClass("active");
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
        // console.info("this.state.itemsthis.state.itemsthis.state.items", this.state.items)

        const class_project_rooms = UtilHelper.compareJsonGetClass('project_rooms', this.props.compare_json);

        return (
            <div>
                

                <div className="form-group">
                    <label className={class_project_rooms}>{trans.zalen_page_title}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_zalen}></a>
                    </label>
                </div>

                <table className="table table-bordered table--horizontal">
                    <thead>
                        <tr>
                        <th className="wp40"><i className="iconc-room"></i></th> 
                        <th>{trans.zalen_tab_title}</th>
                        <th>{trans.zalen_tab_daglicht}</th>
                        <th>{trans.zalen_tab_u_vorm}</th>
                        <th>{trans.zalen_tab_carre}</th>
                        <th>{trans.zalen_tab_school}</th>
                        <th>{trans.zalen_tab_theater}</th>
                        <th>{trans.zalen_tab_cabaret}</th>
                        <th>{trans.zalen_tab_receptie}</th>
                        <th>{trans.zalen_tab_diner}</th>
                        <th>{trans.zalen_tab_feest}</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.items.map(function(item, index) {
                            const cssClassHidden = (item.is_deleted==true) ? 'hidden' : '';

                            return (
                                <tr className={cssClassHidden} key={item.id}>
                                    <td>
                                    <div className="input-group" key={index}>
                                        <span className="input-group-addon">
                                            <button type="button" className="btn btn-plain btn--nopad hover-show" onClick={()=>{this.handleRemoveZalen(item)}}>
                                                <i className="iconc-trash"></i>
                                            </button>
                                            <i className="hover-hide iconc-room"></i>
                                        </span>
                                    </div>
                                    </td>
                                    <td>
                                        <input type="hidden" className="form-control" name={`${this.props.name}[${index}][is_new]`} defaultValue={item.is_new} />
                                        <input type="hidden" className="form-control" name={`${this.props.name}[${index}][is_deleted]`} defaultValue={item.is_deleted} />
                                        <input type="hidden" name={`${this.props.name}[${index}][id]`} defaultValue={item.id} />
                                        <input type="text" name={`${this.props.name}[${index}][room_name]`} defaultValue={item.room_name} />
                                    </td>
                                    <td><input type="text" name={`${this.props.name}[${index}][daglicht]`} defaultValue={item.daglicht} /></td>
                                    <td><input type="text" name={`${this.props.name}[${index}][u_vorm]`} defaultValue={item.u_vorm} /></td>
                                    <td><input type="text" name={`${this.props.name}[${index}][carre]`} defaultValue={item.carre} /></td>
                                    <td><input type="text" name={`${this.props.name}[${index}][school]`} defaultValue={item.school} /></td>
                                    <td><input type="text" name={`${this.props.name}[${index}][theater]`} defaultValue={item.theater} /></td>
                                    <td><input type="text" name={`${this.props.name}[${index}][cabaret]`} defaultValue={item.cabaret} /></td>
                                    <td><input type="text" name={`${this.props.name}[${index}][receptie]`} defaultValue={item.receptie} /></td>
                                    <td><input type="text" name={`${this.props.name}[${index}][diner]`} defaultValue={item.diner} /></td>
                                    <td><input type="text" name={`${this.props.name}[${index}][feest]`} defaultValue={item.feest} /></td>
                                </tr>
                            )
                        }, this)}


                        {this.state.itemsNew.map(function(item, index) {
                            var uniq_id = (new Date()).getTime();
                            // this is to prevent same input index for above already saved items
                            const indexInput = index + 100;

                            return (
                                <tr key={item}>
                                    <td>
                                        <button type="button" className="btn btn-plain btn--nopad" onClick={()=>{this.handleRemoveRow(index)}}><i className="iconc-trash"></i></button>
                                    </td>
                                    <td>
                                        <input type="hidden" className="form-control" name={`${this.props.name}[${indexInput}][is_new]`} defaultValue='1' />
                                        <input type="hidden" className="form-control" name={`${this.props.name}[${indexInput}][is_deleted]`} defaultValue='0' />
                                        <input type="hidden" name={`${this.props.name}[${indexInput}][id]`} defaultValue={uniq_id} />
                                        <input type="text" name={`${this.props.name}[${indexInput}][room_name]`} />
                                    </td>
                                    <td><input type="text" name={`${this.props.name}[${indexInput}][daglicht]`} /></td>
                                    <td><input type="text" name={`${this.props.name}[${indexInput}][u_vorm]`} /></td>
                                    <td><input type="text" name={`${this.props.name}[${indexInput}][carre]`} /></td>
                                    <td><input type="text" name={`${this.props.name}[${indexInput}][school]`} /></td>
                                    <td><input type="text" name={`${this.props.name}[${indexInput}][theater]`} /></td>
                                    <td><input type="text" name={`${this.props.name}[${indexInput}][cabaret]`} /></td>
                                    <td><input type="text" name={`${this.props.name}[${indexInput}][receptie]`} /></td>
                                    <td><input type="text" name={`${this.props.name}[${indexInput}][diner]`} /></td>
                                    <td><input type="text" name={`${this.props.name}[${indexInput}][feest]`} /></td>
                                </tr>
                            )
                        }, this)}


                    </tbody>
                    <tfoot>
                        <tr>
                            <td><button type="button" className="btn btn-plain btn--nopad" onClick={()=>this.handleAddClick()}><i className="iconc-plus"></i></button></td>
                            <td colSpan="10">
                                <label className="placeholder">{trans.zalen_zaal}</label>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }

    _renderMobile() {
        return (
            <div ref="mobile_container">
                {/*<div className="form-group">
                                    <label>{trans.zalen_page_title}</label>
                                </div>*/}
                {this.state.items.map(function(item, index) {
                    const cssClassHidden = (item.is_deleted==true) ? 'hidden' : '';
                    return (
                        <div key={`z-${item.id}`}>
                            <div className="input-group input-group--style-label input-group--style-a input-group--style-zalen-mobile">
                                <span className="input-group-addon">
                                    <button type="button" className="btn btn-plain btn--nopad hover-show" onClick={(e) => this.handleRemoveZalen(item)}>
                                        <i className="iconc-trash"></i>
                                    </button>
                                    <i className="iconc-room hover-hide"></i>
                                </span>
                                <a className="accordion-heading" href={`#z-${item.id}`}>{item.room_name}</a>
                            </div>
                            <div className="content" id={`z-${item.id}`}>
                                <table className="table table-bordered table--vertical" >
                                    <tbody>
                                        <tr>
                                            <th>{trans.zalen_tab_title}</th>
                                            <td>
                                                <input type="hidden" className="form-control" name={`${this.props.name}[${index}][is_new]`} defaultValue={item.is_new} />
                                                <input type="hidden" className="form-control" name={`${this.props.name}[${index}][is_deleted]`} defaultValue={item.is_deleted} />
                                                <input type="hidden" name={`${this.props.name}[${index}][id]`} defaultValue={item.id} />
                                                <input type="text" name={`${this.props.name}[${index}][room_name]`} defaultValue={item.room_name} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>{trans.zalen_tab_daglicht}</th>
                                            <td><input type="text" name={`${this.props.name}[${index}][daglicht]`} defaultValue={item.daglicht} /></td>
                                        </tr>
                                        <tr>
                                            <th>{trans.zalen_tab_u_vorm}</th>
                                            <td><input type="text" name={`${this.props.name}[${index}][u_vorm]`} defaultValue={item.u_vorm} /></td>
                                        </tr>
                                        <tr>
                                            <th>{trans.zalen_tab_carre}</th>
                                            <td><input type="text" name={`${this.props.name}[${index}][carre]`} defaultValue={item.carre} /></td>
                                        </tr>
                                        <tr>
                                            <th>{trans.zalen_tab_school}</th>
                                            <td><input type="text" name={`${this.props.name}[${index}][school]`} defaultValue={item.school} /></td>
                                        </tr>
                                        <tr>
                                            <th>{trans.zalen_tab_theater}</th>
                                            <td><input type="text" name={`${this.props.name}[${index}][theater]`} defaultValue={item.theater} /></td>
                                        </tr>
                                        <tr>
                                            <th>{trans.zalen_tab_cabaret}</th>
                                            <td><input type="text" name={`${this.props.name}[${index}][cabaret]`} defaultValue={item.cabaret} /></td>
                                        </tr>
                                        <tr>
                                            <th>{trans.zalen_tab_receptie}</th>
                                            <td><input type="text" name={`${this.props.name}[${index}][receptie]`} defaultValue={item.receptie} /></td>
                                        </tr>
                                        <tr>
                                            <th>{trans.zalen_tab_diner}</th>
                                            <td><input type="text" name={`${this.props.name}[${index}][diner]`} defaultValue={item.diner} /></td>
                                        </tr>
                                        <tr>
                                            <th>{trans.zalen_tab_feest}</th>
                                            <td><input type="text" name={`${this.props.name}[${index}][feest]`} defaultValue={item.feest} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }, this)}


                {this.state.itemsNew.map(function(item, index) {
                    var uniq_id = (new Date()).getTime();
                    // this is to prevent same input index for above already saved items
                    const indexInput = index + 100;
                    return (
                        <div key={`z-${item}`}>
                            <div className="input-group input-group--style-label input-group--style-a">
                                <span className="input-group-addon">
                                    <button type="button" className="btn btn-plain btn--nopad hover-show" onClick={(e) => this.handleRemoveRow(index)}>
                                        <i className="iconc-trash"></i>
                                    </button>
                                    <i className="iconc-room hover-hide"></i>
                                </span>
                                <a className="accordion-heading" href={`#zn-${item}`}>{trans.zalen_vondelkerk}</a>
                            </div>
                            <div className="content" id={`zn-${item}`}>
                                <table className="table table-bordered table--vertical" >
                                    <tbody>
                                        <tr>
                                            <th>{trans.zalen_tab_title}</th>
                                            <td>
                                                <input type="hidden" className="form-control" name={`${this.props.name}[${indexInput}][is_new]`} defaultValue='1' />
                                                <input type="hidden" className="form-control" name={`${this.props.name}[${indexInput}][is_deleted]`} defaultValue='0' />
                                                <input type="hidden" name={`${this.props.name}[${indexInput}][id]`} defaultValue={uniq_id} />
                                                <input type="text" name={`${this.props.name}[${indexInput}][room_name]`} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>{trans.zalen_tab_daglicht}</th>
                                            <td><input type="text" name={`${this.props.name}[${indexInput}][daglicht]`} /></td>
                                        </tr>
                                        <tr>
                                            <th>{trans.zalen_tab_u_vorm}</th>
                                            <td><input type="text" name={`${this.props.name}[${indexInput}][u_vorm]`} /></td>
                                        </tr>
                                        <tr>
                                            <th>{trans.zalen_tab_carre}</th>
                                            <td><input type="text" name={`${this.props.name}[${indexInput}][carre]`} /></td>
                                        </tr>
                                        <tr>
                                            <th>{trans.zalen_tab_school}</th>
                                            <td><input type="text" name={`${this.props.name}[${indexInput}][school]`} /></td>
                                        </tr>
                                        <tr>
                                            <th>{trans.zalen_tab_theater}</th>
                                            <td><input type="text" name={`${this.props.name}[${indexInput}][theater]`} /></td>
                                        </tr>
                                        <tr>
                                            <th>{trans.zalen_tab_cabaret}</th>
                                            <td><input type="text" name={`${this.props.name}[${indexInput}][cabaret]`} /></td>
                                        </tr>
                                        <tr>
                                            <th>{trans.zalen_tab_receptie}</th>
                                            <td><input type="text" name={`${this.props.name}[${indexInput}][receptie]`} /></td>
                                        </tr>
                                        <tr>
                                            <th>{trans.zalen_tab_diner}</th>
                                            <td><input type="text" name={`${this.props.name}[${indexInput}][diner]`} /></td>
                                        </tr>
                                        <tr>
                                            <th>{trans.zalen_tab_feest}</th>
                                            <td><input type="text" name={`${this.props.name}[${indexInput}][feest]`} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }, this)}

                <div className="input-group input-group-vmerge">
                    <span className="input-group-addon">
                        <button type="button" className="btn btn-plain btn--nopad" onClick={() => this.handleAddClick()}>
                            <i className="iconc-plus"></i>
                        </button>
                    </span>
                    <input type="text" className="form-control" defaultValue={trans.zalen_zaal} readOnly />
                </div>
            </div>
        )
    }

    render() {
        const class_zalen = UtilHelper.compareJsonGetClass('zalen', this.props.compare_json);
        

        return (
            <div className={'comp-zalen ' + this.props.className} ref="Zalen">
                <div className="form-group">
                    <label className={class_zalen}>{trans.pageProject_catform_title}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_beschrijving}></a>
                    </label>
                    <div className="row">
                        <div className="col-md-4">
                            <InputBox type="text" className="form-control" name={`zalen`} value={this.props.zalen} />
                        </div>
                    </div>
                </div>
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