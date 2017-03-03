import React, { PropTypes } from 'react'

import DropdownList from '../DropdownList'
import CheckboxListDropdown from '../CheckboxListDropdown'

class SnoobiPage extends React.Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        user_actions_list: [],
        list: [],
        graph: [],
        snoobi_most_requested_projects: [],
        onSortItemChange: function(item){},
        onMonthItemChange: function(item){},
        onFilterChange: function(filters){},
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
        var data = this.props.graph
        var ctx = jQuery("#myChart")
        var myBarChart = new Chart(ctx, {
            type: 'bar',
            data: data
            // options: options
        });
    }

    static defaultProps = {
        className: '',
        theme: '',
        items: []
        
    }

    renderStatsDetailList(list) {
        if(undefined==list) return null;
        return list.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.action_text}</td>
                </tr>
            )}
        )
    }
    _renderListitem() {
        const list_item = this.props.list;
        if(undefined==list_item) return null;
        console.log("this.props.list", this.props.list)
        return list_item.map((item, index) => {
            return (
                <div className="accordion-group" key={index}>
                    <div className="accordion-heading" role="tab" id={'heading'+index}>
                        <a className="accordion-toggle panel_title" data-toggle="collapse" data-parent="#accordion" href={'#collapse'+index} aria-expanded="true" aria-controls={'collapse'+index}>
                          {item.org_name}
                        </a>
                    </div>

                    <div id={'collapse'+index} className="accordion-body collapse" role="tabpanel" aria-labelledby={'heading'+index}>
                      <div className="accordion-inner">
                        <table>
                            <tr>
                                <td>Datum</td>
                                <td>Wat bekeken</td>
                            </tr>
                            {this.renderStatsDetailList(item.details)}
                        </table>
                        
                      </div>
                    </div>
                </div>
            )}
        )
    }

    _renderProjects() {
        const requested_projects = this.props.snoobi_most_requested_projects;

        return requested_projects.map((item, index) => {
            const imgUrl = {
                backgroundImage: 'url(' + item.featured_image_url + ')',
            };
            return (
                <div className={'item '} key={index}>
                    <div className="block-klanten">
                        <div className="img-wrapper" style={ imgUrl}></div>
                        <div className="text-wrapper">
                            <div className="title">
                                <label><a href="{{item.url_live}}" target="_blank">{item.project_title}</a></label>
                                <span>Bennekom</span>
                            </div>
                            <p>{item.excerpt}</p>
                            <div className="info-wrapper mt15">
                                <i className={item.eigen_icon_class}></i>
                                <span>{item.eigen_text}</span>
                            </div>
                            <div className="info-wrapper">
                                <i className="iconc-person"></i>
                                <span>{item.person_min} tot {item.person_max} personen</span>
                            </div>
                            <div className="info-wrapper">
                                <i className="iconc-room"></i>
                                <span>{item.zalen_count} zalen</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        )
    }

    render() {
        var a = moment('2016-10-01');
        var b = moment();

        const countSortMonth = [];
        for (var m = moment(a); m.isBefore(b); m.add('months', 1)) {
            // console.log(m.format('YYYY-MM-DD'));
            countSortMonth.push({
                "value": m.format('YYYY-MM-DD'), 
                "title": m.format('MMMM YYYY'), 
            })
        }

        // const countSortMonth = [
        //     {"value": "feb", "title": 'februari 2016'},
        //     {"value": "maar", "title": 'maart 2016'},
        //     {"value": "april", "title": 'april 2016'},
        //     {"value": "mei", "title": 'mei 2016'}
        // ]
        const countSortRecent = [
            {"value": "date", "title": trans.snoobiPage_sort_recente},
            {"value": "name", "title": trans.snoobiPage_sort_alfabet}
        ]
        return (
            <div className="statistieken-wrapper">
                <div className="form-group">
                    <div className="row">
                        <div className="form-group col-md-12">
                            <label>{trans.snoobiPage_uw_advertentie}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-lg-3 mb20">
                            <CheckboxListDropdown items={this.props.user_actions_list}  onItemChange={this.props.onFilterChange} emptyPlaceholder="Select" />
                        </div>
                        <div className="col-md-6 col-lg-9 mb20 snoobiSorten-wrapper">
                            <div className="sorteren-inner visible-lg">
                                <span className="mr15 sorten-text">{trans.snoobiPage_sorten_text}</span>
                                
                                <span className="wp140 mr10 dropdown-inline">
                                    <DropdownList items={countSortMonth} selectedValue={""} onItemChange={this.props.onMonthItemChange} emptyPlaceholder="Select"/>
                                </span>
                                <span className="wp170 dropdown-inline">
                                    <DropdownList items={countSortRecent} selectedValue={"date"} onItemChange={this.props.onSortItemChange} />
                                </span>
                                
                            </div>
                            <div className="dropdown dropdown--style1 hidden-lg">
                                <button className="btn btn-dropdown dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sorteren op<i className="iconc-chevron-down"></i></button>
                                <ul className="dropdown-menu list-group" aria-labelledby="dropdownMenu1">
                                    <li className="list-group-item"><label><input type="radio" name="staus" value="recent" /><span>{trans.snoobiPage_sort_recente}</span></label></li>
                                    <li className="list-group-item"><label><input type="radio" name="status" value="alfabet" /><span>{trans.snoobiPage_sort_alfabet}</span></label></li>

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
                                    {this._renderListitem()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label className="mt20 mb15">{trans.snoobiPage_uw_belangrijkste_title}</label>
                            <div className="belangrijkste-wrapper">
                                <div className="owl-carousel owl-theme" id="belangrijkste_carousel">
                                    {this._renderProjects()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="warning-message my40">{trans.snoobiPage_warning_msg}</div>
                            <label className="mt20">{trans.snoobiPage_snoobi_img_title}</label>
                            <div className="snoobi-wrapper">
                                <div className="img-wrapper"></div>
                                <p>{trans.snoobiPage_snoobi_img_desc}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <canvas id="myChart"></canvas>
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