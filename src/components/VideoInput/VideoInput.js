import React, { PropTypes } from 'react'

import {ProjectVideoHelper} from '../../helpers'
class VideoInput extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            itemsNew: [],
        }
    }

    static defaultProps = {        
        className: '',
        theme: '',
        items: [],
        onVideoDeleted: function(){}
    }

    

    componentDidMount() {
       
    }

    // shouldComponentUpdate = (nextProps, nextState, nextContext) => {
    //     console.log(nextProps == this.props, nextProps , this.props)
    //     console.log(nextState == this.state, nextState, this.state)
    //     console.log(!(nextProps == this.props) ||
    //       !(nextState == this.state))
    //     return !(nextProps == this.props) ||
    //       !(nextState == this.state);
    //     return false;
    //     // return !(nextProps == this.props)
    // }


    componentWillReceiveProps(nextProps) {
        // If nextProp item are greater than current prop items it means user clicked the Save button so clear all the Newitems in state input because they already saved and will show as NextProp items
        if(nextProps.items.length > this.props.items.length) {
            this.setState({itemsNew: []})
        }

    }
    
    handleAddClick() {
        var newKey = (_.last(this.state.itemsNew)||0)+1
        this.setState({ itemsNew: this.state.itemsNew.concat(newKey)});
    }

    handleRemoveRow(index) {
        var items = this.state.itemsNew
        this.setState({itemsNew: items.filter((_, i) => i!==index)})
    }

    deleteProjectVideo(id) {
        ProjectVideoHelper.delete(id).then((response) => {
            this.props.onVideoDeleted()
        })
        
    }

    render() {
        var _this = this;
        
        return (
            <div className={'VideoInput input-group-vmerge' + this.props.className} ref="VideoInput">
                <div className="fields" ref="fieldsWrapper">

                </div>

                {this.props.items.map(function(item, index) {
                    
                    return (
                        
                            
                        <div className="input-group" key={index}>
                            <span className="input-group-addon">
                                <button type="button" className="btn btn-plain btn--nopad hover-show" onClick={(e) => this.deleteProjectVideo(item.id)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                                <i className="fa fa-youtube hover-hide"></i>
                            </span>
                            <input type="text" className="form-control" name="video_url[]" defaultValue={item.url} />
                            <input type="hidden" className="form-control" name="video_id[]" defaultValue={item.id} />
                        </div>

                        
                    )
                }, this)}

                {this.state.itemsNew.map(function(key, index) {
                    
                    return (
                        <div className="input-group" key={key}>
                            <span className="input-group-addon">
                                <button type="button" className="btn btn-plain btn--nopad" onClick={() => this.handleRemoveRow(index)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </span>
                            <input type="text" className="form-control" name="video_url_new[]" />
                        </div>
                    )
                }, this)}


                <div className="input-group">
                    <span className="input-group-addon">
                        <button type="button" className="btn btn-plain btn--nopad" onClick={() => this.handleAddClick()}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </span>
                    <input type="text" className="form-control" defaultValue="Vimeo of YouTube link toevoegen" readOnly />
                </div>
            
              
            </div>
        );
    }
}
VideoInput.propTypes = {
    
};

export default VideoInput