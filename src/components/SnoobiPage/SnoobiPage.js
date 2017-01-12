import React, { PropTypes } from 'react'

import DropdownList from '../DropdownList'

class SnoobiPage extends React.Component {

    constructor(props) {
        super(props);
    }


    componentWillMount() {
    }

    componentDidMount() {
        jQuery('.accordion')
        .on('show.bs.collapse', function(e) {
        jQuery(e.target).prev('.accordion-heading').addClass('active');
        })
        .on('hide.bs.collapse', function(e) {
        jQuery(e.target).prev('.accordion-heading').removeClass('active');
        });

        if (Modernizr.mq('only all and (max-width: 767px)')) {
            var winWidth = $(window).width() - 90;
            $(".belangrijkste-wrapper").width(winWidth);
            jQuery('#belangrijkste_carousel').owlCarousel({
                loop: false,
                dots: false,
                margin:15,
                nav:false,
                navText: [
                  "<i class='fa fa-angle-left' ></i>",
                  "<i class='fa fa-angle-right'></i>"
                ],
                responsive:{
                    0:{
                        items:1,
                        stagePadding: 0,
                    },
                    600:{
                        items:1,
                        stagePadding: 50,
                    },
                }
            });
        }
    }

    componentDidUpdate() {
        
    }

    static defaultProps = {
        className: '',
        theme: '',
        items: []
        
    }
  

