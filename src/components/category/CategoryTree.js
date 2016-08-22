import React, { Component } from 'react';
import ReactDom from 'react-dom';

class CategoryTree extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        onChange: function(e, data) { },
        categoryList : [],
        defaultValue : ''
    }

    componentWillMount() {
        // CategoryHelper.index().then((response) => {
        //     this.setState({
        //         categoryList : response.data
        //     })
        // });
    }

    componentDidMount() {
         var $tree = $(this.refs.category_list_tree);
        // $tree.jstree('destroy');
         $tree
            .on('activate_node.jstree', function(e, data) {
                // console.log(data)
                // const selected_value = data.selected[0];
                // var CurrentNode = e.jstree("get_selected");
                // console.log(data.node);
                this.props.onChange(e,data);
            }.bind(this));

        $tree.on('loaded.jstree', function () {
            $tree.jstree('open_all');
             
            $tree.jstree('select_node', this.props.defaultValue);
        }.bind(this))  
        
        this.buildJsTree()
    }


    componentDidUpdate() {
        // if (jQuery.isEmptyObject(this.props.categoryList)) return false;
        // var $tree = $(this.refs.category_list_tree);
        // $tree.jstree(true).settings.core.data = this.props.categoryList;
        // $tree.jstree(true).refresh();

        this.buildJsTree()
    }

    buildJsTree() {
        if (jQuery.isEmptyObject(this.props.categoryList)) return false;
        var $tree = $(this.refs.category_list_tree);
        // $tree.jstree('destroy');
        //  $tree
        //     .on('activate_node.jstree', function(e, data) {
        //         // console.log(data)
        //         // const selected_value = data.selected[0];
        //         // var CurrentNode = e.jstree("get_selected");
        //         // console.log(data.node);
        //         this.props.onChange(e,data);
        //     }.bind(this));

        // $tree.on('loaded.jstree', function () {
        //     $tree.jstree('open_all');
             
        //     $tree.jstree('select_node', this.props.defaultValue);
        // }.bind(this))  
        
        $tree.jstree({
            'core': {
                'data': this.props.categoryList,
                "multiple": true,
            },

            "types" : {
                "#" : {
                  "max_children" : 1,
                  "max_depth" : 1,
                  "valid_children" : ["root"]
                },
                
            },


            "checkbox" : {
              "keep_selected_style" : false,
              "three_state" : false
            },
            "plugins" : [ "checkbox" ],
        });

       
    }


    renderList(projects) {
        return projects.map((project) => {
            return (
                <li className="list-group-item" key={project.id}>
                   {project.id}
                </li>
            );
        });
    }


    render() {
        return (
            <div>
                <div className="category_list_tree" ref="category_list_tree">
                    
                </div>

            </div>
        );
    }
}


export default CategoryTree;
