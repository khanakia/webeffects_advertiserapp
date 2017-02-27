import React, { PropTypes } from 'react'

import {ProjectHelper} from '../../helpers'

import DropdownList from '../DropdownList'

class OfferRequestList extends React.Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        onDateItemChange: function(item) {},
        onPaginate: function(page) {},
        categories: [],
        items: [],

        offer_request_list: []
    }


    componentWillMount() {
    }

    componentDidMount() {
        var _this = this;
        jQuery('.accordion')
        .on('show.bs.collapse', function(e) {
            jQuery(e.target).prev('.accordion-heading').addClass('active');
        })
        .on('hide.bs.collapse', function(e) {
            jQuery(e.target).prev('.accordion-heading').removeClass('active');
        });

        this.paginationInit()
    }

    componentDidUpdate() {
        var _this = this;

        this.paginationInit()
    }


    paginationInit() {
        var _this = this;

        var $elem = jQuery('#offerrequest_paginations_list');

        if($elem.data("twbs-pagination")){
            $elem.twbsPagination('destroy');
        }

        if(_this.props.offer_request_list.total==0) return false;
        $elem.twbsPagination({
            initiateStartPageClick: false,
            totalPages: _this.props.offer_request_list.last_page,
            visiblePages: 5,
            startPage: _this.props.offer_request_list.current_page,
            // first: '<span aria-hidden="true">&laquo;</span>',
            // last: '<span aria-hidden="true">&raquo;</span>',
            firstClass: 'hidden',
            lastClass: 'hidden',
            prev: '<span aria-hidden="true">&laquo;</span>',
            next: '<span aria-hidden="true">&raquo;</span>',
            onPageClick: function (event, page) {            
                _this.props.onPaginate(page);
            }
        });
    }


    dateItemArray() {
        var startDateString = "2016-10-01";
        var endDateString = moment();
        var startDate = moment(startDateString, "YYYY-M-DD");
        var endDate = moment(endDateString, "YYYY-M-DD").endOf("month");
        
        var items = [];
        items.push({ 
            value: '',
            title: 'Selecteer maand'
        })

        while (startDate.isBefore(endDate)) {
            var monthInt = new Date(startDate).getMonth();
            var monthString = trans.months[monthInt];
            items.push({ value: startDate.format("YYYY-MM-DD"), title : monthString + startDate.format(" YYYY") });
            startDate = startDate.add(1, "month");
        };

        return items;        
    }

    onItemChange = (item) => {
        this.props.onDateItemChange(item)
        // console.log("dsfasdfdsaf", item)
    }

    _renderDatumJson(datum) {
        if(!datum) return null;
        // let json = JSON.parse(datum);
        let json = datum;
        // console.log("json jsonjsonjson", json)
        return json.map(function(item, index){
            // console.log("item.startdateitem.startdateitem.startdate",item.startdate)
            return (
                <div key={index}>
                    {item.startdate} {item.suffix} {item.enddate}
                </div>
            )
        })
    }

    _renderCategories(catids) {
        if(!catids) return null;
        return catids.map((id, index) => {
            var item = _.find(this.props.categories, {value: Number(id)});
            // console.info("ABCCCCCCCC", item)
            if(undefined==item) return null;
            return (
                <div key={index}>
                    {item.title}
                </div>
            )
        })
    }

    _renderItems() {
        const { data } = this.props.offer_request_list;
        console.log("this.props.itemsthis.props.offererquesss  ", this.props.offer_request_list.data)
        if(undefined==data || jQuery.isEmptyObject(data)) {
            return (
                <div>
                    <h5>{trans.no_data_found}</h5>
                </div>
            )
        }
        
        return data.map((item, index) => {
            // console.log(item);
            return (
                <div className="offerrequesttab" key={index}>    
                    <div className={'comp-offerrequestlist ' + item.id} ref="offerrequestlist">
                        <div className="accordion" >
                            <div className="accordion-group">
                                <div  className="accordion-heading">
                                    <a className="accordion-toggle panel_title" data-toggle="collapse" data-parent={'collapse' + item.id} href={'#collapse' + item.id}>
                                        {moment(item.created_at).format(Env.dateformat_default)}<span>{item.company ? item.company : item.name}</span>
                                    </a>
                                </div>
                                <div id={'collapse' + item.id} className="accordion-body collapse offerrequesttable">
                                    <div className="accordion-inner">                                                  
                                        <div className="row">
                                            <div className="col-md-6 col-sm-12">
                                                <div>
                                                    <h5>{trans.offerte_aanhef_label}</h5>
                                                    <p>{item.aanhef}</p>
                                                </div>                                                                
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                                <div>
                                                    <h5>{trans.offerte_naam_label}</h5>
                                                    <p>{item.name}</p>
                                                </div>                                                                
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                                <div>
                                                    <h5>{trans.offerte_bedrijfsnaam_label}</h5>
                                                    <p>{item.company}</p>
                                                </div>                                                                
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                                <div>
                                                    <h5>{trans.offerte_telefoonnummer}</h5>
                                                    <p>{item.phone}</p>
                                                </div>                                                                                                                            
                                            </div>
                                        </div>
                                        <div className="row">    
                                            <div className="col-md-6 col-sm-12">
                                                <div>
                                                    <h5>{trans.offerte_emailadres_label}</h5>
                                                    <p>{item.email}</p>
                                                </div>                                                                
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                                <div>
                                                    <h5>{trans.offerte_straatnaam_label}</h5>
                                                    <p>{item.straat}</p>
                                                </div>                                                                
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                                <div>
                                                    <h5>{trans.offerte_huisnummer_label}</h5>
                                                    <p>{item.house_no}</p>
                                                </div>                                                                
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                                <div>
                                                    <h5>{trans.offerte_postcode_label}</h5>
                                                    <p>{item.postcode}</p>
                                                </div>                                                                
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-sm-12">
                                                <div>
                                                    <h5>{trans.offerte_plaats_label}</h5>
                                                    <p>{item.plaat}</p>
                                                </div>                                                                
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                                <div>
                                                    <h5>{trans.offerte_geplande_datum_label}</h5>
                                                    {this._renderDatumJson(item.datum_json)}
                                                </div>                                                                
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                                <div>
                                                    <h5>{trans.offerte_aantal_personen_label}</h5>
                                                    <p>{item.no_of_person}</p>
                                                </div>                                                                
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                                <div>
                                                    <h5>{trans.offerte_gelegenheden_label}</h5>
                                                    {this._renderCategories(item.category_json)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">    
                                            <div className="col-md-6 col-sm-12">
                                                <div>
                                                    <h5>{trans.offerte_algemene}</h5>
                                                    <p>{item.description}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                                <div>
                                                    <h5>{trans.offerte_locatie_label}</h5>
                                                    <p>{item.description}</p>
                                                </div>                                                                                                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        )
    }
    render() {
        
        return (
            <div>
                <div className="section_offerrequest_dropdown form-group">
                    <label>{trans.offerte_title}</label>
                    {/*<div className="short-dropdown">
                        <DropdownList items={this.dateItemArray()} onItemChange={this.onItemChange} emptyPlaceholder={trans.select_maand_placeholder} />
                    </div>*/}
                </div>
                {this._renderItems()}
                <ul id="offerrequest_paginations_list"></ul>
            </div>
        ) 
    }
}
OfferRequestList.propTypes = {
    
};

export default OfferRequestList