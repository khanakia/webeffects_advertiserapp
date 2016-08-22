import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { CategoryHelper } from '../../helpers'

class CategoryTree1 extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        onChange: function(e, data) { },
        onDeleted: function(data) { },
        categoryList : [],
        selectedValue : 0
    }

    componentWillMount() {
       
    }

    componentDidMount() {
        console.log('CategoryTree1 componentDidMount')
        // this.buildJsTree()
        jQuery(this.refs.edit_controls_span).hide()
    }


    componentDidUpdate() {
        console.log('CategoryTree1 componentDidUpdate')
        this.buildJsTree()
    }

    buildJsTree() {
        if (jQuery.isEmptyObject(this.props.categoryList)) return false;

        var $tree = $(this.refs.category_list_tree);

        var treeData = this.getTree();
        $tree.treeview({
            data: treeData,
            // showCheckbox: true,
            // highlightSelected : false
        });

        $tree.on('nodeChecked nodeUnchecked ', function(event, data) {
            // console.log(data)
        }.bind(this));

        $tree.on('nodeSelected nodeUnselected', function(event, node) {
            // console.log($(this.refs.category_list_tree).treeview('getSelected'));
            // console.log('node',node)
            // if(node.id!==0 && !node.nodes) {
            //     jQuery(this.refs.edit_controls_span).show()
            // } else {
            //     jQuery(this.refs.edit_controls_span).hide()
            // }
            
            // Prevent this event going on infinity bug because react render on url change
            // const selected_value = node.id;
            // const current_catid = this.props.location.query.catid
            // // console.log(current_catid, selected_value)
            // if((undefined==current_catid && selected_value==0) || current_catid==selected_value) return false;


            // console.log('this.props.location.query.catid', this.props.location.query.catid)
            console.log("nodid", node)
            this.props.onNodeSelected(event,node);
            // console.log('this.props.location.query.catid', this.props.location.query.catid)
            // var index = _.findIndex(this.getTree(), {'id': parseInt(this.props.location.query.catid)})
            // console.log("index", index)
            // if(index>=0) {
            //     $(this.refs.category_list_tree).treeview('selectNode',[index, {silent : true}]);
            // }

        }.bind(this));


        $tree.on('nodeUnselected', function(event, node) {
            // return false;
        //    console.log('this.props.location.query.catid', this.props.selectedValue)
        // const catid = this.props.selectedValue;
        // var index = _.findIndex(this.props.categoryList, {'id': parseInt(this.props.selectedValue)});
        // if(index>=0) {
        // console.log("index", index)
        //     // here i did index+1 because categorylist array is witout All Messagese Object
        //     $(this.refs.category_list_tree).treeview('selectNode',[index+1, {silent : true}]);
        // }

        }.bind(this));

        
        // console.log("this.props.selectedValue", this.props.selectedValue)
        // console.log('this.props.location.query.catid', this.props.selectedValue)
        // const catid = this.props.selectedValue;
        // var index = _.findIndex(this.props.categoryList, {'id': parseInt(this.props.selectedValue)});
        // if(index>=0) {
        // console.log("index", index)
        //     // here i did index+1 because categorylist array is witout All Messagese Object
        //     $(this.refs.category_list_tree).treeview('selectNode',[index+1, {silent : true}]);
        // }

         // $(this.refs.category_list_tree).treeview('expandAll');
        
    }


    getTree() {

        return this.getNestedChildren(this.props.categoryList,0)
    }

    getNestedChildren(arr, parent_id) {
        var copy = $.extend(true, [], arr); // jQuery
        var allMessage = {
                category_name : 'All Messages',
                id : 0
            }
        copy.unshift(allMessage)

        var selectedValue = this.props.selectedValue;
        var dataNew = _.map(copy, function(item) {
           if(item.id == parseInt(selectedValue)) {
                // console.log('GETNESTER', selectedValue, item.id)
                item.state = {
                    selected: true
                }
            }
            
            return item;
        }.bind(this))

        console.log("dataNew", dataNew)
        var data = this._getNestedChildren(dataNew, parent_id)
        
        return data
    }


    _getNestedChildren(arr, parent_id) {
        var out = []
     
        for(var i in arr) {
            arr[i].text = arr[i].category_name
            // arr[i].state = {
            //     selected: true
            // }
            if(arr[i].parent_id == parent_id) {
                var children = this._getNestedChildren(arr, arr[i].id)

                if(children.length) {
                    arr[i].nodes = children
                }
                out.push(arr[i])
            }
        }
        return out
    }

    removeCategory(e) {
        $.confirm({
            title: '',
            content: 'Are you sure you want to remove ?',
            confirmButton: 'Yes',
            cancelButton: 'No',
            confirm: function(){

            var data = $('.category_list_tree').treeview('getSelected');
            CategoryHelper.delete(data[0].id).then((response) => {
                this.props.onDeleted(data[0]);
            });

            }.bind(this)
        });
    }


    render() {
        return (
            <div className="mt20">
                <div className="">
                    <button className="btn btn-xs btn-plain"><i className="fa fa-plus"></i></button>
                    <span className="pull-right" ref="edit_controls_span">
                        <button className="btn btn-xs btn-plain mr10" ref="btn_edit"><i className="fa fa-pencil"></i></button>
                        <button className="btn btn-xs btn-plain" ref="btn_trash" onClick={() => this.removeCategory()}><i className="fa fa-trash"></i></button>
                    </span>
                </div>
                <div className="category_list_tree" ref="category_list_tree">
                    
                </div>

            </div>
        );
    }
}


export default CategoryTree1;
