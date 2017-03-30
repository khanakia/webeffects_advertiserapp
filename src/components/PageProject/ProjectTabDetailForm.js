import React, { Component } from 'react';
import ReactDom from 'react-dom';


// import RadioList from 'components/RadioList'
// import CheckboxList from 'components/CheckboxList'

import InputBox from './InputBox'
import RadioButtonGroup from './RadioButtonGroup'
import ChecboxButtonGroup from './ChecboxButtonGroup'

class ProjectTabDetailForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eigen_catering: this.props.eigen_catering,
            gebouws_mapping_ids : this.props.gebouws_mapping_ids,
            liggings_mapping_ids : this.props.liggings_mapping_ids,
            eigenschappens_mapping_ids : this.props.eigenschappens_mapping_ids,
        }
    }

    static defaultProps = {
        reset: false,
        person_min : '',
        person_max : '',
        eigen_catering : 0,


        gebouwenList: [],
        liggingList: [],
        eigenschappenList: [],

        gebouws_mapping_ids : [],
        liggings_mapping_ids : [],
        eigenschappens_mapping_ids : [],
    }

    componentWillMount() {
       
    }

    componentDidMount() {
        
    }

    componentDidUpdate() {
        
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.reset) {
            this.setState({
                eigen_catering: nextProps.eigen_catering,
                gebouws_mapping_ids: nextProps.gebouws_mapping_ids,
                liggings_mapping_ids: nextProps.liggings_mapping_ids,
                eigenschappens_mapping_ids: nextProps.eigenschappens_mapping_ids,
            })
        }
    }

    handleChange = (value) => {
        this.setState({
          eigen_catering: value
        });
        console.log(value)
    }

    handleChange_liggings = (value, checked) => {
        let items = Object.assign([], this.state.liggings_mapping_ids); 

        if(checked) {
            items.push(parseInt(value));
        } else {
            items = items.filter(function(index){
                return parseInt(value)!==index;
            })
        }
        this.setState({
            liggings_mapping_ids: items
        })
    }

    handleChange_gebouws = (value, checked) => {
        let items = Object.assign([], this.state.gebouws_mapping_ids); 

        if(checked) {
            items.push(parseInt(value));
        } else {
            items = items.filter(function(index){
                return parseInt(value)!==index;
            })
        }
        this.setState({
            gebouws_mapping_ids: items
        })
    }

    handleChange_eigenschappens = (value, checked) => {
        let items = Object.assign([], this.state.eigenschappens_mapping_ids); 

        if(checked) {
            items.push(parseInt(value));
        } else {
            items = items.filter(function(index){
                return parseInt(value)!==index;
            })
        }
        this.setState({
            eigenschappens_mapping_ids: items
        })
    }


    render() {
        const radioEigenCaterign = [
            {
                "title": trans.pageProject_radio_geen_eigen,
                "value": 0,
                "icon_class": "iconc iconc-no-food"
            },

            {
                "title": trans.pageProject_radio_eigen,
                "value": 1,
                "icon_class": "iconc iconc-food"
            }
        ]
        return (
            <div>
                <div className="form-group aantal-personen">
                    <label>{trans.pageProject_details_aantal_personen}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_aantal_personen}></a>
                    </label>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="iconc-person"></i> {trans.pageProject_details_min}
                                </span>
                                <InputBox type="number" className="form-control" name="person_min" value={this.props.person_min} />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="iconc-person"></i> {trans.pageProject_details_max}
                                </span>
                                <InputBox type="number" className="form-control" name="person_max" value={this.props.person_max} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>{trans.pageProject_details_catering}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_catering}></a>
                    </label>
                    <div className="row">
                        <div className="col-md-8">
                            {/*<RadioList name="eigen_catering" isIcon items={radioEigenCaterign} selectedValue={this.props.eigen_catering} />*/}
                            <RadioButtonGroup name="eigen_catering" choices={radioEigenCaterign} checkedValue={this.state.eigen_catering} onChange={this.handleChange} />
                        </div>
                    </div>
                </div>

                <div className="row page_project_details_checkbox">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>{trans.pageProject_details_gebouwen}
                                <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_gebouwen}></a>
                            </label>
                            {/*<CheckboxList name='gebouws[]' items={this.props.gebouwenList} selectedItems={this.props.gebouws_mapping_ids} />*/}
                            <ChecboxButtonGroup name='gebouw_ids[]' choices={this.props.gebouwenList} checkedValues={this.state.gebouws_mapping_ids} onChange={this.handleChange_gebouws} />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>{trans.pageProject_details_ligging}
                                <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_ligging}></a>
                            </label>
                            {/*<CheckboxList name='liggings[]' items={this.props.liggingList} selectedItems={this.props.liggings_mapping_ids} />*/}
                            <ChecboxButtonGroup name='ligging_ids[]' choices={this.props.liggingList} checkedValues={this.state.liggings_mapping_ids} onChange={this.handleChange_liggings} />
                        </div>
                    </div>
                    <div className="col-lg-6 clear-both">
                        <div className="form-group">
                            <label>{trans.pageProject_details_eigenschappen}
                                <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_eigenschappen}></a>
                            </label>
                            {/*<CheckboxList name='eigenschappens[]' items={this.props.eigenschappenList} selectedItems={this.props.eigenschappens_mapping_ids} />*/}
                            <ChecboxButtonGroup name='eigenschappen_ids[]' choices={this.props.eigenschappenList} checkedValues={this.state.eigenschappens_mapping_ids} onChange={this.handleChange_eigenschappens} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ProjectTabDetailForm;
