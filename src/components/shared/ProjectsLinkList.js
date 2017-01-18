import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router'

class ProjectsLinkList extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {
        project_list: []
    }
    componentDidMount() {
      
    }

 
    render() {
        // console.log("this.props.project_list sidebar", this.props.project_list)
        return (
            <div>
                
                    <ul>
                        <li>
                            <Link to={'/dashboard'}>{trans.projectLink_all_locatie_link}</Link>
                        </li>

                        
                        {this.props.project_list.map(function(item, index){
                            return (
                                <li key={index}>
                                    <Link to={'projects/'+item.id} >{item.project_title}</Link>
                                </li>
                            )    
                        })}
                              
                    </ul>
            </div>
        );
    }
}


export default ProjectsLinkList;
