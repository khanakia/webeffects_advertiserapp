import React, { PropTypes } from 'react'
import ProjectItem from './ProjectItem'

class StatisticTabList extends React.Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        items: [],
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
      
    }

    componentDidUpdate() {
       
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
        const list_item = this.props.items;
        if(undefined==list_item) return null;
        // console.log("this.props.list", this.props.items)
        return list_item.map((item, index) => {
            return (
                <div className="accordion-group" key={index}>
                    <div className="accordion-heading" role="tab" id={'heading'+index}>
                        <a className="accordion-toggle panel_title" data-toggle="collapse" data-parent="#accordion" href={'#collapse'+index} aria-expanded="true" aria-controls={'collapse'+index}>
                          {item.org_name} <span className="count-bekeken"><span className="count-bekeken-value">{item.details_count}</span><span className="count-bekeken-text">x bekeken</span></span>
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


    render() {
        return (
            <div className="comp-statistictablist offerrequesttab">
                <div id="accordion" className="accordion" ref="accordion" role="tablist" aria-multiselectable="true">
                    {this._renderListitem()}
                </div>
            </div>
        ) 
    }
}
StatisticTabList.propTypes = {
    items: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            org_name: React.PropTypes.any.isRequired.isNonNull,
            details_count: React.PropTypes.any.isRequired.isNonNull,
            details: React.PropTypes.any.isRequired,
        })
    )
};

export default StatisticTabList