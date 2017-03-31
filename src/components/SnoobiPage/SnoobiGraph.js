import React, { PropTypes } from 'react'
class SnoobiGraph extends React.Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        data: [],
    }


    componentWillMount() {
    }

    componentDidMount() {
        this.printGraph();
    }

    componentDidUpdate() {
        this.printGraph(); 
    }

    printGraph() {
        var data = this.props.data
        var ctx = jQuery("#myChart")
        var myBarChart = new Chart(ctx, {
            type: 'bar',
            data: data
            // options: options
        });
    }

    render() {
        return (
            <div className="graph-wrapper">
                <div className={'comp-snoobi-graph'}>
                   <canvas id="myChart"></canvas>
                </div>
            </div>
        ) 
    }
}
SnoobiGraph.propTypes = {
    // data: React.PropTypes.arrayOf([]).isRequired
};

export default SnoobiGraph