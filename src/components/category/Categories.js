import React, { Component } from 'react';
import { Link } from 'react-router';

class Categories extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchCategories();
    }

    componentDidUpdate() {
        $('#category_list_tree').jstree({
            'core': {
                'data': this.props.categoryList,
                "multiple": false,
            }
        });

        $('#category_list_tree')
            .on('changed.jstree', function(e, data) {
                console.log(data.selected[0])
            });

        $("#category_list_tree").on('loaded.jstree', function () {
             $("#category_list_tree").jstree('open_all');
        })    

    }

    renderList(items) {
        return items.map((item) => {
            return (
                <li className="list-group-item" key={item.id}>
                    {item.id}
                </li>
            );
        });
    }


    render() {
        
        const data  = this.props.categoryList;
        
        return (
            <div>
                
               <div id="category_list_tree">
               </div>
               
            </div>

        );
    }
}


export default Categories;
