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
                            labelString: 'Aantal aanvragen'
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
                <h3 className="heading-main">Aanvragen in een grafiek</h3>
                <div className="block-graph">
                    <div className="headings text-center">
                        <h4>
                            Aanvragen
                        </h4>
                        <p>Aantal maandelijkse aanvragen per item</p>
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