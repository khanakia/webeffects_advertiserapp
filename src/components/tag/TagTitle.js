/* 
 * This component is to render Single Tag like rounded border single tag 
   NOTE: this to render TagTitle not TagItemTitle basically both are same just a difference is removeItem function in this we will remove tag 
   but in TagItemTitle we remove TagItem from Database not Tag
*/

import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Auth,  TagHelper } from '../../helpers'
import PopupHelper from '../../helpers/helper_popup'

import { fetchTags} from '../../actions/action_tag';


class TagTitle extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
    
        defaultValue : '',
        className : '',
        
        data : [],

        /* This is in some case we do not want to delete tag acutally we just want to remove it from parent renderTags list so in order to do
         * that i created that functionality if is_softdelete yes then do not fire deleteTag function but just pass the tag data in Softdelete
         * callback to parent so parent will know this tag has to remove then update its State and then re-render the child
        */ 
        is_soft_delete : false,
        deleteCallback : function(data) {}
    }

    componentWillMount() {
    }

    componentDidMount() {
        
    }

    editTag(e, data) {
        e.preventDefault()
        // TagForm.showInPoup({data})
        PopupHelper.showTagForm({data, ...this.props})
        
    }

    deleteTag(e, data) {
        e.preventDefault();

        if(this.props.is_soft_delete) {
            this.props.deleteCallback(data) // pass deleted tag data to parent as callback
            return false;
        }

        console.info("is_softdeleteis_softdelete", this.props.is_soft_delete)

        // If not softdelete then remove tag permanent
        $.confirm({
            title: '',
            content: 'Are you sure you want to remove ?',
            confirmButton: 'Yes',
            cancelButton: 'No',
            confirm: function(){
                TagHelper.delete(data.id).then((response) => {
                    this.props.fetchTags();
                    this.props.deleteCallback(data) // pass deleted tag data to parent as callback
                });
            }.bind(this)
        });
    }
    

    /* This is we created so instead of getting all the data from props.data object we will get Tag Data from Taglist State because let
     * say if we update tag then it will refresh it so we needed to do in this way otherwise i will have to create different action for just that single
       tag in order to update it
    */

    findTag(tag_id) {
        return _.find(this.props.tagsList, { 'id': this.props.data.id});
    }

    render() {
        const data = this.findTag()
        if(!data) return false;

        return (
            <div className="comp_tag_title">
                <input type="hidden" defaultValue={data.id} name="tags[]" />
                <span key={data.id} data-tagid={data.id} className="tag" style={{backgroundColor: data.tag_color}}>
                    <a href="#" onClick={(e)=> this.editTag(e, data)} >{data.tag_title}</a>
                    <a href="#" className="ml10" onClick={(e)=> this.deleteTag(e, data)} ><i className="fa fa-trash"></i></a>
                </span>
            </div>
        );
    }
}


// export default TagTitle;


const mapStateToProps = (state) => {
    
    return {
        state : state,
        current_org: state.appdata.current_org,  // FETCH_APPDATA_CURRENTORG
        tagsList: state.tag.list,
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

const TagTitleContainer = connect(mapStateToProps, mapDispatchToProps)(TagTitle)

export default TagTitleContainer
