/* 
 * This component is to render Single TagItem like rounded border single tag
*/

import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Auth,  TagItemHelper } from '../../helpers'
import PopupHelper from '../../helpers/helper_popup'

import { fetchTags} from '../../actions/action_tag';

import { ROOT_URL, API_URL } from '../../config'

class TagItemTitle extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        onTagFormUpdated: function(data) { },
        onTagItemRemove: function() { },

        defaultValue : '',
        className : '',
        
        data : []
    }

    componentWillMount() {
    }

    componentDidMount() {
        
    }

    editTag(e) {
       e.preventDefault();
       console.log(this.props.data)
       PopupHelper.showTagForm({data:this.props.data.tag, onDataUpdate: this.props.onTagFormUpdated})
    }
    
    removeTagItem(e) {
        e.preventDefault();
        // console.log(this.props.data);
        // var data = this.props.data;
        // data = jQuery.param(data);
        TagItemHelper.delete(this.props.data.id).then((response) => {
            this.props.onTagItemRemove()
        })
    }
    

    render() {
        const data = this.props.data
        if(!data || !data.tag) return false;

        return (
            <div className="comp_tag_title">
                <span style={{borderColor: data.tag.tag_color}}>
                    <a key={data.id} href="#" className="tag" onClick={(e)=> this.editTag(e)}>{data.tag.tag_title}</a>
                    <a href="#" className="remove" onClick={(e)=> this.removeTagItem(e)}>x</a>
                </span>
            </div>
        );
    }
}


// export default TagItemTitle;


const mapStateToProps = (state) => {
    
    return {
        state : state,
        current_org: state.appdata.current_org,  // FETCH_APPDATA_CURRENTORG
    };
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        dispatch,
        fetchTags: () => {
            dispatch(fetchTags())
        }
    }
}

const TagItemTitleContainer = connect(mapStateToProps, mapDispatchToProps)(TagItemTitle)

export default TagItemTitleContainer
