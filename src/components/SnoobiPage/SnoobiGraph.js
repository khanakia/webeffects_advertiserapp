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
            data: data,
            options: {
                legend: {
                    display: true,
                    position: 'bottom',
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: trans.project_snoobi_chart_yaxis_labelString
                        },
                        gridLines:{
                            color:"#BCBCBC",
                            zeroLineColor:"#BCBCBC"
                        }
                    }],
                    xAxes:[{
                        gridLines:{
                            color:"#BCBCBC",
                            zeroLineColor:"#BCBCBC"
                        }
                    }],
                }    
            }
        });
    }

    render() {
        return (
            <div className="graph-wrapper">
                <div className="block-graph">
                    <div className="headings text-center">
                        <h4>
                            {trans.project_snoobi_chart_heading}
                        </h4>
                        <p>{trans.project_snoobi_chart_subheading}</p>
                    </div>
                    <div className="chart-wrapper">
                        <canvas id="myChart" ></canvas>
                    </div>
                </div>
            </div>
        ) 
    }
}
SnoobiGraph.propTypes = {
    // data: React.PropTypes.arrayOf([]).isRequired
};

export default SnoobiGraph