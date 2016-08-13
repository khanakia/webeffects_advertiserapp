import React, { Component } from 'react';
import ReactDom from 'react-dom';

import CompanyHelper from '../../helpers/helper_company'

class DropdownCompanies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : []
        }
    }

    static defaultProps = {
        defaultValue : '',
        className : '',
        name : 'dropdowncompanies',
        onChange : function() {}
    }

    componentWillMount() {
        
        
    }

    componentDidMount() {
        CompanyHelper.index().then((response) => {
            this.setState({
                data: response.data
            })

            jQuery(this.refs.dropdowncompanies).val(this.props.defaultValue);
            jQuery(this.refs.dropdowncompanies).selectpicker();
        });

    }

    // onChange = (e) => {
    //     e.preventDefault();
    //     this.props.onChange();
    // }

    renderList(companies) {
        return companies.map((company) => {
            return (
                <option key={company.id} value={company.id} >{company.company_title}</option>
            );
        });
    }

    render() {
        // console.log(this.props.defaultValue)
        return (
            <div className="control-dropdowncompanies">
                <select className={ 'dropdowncompanies' + this.props.className} ref="dropdowncompanies" name={this.props.name} >
                    {this.renderList(this.state.data)}
                </select>
            </div>
        );
    }
}


export default DropdownCompanies;
