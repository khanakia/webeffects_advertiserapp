import React, { PropTypes } from 'react'

import ContactPersonDropdown from '../ContactPersonDropdown'
// import {ProjectHelper} from '../../helpers'
class ProjectContactInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isDesktop: false
        }
        
    }

    static defaultProps = {        
        className: '',
        items: [],
        contact_list: [],
        onItemChange: function() {}
    }

    componentDidMount() {
        this._checkDesktopMobile()
        window.addEventListener('resize', (event) => {
            this._checkDesktopMobile()
        });

        
    }

    compoentDidUpdate() {
           
    }

    _checkDesktopMobile() {
        var w = window.innerWidth;
        if(w<1200 && this.state.isDesktop) {
            this.setState({
                isDesktop: false
            })
        } else if(w>1200 && !this.state.isDesktop) {
            this.setState({
                isDesktop: true
            })
        }
    }

    

    _renderDesktop() {
        return (
            <table className="table table-bordered table--horizontal">
                <thead>
                    <tr>
                        <th><i className="fa fa-archive"></i></th>
                        <th>Naam</th>
                        <th>E-mailadressen</th>
                    </tr>
                </thead>
                <tbody>

                    {this.props.items.map(function(item, index) {
                        return (
                            <tr key={`z-${item.id}`}>
                                <td>
                                    <i className="fa fa-trash"></i>
                                </td>
                                <td>
                                    <input type="hidden" name={`contact[${index}][id]`} defaultValue={item.id} />
                                    <input type="text" name={`contact[${index}][name]`} defaultValue={item.project_title} />
                                </td>
                                <td>
                                    <ContactPersonDropdown selectedValue={item.contact_id} project_id={item.id} items={this.props.contact_list} onItemChange={this.props.onItemChange} isVisibleAddNewButton={false}/>
                                </td>
                            </tr>
                        )
                    }, this)}
                </tbody>
            </table>
        )
    }

    _renderMobile() {
        return (
            <div ref="mobile_container">
                {this.props.items.map(function(item, index) {
                    return (
                        <div className="contact_item" key={`z-${item.id}`}>
                            <div className="input-group input-group--style-label">
                                <span className="input-group-addon">
                                    <i className="fa fa-link"></i>
                                </span>
                                <label>{item.project_title}</label>
                            </div>
                            <div className="input-group input-group--style-label">
                                <span className="input-group-addon">
                                    <i className="fa fa-link"></i>
                                </span>
                                <ContactPersonDropdown selectedValue={item.contact_id} project_id={item.id} items={this.props.contact_list} onItemChange={this.props.onItemChange} isVisibleAddNewButton={false} />
                            </div>
                    
                        </div>
                    )
                }, this)}
            </div>
        )
    }

    render() {

        return (
            <div className={'comp-projectcontactinput ' + this.props.className} ref="projectcontactinput">
                {
                    (this.state.isDesktop) ? this._renderDesktop() : this._renderMobile()
                }    
            </div>
        );
    }
}


ProjectContactInput.propTypes = {
    
};

export default ProjectContactInput