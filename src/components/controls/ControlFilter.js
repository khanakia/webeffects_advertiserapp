import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux'

import TagSelector from '../tag/TagSelectorContainer'
import ControlNotifyPeople from '../controls/ControlNotifyPeople'
import ControlProjectUsersDdl from '../controls/ControlProjectUsersDdl'

class ControlFilter extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data : [],
            search_value : ''
        }
        
        
    }

    static defaultProps = {
        onChangeInput : function() {},

        className : '',

    }

    componentWillMount() {
       
    }
    
    componentDidMount() {
        this.$search_input = jQuery(this.refs.search_input1);
        // var $input = jQuery(this.refs.search_input1);
        this.$search_input.tagsinput({
            itemValue: 'value',
            itemText: 'text',
            freeInput: true
        })

        this.$search_input.on('itemRemoved', function(event) {
              // event.item: contains the item
              // this.forceUpdate()
              this.refreshState()
        }.bind(this));

        jQuery(this.refs.search_input_wrap).find(".bootstrap-tagsinput input").keydown(function(e){
            // console.log("fsda")
            this.onChangeInput(e)
        }.bind(this))
    }

    componentDidUpdate() {
  
    }

  

    onChangeInput(e) {
        // const search_input_val = this.refs.search_input.value;
        const search_input_val = e.target.value;
        // console.log(search_input_val)
        setTimeout(() => {
            // var $input = jQuery(this.refs.search_input);
            var $input = jQuery(e.target);
            var search_value = $input.val();
            if (search_value !== $input.attr('searchString')) {
                // make the AJAX call at this time
                // Store the value sent so we can compare when JSON returns
                $input.attr('searchString', search_value);

                this.setState({
                    search_value : search_value
                })
                // namepicker2_Search_Prep(input);
                // this.props.onChangeInput(this.state)
                this.filterChanged()
            }
        }
        , 500); 

    }

    refreshState() {
        this.setState({
            data : this.$search_input.tagsinput('items')
        },function(){

            this.filterChanged()
        })
        
    }

    onUserSelect(user) {
        // console.log(user)
        const data = {
            value : 'u_'+user.id,
            id : user.id,
            search_value : user.id,
            text : user.fullname,
            type : 'user'
        }

        // var $input = jQuery(this.refs.search_input1);
        this.$search_input.tagsinput('add', data)

        this.refreshState()
        // this.forceUpdate()
        // console.log(this.$search_input.tagsinput('items'))
    }

    filterChanged() {
        var users = _.filter(this.state.data, {type:'user'});
        users = _.map(users, 'id');
        
        const data = {
            users : users,
            search : this.state.search_value
        }

        this.props.onChangeInput(data)

    }

    // getItems() {
    //     var $input = jQuery(this.refs.search_input1);
    //     return $input.tagsinput('items')   
    // }

    render() {
        
        const data = this.state.data;
        return (
            <div className="control-filter">
                <span className="pull-right">
                    <ControlProjectUsersDdl onUserSelect={this.onUserSelect.bind(this)} selectedUsers={data} />
                </span>
                <span className="pull-right" ref="search_input_wrap">
                    {/*<input type="text" className="form-control" ref="search_input" onChange={this.onChangeInput.bind(this)} />*/}
                    <input type="text" className="form-control" ref="search_input1" id="search_input1" />
                </span>    

            </div>
        );
    }
}


export default ControlFilter;


// const mapStateToProps = (state) => {
    
//     return {
//         state : state,
//         current_org: state.appdata.current_org,  // FETCH_APPDATA_CURRENTORG
//         projectUsers : state.project.users,      // FETCH_PROJECT_USERS 
//         projectCurrent : state.project.current,  // FETCH_PROJECT_CURRENT 
//         project_id : state.project.current.id
//     };
// }

// const mapDispatchToProps = (dispatch) => {
    
//     return {
//         dispatch,
       
//     }
// }

// const ControlFilterContainer = connect(mapStateToProps, mapDispatchToProps)(ControlFilter)

// export default ControlFilterContainer
