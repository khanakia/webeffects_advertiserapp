import React, { PropTypes } from 'react'

import DropdownList from '../DropdownList'
import CheckboxListDropdown from '../CheckboxListDropdown'

import ProjectItems from './ProjectItems'
import SnoobiGraph from './SnoobiGraph'
import StatisticTabList from './StatisticTabList'

class SnoobiPage extends React.Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        user_actions_list: [],
        data : {},
        // list: [],
        // graph: [],
        // snoobi_most_requested_projects: [],
        onSortItemChange: function(item){},
        onMonthItemChange: function(item){},
        onFilterChange: function(filters){},
    }

    componentWillMount() {

    }

    componentDidMount() {
     

    }

    componentDidUpdate() {
    
    }


    render() {

        // console.log('this.props.data SNOOOBBBB', this.props.data);
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
                            <label>{trans.snoobiPage_uw_advertentie}
                                <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_uw_advertentie}></a>
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="left-col mb20">
                            <CheckboxListDropdown items={this.props.user_actions_list}  onItemChange={this.props.onFilterChange} emptyPlaceholder="Select" />
                        </div>
                        <div className="right-col mb20 snoobiSorten-wrapper">
                            <div className="sorteren-inner ">
                                <span className="mr15 sorten-text">{trans.snoobiPage_sorten_text}</span>
                                
                                <span className="wp140 mr10 dropdown-inline">
                                    <DropdownList items={countSortMonth} selectedValue={""} onItemChange={this.props.onMonthItemChange} emptyPlaceholder="Select"/>
                                </span>
                                <span className="wp170 dropdown-inline">
                                    <DropdownList items={countSortRecent} selectedValue={"date"} onItemChange={this.props.onSortItemChange} />
                                </span>
                                
                            </div>
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <StatisticTabList items={this.props.data.list} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <ProjectItems items={this.props.data.list_mostrequested_project} />
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
                            <SnoobiGraph data={this.props.data.list_graph} />
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