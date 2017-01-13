import React, { PropTypes } from 'react'

import {ProjectHelper} from '../../helpers'

import DropdownList from '../DropdownList'

class OfferRequestList extends React.Component {

    constructor(props) {
        super(props);
    }


    componentWillMount() {
    }

    componentDidMount() {
        this.props.items;
        jQuery('.accordion')
        .on('show.bs.collapse', function(e) {
        jQuery(e.target).prev('.accordion-heading').addClass('active');
        })
        .on('hide.bs.collapse', function(e) {
        jQuery(e.target).prev('.accordion-heading').removeClass('active');
        });
    }


    static defaultProps = {        
        className: '',
        theme: '',
        items: []
        
    }


  

    render() {

        var startDateString = "2016-10-01";
        var endDateString = moment();
        var startDate = moment(startDateString, "YYYY-M-DD");
        var endDate = moment(endDateString, "YYYY-M-DD").endOf("month");
        var months = [ "januari", "februari", "maart", "april", "mei", "juni",
        "juli", "augustus", "september", "oktober", "november", "december" ];
        var items = [];

        while (startDate.isBefore(endDate)) {

            var monthInt = new Date(startDate).getMonth();

            var monthString = months[monthInt];
            items.push({ id: startDate.format("MM-DD-YYYY"), title : monthString + startDate.format(" YYYY") });
            startDate = startDate.add(1, "month");

        };

        console.log(items);

        return (
            <div>
                <div className="section_offerrequest_dropdown">
                    <div>{trans.offerte_title}</div>
                    <div className="short-dropdown">
                        <DropdownList items={items} selectedValue={3} />
                    </div>
                </div>
                {this.props.items.map(function(item, index){
                    return (                
                        <div className="offerrequesttab" key={index}>    
                            <div className={'comp-offerrequestlist ' + item.offer_request_id} ref="offerrequestlist">
                                <div className="accordion" id={'collapse' + item.id}>
                                    <div className="accordion-group">
                                        <div className="accordion-heading">
                                            <a className="accordion-toggle panel_title" data-toggle="collapse" data-parent={'collapse' + item.id} href={'#collapse' + item.offer_request_id}>
                                                {item.formatted_updated_at}<span>{item.offer_request.name}</span>
                                            </a>
                                        </div>
                                        <div id={'collapse' + item.offer_request_id} className="accordion-body collapse offerrequesttable">
                                            <div className="accordion-inner">                                                
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div>
                                                            <h5>{trans.offerte_aanvraag_label}</h5>
                                                            <p>{item.offer_request.aanhef}</p>
                                                        </div>                                                                
                                                    </div>
                                                </div>    
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-12">
                                                        <div>
                                                            <h5>{trans.offerte_naam_label}</h5>
                                                            <p>{item.offer_request.name}</p>
                                                        </div>                                                                
                                                    </div>
                                                    <div className="col-md-3 col-sm-12">
                                                        <div>
                                                            <h5>{trans.offerte_datum_label}</h5>
                                                            <p>{item.formatted_updated_at}</p>
                                                        </div>                                                                
                                                    </div>
                                                    <div className="col-md-3 col-sm-12">
                                                        <div>
                                                            <h5>{trans.offerte_bedrijfsnaam}</h5>
                                                        </div>                                                                
                                                    </div>
                                                    <div className="col-md-3 col-sm-12">
                                                        <div>
                                                            <h5>{trans.offerte_adres_bedrif_label}</h5>
                                                        </div>                                                                                                                            
                                                    </div>
                                                </div>
                                                <div className="row">    
                                                    <div className="col-md-3 col-sm-12">
                                                        <div>
                                                            <h5>{trans.offerte_evenementdatum_label}</h5>
                                                            <p>{item.offer_request.name}</p>
                                                        </div>                                                                
                                                    </div>
                                                    <div className="col-md-3 col-sm-12">
                                                        <div>
                                                            <h5>{trans.offerte_aantal_personen_label}</h5>
                                                            <p>{item.offer_request.no_of_person}</p>
                                                        </div>                                                                
                                                    </div>
                                                    <div className="col-md-3 col-sm-12">
                                                        <div>
                                                            <h5>{trans.offerte_emailadres_label}</h5>
                                                            <p>{item.offer_request.email}</p>
                                                        </div>                                                                
                                                    </div>
                                                    <div className="col-md-3 col-sm-12">
                                                        <div>
                                                            <h5>{trans.offerte_telefoonnummer}</h5>
                                                            <p>{item.offer_request.phone}</p>
                                                        </div>                                                                                                                            
                                                    </div>
                                                </div>
                                                <div className="row">    
                                                    <div className="col-md-12">
                                                        <div>
                                                            <h5>{trans.offerte_locatie_label}</h5>
                                                            <p>{item.offer_request.aanhef}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">    
                                                    <div className="col-md-12">
                                                        <div>
                                                            <h5>{trans.offerte_algemene}</h5>
                                                            <p>{item.offer_request.description}</p>
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
                )}
            </div>
        ) 
    }
}
OfferRequestList.propTypes = {
    
};

export default OfferRequestList