import React, { PropTypes } from 'react'
import ProjectItem from './ProjectItem'

class StatisticTabList extends React.Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        items: [],
        onPaginate: function(page) {},
    }


    componentWillMount() {
    }

    componentDidMount() {
        jQuery(this.refs.accordion)
            .on('show.bs.collapse', function(e) {
                jQuery(e.target).prev('.accordion-heading').addClass('active');
            })
            .on('hide.bs.collapse', function(e) {
                jQuery(e.target).prev('.accordion-heading').removeClass('active');
            });

        this.paginationInit()    
      
    }

    componentDidUpdate() {
        this.paginationInit()
    }

    paginationInit() {
        var _this = this;

        var $elem = jQuery('#snoobitable_paginations_list');

        if($elem.data("twbs-pagination")){
            $elem.twbsPagination('destroy');
        }

        if(_this.props.items.total==0) return false;
        $elem.twbsPagination({
            initiateStartPageClick: false,
            totalPages: _this.props.items.last_page,
            visiblePages: 5,
            startPage: _this.props.items.current_page,
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
        const list_item = this.props.items.data;
        if(undefined==list_item) return null;
        // console.log("this.props.list", this.props.items)
        if(this.props.items.total==0) {
            return (
                <div>
                    <h3>{trans.no_data_found}</h3>
                </div>
            )
        }
        return list_item.map((item, index) => {
            return (
                <div className="accordion-group" key={index}>
                    <div className="accordion-heading" role="tab" id={'heading'+index}>
                        <a className="accordion-toggle panel_title" data-toggle="collapse" data-parent="#accordion" href={'#collapse'+index} aria-expanded="true" aria-controls={'collapse'+index}>
                          {item.org_name} <span className="count-bekeken"><span className="count-bekeken-value">{item.details_count}</span><span className="count-bekeken-text">{trans.accordion_group_x_bekeken}</span></span>
                        </a>
                    </div>

                    <div id={'collapse'+index} className="accordion-body collapse" role="tabpanel" aria-labelledby={'heading'+index}>
                      <div className="accordion-inner">
                        <table>
                            <thead>
                            <tr>
                                <th>{trans.accordion_group_datum}</th>
                                <th>{trans.accordion_group_wat_bekeken}</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.renderStatsDetailList(item.details)}
                            </tbody>
                        </table>
                        
                      </div>
                    </div>
                </div>
            )}
        )
    }


    render() {
        return (
            <div className="comp-statistictablist offerrequesttab">
                <div id="accordion" className="accordion" ref="accordion" role="tablist" aria-multiselectable="true">
                    {this._renderListitem()}
                </div>
                <ul id="snoobitable_paginations_list"></ul>
            </div>
        ) 
    }
}
StatisticTabList.propTypes = {
    // items: React.PropTypes.arrayOf(
    //     React.PropTypes.shape({
    //         org_name: React.PropTypes.any.isRequired.isNonNull,
    //         details_count: React.PropTypes.any.isRequired.isNonNull,
    //         details: React.PropTypes.any.isRequired,
    //     })
    // )
};

export default StatisticTabList