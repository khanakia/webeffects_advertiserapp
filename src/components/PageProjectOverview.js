import React, { Component } from 'react';

import Tab from './Tab'
import ClonableInput from './ClonableInput'



class PageProjectOverview extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        jQuery(this.refs.submit).click(function(){
            // alert("dfsd")
            jQuery(".tabnavitem").css("background", "red")
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

    render() {

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

     
        
        
        return (
            <div>
                
                <ClonableInput />
                <form ref="form">
                    <Tab items={items} />
                </form>

                <button ref="submit" type="button">Opslaan</button>
            </div>

        );
    }
}


export default PageProjectOverview;