    render() {
        const countSortMonth = [
            {"value": "feb", "title": 'februari 2016'},
            {"value": "maar", "title": 'maart 2016'},
            {"value": "april", "title": 'april 2016'},
            {"value": "mei", "title": 'mei 2016'}
        ]
        const countSortRecent = [
            {"value": "recent", "title": 'Recente activiteit'},
            {"value": "alfabet", "title": 'Alfabet'}
        ]
        return (
            <div className="statistieken-wrapper">
                <div className="form-group">
                    <div className="row">
                        <div className="form-group col-md-12">
                            <label>Uw advertentie is bezocht door</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-lg-3 mb20">
                            <div className="dropdown dropdown--style1 xs-w100 wp120 dropdown-inline">
                                <button className="btn btn-dropdown dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Filters<i className="iconc-chevron-down"></i></button>
                                <ul className="dropdown-menu list-group" aria-labelledby="dropdownMenu1">
                                    <li className="list-group-item"><label><input type="checkbox" name="algemeen" value="algemeen" /><span>Algemeen</span></label></li>
                                    <li className="list-group-item"><label><input type="checkbox" name="telefoonnummer" value="telefoonnummer" /><span>Telefoonnummer</span></label></li>
                                    <li className="list-group-item"><label><input type="checkbox" name="trouwen" value="trouwen" /><span>Trouwen</span></label></li>
                                    <li className="list-group-item"><label><input type="checkbox" name="zalen" value="zalen" /><span>Zalen</span></label></li>
                                    <li className="list-group-item"><label><input type="checkbox" name="vergaderen" value="vergaderen" /><span>Vergaderen & congres</span></label></li>
                                    <li className="list-group-item"><label><input type="checkbox" name="vermelding" value="vermelding" /><span>Vermelding</span></label></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-9 mb20">
                            <div className="sorteren-wrapper pull-right visible-lg">
                                <span>Sorteren op:</span>
                                
                                <span className="wp150 ml15 mr10 dropdown-inline">
                                    <DropdownList items={countSortMonth} selectedValue={"feb"} />
                                </span>
                                <span className="wp180 dropdown-inline">
                                    <DropdownList items={countSortRecent} selectedValue={"recent"} />
                                </span>
                                
                            </div>
                            <div className="dropdown dropdown--style1 hidden-lg">
                                <button className="btn btn-dropdown dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sorteren op<i className="iconc-chevron-down"></i></button>
                                <ul className="dropdown-menu list-group" aria-labelledby="dropdownMenu1">
                                    <li className="list-group-item"><label><input type="radio" name="staus" value="recent" /><span>Recente activiteit</span></label></li>
                                    <li className="list-group-item"><label><input type="radio" name="status" value="alfabet" /><span>Alfabet</span></label></li>

                                    <li className="list-group-item"><label><span>Datum</span></label></li>
                                    <li className="list-group-item"><label><input type="radio" name="datum" value="trouwen" /><span>februari 2016</span></label></li>
                                    <li className="list-group-item"><label><input type="radio" name="datum" value="zalen" /><span>maart 2016</span></label></li>
                                    <li className="list-group-item"><label><input type="radio" name="datum" value="vergaderen" /><span>april 2016 & congres</span></label></li>
                                    <li className="list-group-item"><label><input type="radio" name="datum" value="vermelding" /><span>mei 2016</span></label></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="offerrequesttab">
                                <div id="accordion" className="accordion" role="tablist" aria-multiselectable="true">
                                  <div className="accordion-group">
                                    <div className="accordion-heading" role="tab" id="headingOne">
                                        <a className="accordion-toggle panel_title" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                          Yandex enterprise network
                                        </a>
                                    </div>

                                    <div id="collapseOne" className="accordion-body collapse" role="tabpanel" aria-labelledby="headingOne">
                                      <div className="accordion-inner">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-group">
                                    <div className="accordion-heading" role="tab" id="headingtwo">
                                        <a className="accordion-toggle panel_title" data-toggle="collapse" data-parent="#accordion" href="#collapsetwo" aria-expanded="true" aria-controls="collapsetwo">
                                          Simadan Holding B.V.
                                        </a>
                                    </div>

                                    <div id="collapsetwo" className="accordion-body collapse" role="tabpanel" aria-labelledby="headingtwo">
                                      <div className="accordion-inner">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-group">
                                    <div className="accordion-heading" role="tab" id="headingthree">
                                        <a className="accordion-toggle panel_title" data-toggle="collapse" data-parent="#accordion" href="#collapsethree" aria-expanded="true" aria-controls="collapsethree">
                                          Tulip B.V.
                                        </a>
                                    </div>

                                    <div id="collapsethree" className="accordion-body collapse" role="tabpanel" aria-labelledby="headingthree">
                                      <div className="accordion-inner">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-group">
                                    <div className="accordion-heading" role="tab" id="headingfour">
                                        <a className="accordion-toggle panel_title" data-toggle="collapse" data-parent="#accordion" href="#collapsefour" aria-expanded="true" aria-controls="collapsefour">
                                          SBS Broadcasting B.V.
                                        </a>
                                    </div>

                                    <div id="collapsefour" className="accordion-body collapse" role="tabpanel" aria-labelledby="headingfour">
                                      <div className="accordion-inner">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-group">
                                    <div className="accordion-heading" role="tab" id="headingfive">
                                        <a className="accordion-toggle panel_title" data-toggle="collapse" data-parent="#accordion" href="#collapsefive" aria-expanded="true" aria-controls="collapsefive">
                                          Transport Research Laboratory
                                        </a>
                                    </div>

                                    <div id="collapsefive" className="accordion-body collapse" role="tabpanel" aria-labelledby="headingfive">
                                      <div className="accordion-inner">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-group">
                                    <div className="accordion-heading" role="tab" id="headingsix">
                                        <a className="accordion-toggle panel_title" data-toggle="collapse" data-parent="#accordion" href="#collapsesix" aria-expanded="true" aria-controls="collapsesix">
                                          Shoeby-Shop BV
                                        </a>
                                    </div>

                                    <div id="collapsesix" className="accordion-body collapse" role="tabpanel" aria-labelledby="headingsix">
                                      <div className="accordion-inner">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-group">
                                    <div className="accordion-heading" role="tab" id="headingseven">
                                        <a className="accordion-toggle panel_title" data-toggle="collapse" data-parent="#accordion" href="#collapseseven" aria-expanded="true" aria-controls="collapseseven">
                                          Vemedia
                                        </a>
                                    </div>

                                    <div id="collapseseven" className="accordion-body collapse" role="tabpanel" aria-labelledby="headingseven">
                                      <div className="accordion-inner">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-group">
                                    <div className="accordion-heading" role="tab" id="headingeight">
                                        <a className="accordion-toggle panel_title" data-toggle="collapse" data-parent="#accordion" href="#collapseeight" aria-expanded="false" aria-controls="collapseeight">
                                          Ministerie van Veiligheid en Jus…
                                        </a>
                                    </div>
                                    <div id="collapseeight" className="accordion-body collapse" role="tabpanel" aria-labelledby="headingeight">
                                      <div className="accordion-inner">
                                        <label>Bedrijf</label>
                                        <p>Ministerie van Veiligheid en Justitie</p>
                                        <label>Locatie</label>
                                        <p>Den Haag</p>
                                        <label>Datum en wat bekeken</label>
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td>14 mei 2015</td>
                                                    <td>Algemeen</td>
                                                </tr>
                                                <tr>
                                                    <td>14 mei 2015</td>
                                                    <td>Algemeen</td>
                                                </tr>
                                                <tr>
                                                    <td>14 mei 2015</td>
                                                    <td>Algemeen</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label className="mt20 mb15">Uw belangrijkste concurrenten op DNLS</label>
                            <div className="belangrijkste-wrapper">
                                <div className="owl-carousel owl-theme" id="belangrijkste_carousel">
                                    <div className="item active">
                                        <div className="block-klanten">
                                            <div className="img-wrapper"></div>
                                            <div className="text-wrapper">
                                                <div className="title">
                                                    <label>Kasteel Hoekelum</label>
                                                    <span>Bennekom</span>
                                                </div>
                                                <p>Conferentieoord Kasteel Hoekelum is door de… Meer lezen over deze vergaderlocatie</p>
                                                <div className="info-wrapper mt15">
                                                    <i className="iconc-check"></i>
                                                    <span>Eigen catering mogelijk</span>
                                                </div>
                                                <div className="info-wrapper">
                                                    <i className="iconc-person"></i>
                                                    <span>200 tot 1000 personen</span>
                                                </div>
                                                <div className="info-wrapper">
                                                    <i className="iconc-room"></i>
                                                    <span>2 zalen</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="block-klanten">
                                            <div className="img-wrapper"></div>
                                            <div className="text-wrapper">
                                                <div className="title">
                                                    <label>Rode Hoed</label>
                                                    <span>Amsterdam</span>
                                                </div>
                                                <p>Rode Hoed is zeer geschikt als congreslo…Meer lezen over deze vergaderlocatie</p>
                                                <div className="info-wrapper mt15">
                                                    <i className="iconc-cross"></i>
                                                    <span>Geen eigen catering</span>
                                                </div>
                                                <div className="info-wrapper">
                                                    <i className="iconc-person"></i>
                                                    <span>2 tot 450 personen</span>
                                                </div>
                                                <div className="info-wrapper">
                                                    <i className="iconc-room"></i>
                                                    <span>7 zalen</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="block-klanten">
                                            <div className="img-wrapper"></div>
                                            <div className="text-wrapper">
                                                <div className="title">
                                                    <label>Hulstkamp Gebouw</label>
                                                    <span>Rotterdam</span>
                                                </div>
                                                <p>Het Hulstkamp Gebouw besichikt over vijf zal… Meer lezen over deze vergaderlocatie</p>
                                                <div className="info-wrapper mt15">
                                                    <i className="iconc-cross"></i>
                                                    <span>Geen eigen catering</span>
                                                </div>
                                                <div className="info-wrapper">
                                                    <i className="iconc-person"></i>
                                                    <span>50 tot 500 personen</span>
                                                </div>
                                                <div className="info-wrapper">
                                                    <i className="iconc-room"></i>
                                                    <span>5 zalen</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="warning-message my40">Er zijn gemiddeld 3 bezoeken nodig voordat een bezoeker een aanvraag doet</div>
                            <label className="mt20">Hoe komen we aan deze informatie?</label>
                            <div className="snoobi-wrapper">
                                <div className="img-wrapper"></div>
                                <p>Snoobi laat zien in welke volgorde bezoekers de pagina’s van uw website hebben bezocht. Dit betekent dat u het specifieke gedrag van een bezoeker kunt achterhalen, bijvoorbeeld welke zoekterm de bezoeker heeft gebruikt, welke producten en hoe lang de bezoeker een specifieke pagina heeft bekeken en wat zijn uiteindelijke actie is geweest! Voor meer informatie bekijk www.snoobi.nl.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
}
SnoobiPage.propTypes = {
    
};

export default SnoobiPage