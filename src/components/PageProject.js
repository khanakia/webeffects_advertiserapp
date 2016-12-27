import React, { Component } from 'react';

import Tab from './Tab'
import ClonableInput from './ClonableInput'
import CheckboxList from './CheckboxList'
import Zalen from './Zalen'


class PageProject extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        console.log(this.props.params.projectId)
        if(this.props.params.projectId) {
            this.props.fetchProject(this.props.params.projectId);
        }
    }

    componentDidMount() {
        var _this = this;
        jQuery(this.refs.submit).click(function(){
                var valid = jQuery(_this.refs.form).valid();
                if (!valid) {return false};
            // jQuery(".tabnavitem").css("background", "red")
            _this.props.fetchProject(_this.props.params.projectId);
        })

    }

    handleSumbit() {

    }


    _contentTab1() {
        return (
            <div>
                <div className="form-group">
                    <label>Naam locatie</label>
                    <input type="text" className="form-control" name="last_name" />
                </div>
                <div className="form-group">
                    <label>Algemene beschrijving</label>
                    <input type="text" className="form-control" name="last_name" />
                </div>
                <div className="form-group">
                    <label>Representatieve buitenafbeelding</label>
                    <input type="text" className="form-control" name="last_name" />
                </div>

                <div className="form-group">
                    <label>3 video links</label>
                    <input type="text" className="form-control" name="last_name" />
                </div>
            </div>
        )
    }

    onZalenRemoved() {
        console.log('Zalen Removed')
        this.props.fetchProject(this.props.params.projectId);
    }

    render() {
        const project = this.props.project

        let items = [
            {
                "title": "Algemene beschrijving",
                "content": this._contentTab1()
            },

            {
                "title": "Algemene beschrijving",
                "content": ""
            }
        ]


        const checkboxGebouwen = [
            {
                "title": "Attractiepark",
                "value": 22
            },
            {
                "title": "Boerderij",
                "value": 23
            },
            {
                "title": "Congrescentrium",
                "value": 24
            }
        ]        
        const selectedGebouwen = [22,23]
        
        return (
            
            <div>
                <form ref="form" id="form1">
                    {/*<CheckboxList items={checkboxGebouwen} selectedItems={selectedGebouwen} />*/}
                    <Zalen items={project.project_rooms} onZalenRemoved={()=>{this.onZalenRemoved()}} />
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group">
                                <span className="input-group-addon" id="basic-addon1">
                                    <span className="default"><i className="fa fa-link"></i></span>
                                    <span className="hover"><a href="#"><i className="fa fa-trash"></i></a></span>
                                </span>
                                <input type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon1" />
                            </div>

                            <div className="input-group">
                                <span className="input-group-addon">
                                    <span><a href="#"><i className="fa fa-plus"></i></a></span>
                                </span>
                                <label type="text" className="form-control">Username</label>
                            </div>
                        </div>
                    </div>

                    <ClonableInput items={this.props.project.project_videos} />
                    <Tab items={items} />
                </form>

                <button ref="submit" type="button">Opslaan</button>
            </div>

        );
    }
}


export default PageProject;
