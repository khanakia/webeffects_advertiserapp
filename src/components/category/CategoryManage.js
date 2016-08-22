import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import {store} from '../../store/index.js';

import { fetchCategories } from '../../actions/action_category';
import { CategoryHelper } from '../../helpers'

import CategoryTree from './CategoryTree'
import CategoryForm from './CategoryForm'

class CategoryManage extends Component {
    constructor(props) {
        super(props);
        // store.subscribe(() =>
          
        //   this.forceUpdate()
        // )
        
    }

    static defaultProps = {
        popup_id: '',
        categoryList : [],
        
        data_category_form : {
            object_type: "",
            project_id : ""
        }
    }

    componentWillMount() {
        // CategoryHelper.index().then((response) => {
        //     this.setState({
        //         categoryList : response.data
        //     })
        // });

    // console.log(store.getState().category.list)
    }

    componentDidMount() {
    }


    componentDidUpdate() {

    }

    static showInPoup({categoryList={}, props={}, data_category_form={} }) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach : true,
            message : '<div id="' + uniq + '"></div>',
            container_class : "w500",
            opacity: 0.5,
            blur: false,
            onopen : function(e){
              var pid = (jQuery(e).attr('id'));
              ReactDom.render(
                <Provider store={store} key="provider">
                    <CategoryManage popup_id={pid} categoryList={categoryList} data_category_form={data_category_form} {...props} />
                </Provider>,
                document.getElementById(uniq));
            }
        });
    }


    hidePopup = () => {
        if (this.props.popup_id) {
            jQuery('#' + this.props.popup_id).popup('hide');
        }
    }

    onTreeChange(e, data) {
        // console.log(data)
        const selected_value = data.selected[0];
        CategoryForm.showInPoup({data:data.node.original, categoryList:this.props.categoryList})
        
    }

    render() {
        // console.log('CategoryManage', this.props.categoryList)
        return (
            <div>
                <div className="modal-header">
                    <h4 className="modal-title">Select Category to Edit</h4>
                </div>
                <div className="content-area">
                    <CategoryTree categoryList={this.props.categoryList} onChange={this.onTreeChange.bind(this)} />
                </div>    
                <div className="modal-footer text-right">
                    <button type="submit" className="btn btn-success" onClick={() => CategoryForm.showInPoup({categoryList:this.props.categoryList, data: this.props.data_category_form})}>Add New Category</button>
                </div>
            </div>
        );
    }
}


export default CategoryManage;
