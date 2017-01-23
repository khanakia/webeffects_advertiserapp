import React, { PropTypes } from 'react'

import {ProjectVideoHelper} from '../../helpers'
class VideoInput extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            itemsNew: [],
            items: this.props.items,
        }
    }

    static defaultProps = {        
        className: '',
        name: 'project_videos',
        theme: '',
        items: [],
        onVideoDeleted: function(){}
    }

    

    componentDidMount() {
       
    }


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

                {this.state.items.map(function(item, index) {
                    
                    let iconClass = 'fa fa-film';

                    if(item.type=="vimeo") {
                        iconClass = 'fa fa-vimeo';
                    }

                    if(item.type=="youtube") {
                        iconClass = 'fa fa-youtube';
                    }

                    return (
                        
                        <div className="input-group" key={index}>
                            
                            <span className="input-group-addon">
                                <button type="button" className="btn btn-plain btn--nopad hover-show" onClick={(e) => this.deleteProjectVideo(item.id)}>
                                    <i className="iconc-trash"></i>
                                </button>
                                <i className={`hover-hide ${iconClass}`}></i>
                            </span>
                            <input type="hidden" className="form-control" name={`${this.props.name}[${index}][id]`} defaultValue={item.id} />
                            <input type="hidden" className="form-control" name={`${this.props.name}[${index}][project_id]`} defaultValue={this.props.project_id} />
                            <input type="text" className="form-control" name={`${this.props.name}[${index}][url]`} defaultValue={item.url} />
                            <input type="hidden" className="form-control" name={`${this.props.name}[${index}][type]`} defaultValue={item.type} />
                            <input type="hidden" className="form-control" name={`${this.props.name}[${index}][thumb_url]`} defaultValue={item.thumb_url} />
                        </div>
                    )
                }, this)}

             


                <div className="input-group">
                    <span className="input-group-addon">
                        <button type="button" className="btn btn-plain btn--nopad" onClick={() => this.handleAddClick()}>
                            <i className="iconc-plus"></i>
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