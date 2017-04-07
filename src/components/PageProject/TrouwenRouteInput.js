import React, { PropTypes } from 'react'

import {ProjectRoomHelper} from '../../helpers'
import InputBox from './InputBox'
import TextareaBox from './TextareaBox'


class TrouwenRouteInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items,
            itemsNew: [],
            isDesktop: true,
        }
        
    }

    static defaultProps = {        
        className: '',
        name: 'project_trouwenroutes',
        items: [],
        onZalenRemoved: function(){},
        reset: false,
        trouwenroute_description: '',
    }

    componentDidMount() {
        this._checkDesktopMobile()
        window.addEventListener('resize', (event) => {
            this._checkDesktopMobile()
        });

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
        let items = Object.assign([], this.state.items); 
        // console.log(items);
        items.map(function(item,index) {
            if(item.id==itemZalen.id) {
                item.is_deleted = 1;
            }
        })
        this.setState({ items: items});

        // var popup_content = _.template(trans.zalen_confirm_subtitle);
        // var zalen_confirm_subtitle = popup_content({ 'title': itemZalen.datum });

        // jQuery.confirm({
        //     title: trans.zalen_confirm_title,
        //     content: zalen_confirm_subtitle,
        //     closeIcon: true,
        //     buttons: {
        //         cancelAction: {
        //             text: trans.zalen_confirm_cancel_text,
        //             action: function () {
        //                 jQuery(".jconfirm").hide()
        //             }
        //         },
        //         deleteAction: {
        //             text: trans.zalen_confirm_delete_text,
        //             action: function () {
        //                 jQuery(".jconfirm").hide()
        //                 // ProjectRoomHelper.delete(item.id).then((response) => {
        //                 //     this.props.onZalenRemoved()
        //                 // })

                      


        //             }.bind(this)
        //         }
        //     }
        // })
    }

    accordionInit() {
        var $mc = jQuery(this.refs.mobile_container)
        $mc.find(".content").hide();
        $mc.find(".content:first").show().addClass("active");
        $mc.find(".accordion-heading:first").addClass("active");
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


    _renderDesktop() {
        // console.info("this.state.itemsthis.state.itemsthis.state.items", this.state.items)
        return (
            <div>
                

                <div className="form-group">
                    <label>{trans.trouwenroute_table_heading}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.trouwenroute_table_tooltip}></a>
                    </label>
                </div>

                <table className="table table-bordered table--horizontal">
                    <thead>
                        <tr>
                        <th className="wp40"><i className="iconc-room"></i></th> 
                        <th>{trans.trouwenroute_datum_heading}</th>
                        <th>{trans.trouwenroute_tijd_heading}</th>
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
                                        <input type="text" name={`${this.props.name}[${index}][datum]`} defaultValue={item.datum} />
                                    </td>
                                    <td><input type="text" name={`${this.props.name}[${index}][tijd]`} defaultValue={item.tijd} /></td>
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
                                        <input type="text" name={`${this.props.name}[${indexInput}][datum]`} />
                                    </td>
                                    <td><input type="text" name={`${this.props.name}[${indexInput}][tijd]`} /></td>
                                </tr>
                            )
                        }, this)}


                    </tbody>
                    <tfoot>
                        <tr>
                            <td><button type="button" className="btn btn-plain btn--nopad" onClick={()=>this.handleAddClick()}><i className="iconc-plus"></i></button></td>
                            <td colSpan="10">
                                <label className="placeholder">{trans.trouwenroute_addnewrow}</label>
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
                                    <label>{trans.trouwenroute_table_heading}</label>
                                </div>*/}
                {this.state.items.map(function(item, index) {
                    const cssClassHidden = (item.is_deleted==true) ? 'hidden' : '';
                    return (
                        <div key={`z-${item.id}`}>
                            <div className="input-group input-group--style-label input-group--style-a">
                                <span className="input-group-addon">
                                    <button type="button" className="btn btn-plain btn--nopad hover-show" onClick={(e) => this.handleRemoveZalen(item)}>
                                        <i className="iconc-trash"></i>
                                    </button>
                                    <i className="iconc-room hover-hide"></i>
                                </span>
                                <a className="accordion-heading" href={`#z-${item.id}`}>{trans.zalen_vondelkerk}</a>
                            </div>
                            <div className="content" id={`z-${item.id}`}>
                                <table className="table table-bordered table--vertical" >
                                    <tbody>
                                        <tr>
                                            <th>{trans.trouwenroute_datum_heading}</th>
                                            <td>
                                                <input type="hidden" className="form-control" name={`${this.props.name}[${index}][is_new]`} defaultValue={item.is_new} />
                                                <input type="hidden" className="form-control" name={`${this.props.name}[${index}][is_deleted]`} defaultValue={item.is_deleted} />
                                                <input type="hidden" name={`${this.props.name}[${index}][id]`} defaultValue={item.id} />
                                                <input type="text" name={`${this.props.name}[${index}][datum]`} defaultValue={item.datum} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>{trans.trouwenroute_tijd_heading}</th>
                                            <td><input type="text" name={`${this.props.name}[${index}][tijd]`} defaultValue={item.tijd} /></td>
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
                                            <th>{trans.trouwenroute_datum_heading}</th>
                                            <td>
                                                <input type="hidden" className="form-control" name={`${this.props.name}[${indexInput}][is_new]`} defaultValue='1' />
                                                <input type="hidden" className="form-control" name={`${this.props.name}[${indexInput}][is_deleted]`} defaultValue='0' />
                                                <input type="hidden" name={`${this.props.name}[${indexInput}][id]`} defaultValue={uniq_id} />
                                                <input type="text" name={`${this.props.name}[${indexInput}][datum]`} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>{trans.trouwenroute_tijd_heading}</th>
                                            <td><input type="text" name={`${this.props.name}[${indexInput}][tijd]`} /></td>
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
                    <input type="text" className="form-control" defaultValue={trans.trouwenroute_addnewrow} readOnly />
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className={'comp-trouwenrouteinput ' + this.props.className} ref="TrouwenRouteInput">
                <div className="form-group">
                    <label>{trans.trouwenroute_description_heading}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.trouwenroute_description_tooltip}></a>
                    </label>
                    <div className="row">
                        <div className="col-md-4">
                            <TextareaBox className="form-control" name={`trouwenroute_description`} value={this.props.trouwenroute_description} />
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


TrouwenRouteInput.propTypes = {
    
};

export default TrouwenRouteInput