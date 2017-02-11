import React, { PropTypes } from 'react'

import {ProjectVideoHelper} from '../../helpers'
import InputBox from './InputBox'
class VideoInput extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            items: this.props.items,
            itemsNew: [],
        }
    }

    static defaultProps = {        
        className: '',
        name: 'project_videos',
        theme: '',
        items: [],
        onVideoDeleted: function(){},
        reset: false
    }

    

    componentDidMount() {
       
    }


    componentWillReceiveProps(nextProps) {
        // If nextProp item are greater than current prop items it means user clicked the Save button so clear all the Newitems in state input because they already saved and will show as NextProp items
        // if(nextProps.items !== this.props.items) {
        //     this.setState({items: nextProps.items, itemsNew: []})
        // }

        if(nextProps.reset) {
            this.setState({items: nextProps.items, itemsNew: []})
        }

        // console.info("this.project_videos.items", nextProps.items)

    }
    
    handleAddClick() {
        var newKey = (_.last(this.state.itemsNew)||0)+1
        this.setState({ itemsNew: this.state.itemsNew.concat(newKey)});
        console.log(this.state.itemsNew)
    }

    handleRemoveRow(index) {
        // console.log(index)
        var items = this.state.itemsNew
        this.setState({itemsNew: items.filter((_, i) => i!==index)})
    }

    deleteProjectVideo(id) {
        
        let items = Object.assign([], this.state.items); 
        // console.log(items);
        items.map(function(item,index) {
            if(item.id==id) {
                item.is_deleted = 1;
            }
        })
        this.setState({ items: items});
        // ProjectVideoHelper.delete(id).then((response) => {
        //     this.props.onVideoDeleted()
        // })
        
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

                    const cssClassHidden = (item.is_deleted==true) ? 'hidden' : '';
                    // console.log("cssClassHidden", cssClassHidden, item.is_deleted)

                    return (
                        
                        <div className={"input-group " + cssClassHidden} key={item.id}>
                            
                            <span className="input-group-addon">
                                <button type="button" className="btn btn-plain btn--nopad hover-show" onClick={(e) => this.deleteProjectVideo(item.id)}>
                                    <i className="iconc-trash"></i>
                                </button>
                                <i className={`hover-hide ${iconClass}`}></i>
                            </span>
                            <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][id]`} value={item.id} />
                            <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][project_id]`} value={this.props.project_id} />
                            <InputBox type="text" className="form-control" name={`${this.props.name}[${index}][url]`} value={item.url} />
                            <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][type]`} value={item.type} />
                            <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][thumb_url]`} value={item.thumb_url} />
                            <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][is_new]`} value={item.is_new} />
                            <InputBox type="hidden" className="form-control" name={`${this.props.name}[${index}][is_deleted]`} value={item.is_deleted} />
                        </div>
                    )
                }, this)}

                {this.state.itemsNew.map(function(key, index) {
                    
                    let iconClass = 'fa fa-film';

                    var uniq_id = (new Date()).getTime();

                    // this is to prevent same input index for above already saved items
                    const indexInput = index + 100;

                    return (
                        
                        <div className="input-group" key={index}>
                            
                            <span className="input-group-addon">
                                <button type="button" className="btn btn-plain btn--nopad hover-show" onClick={(e) => this.handleRemoveRow(index)}>
                                    <i className="iconc-trash"></i>
                                </button>
                                <i className={`hover-hide ${iconClass}`}></i>
                            </span>
                            <InputBox type="hidden" className="form-control" name={`${this.props.name}[${indexInput}][id]`} value={uniq_id} />
                            <InputBox type="hidden" className="form-control" name={`${this.props.name}[${indexInput}][project_id]`} />
                            <InputBox type="text" className="form-control" name={`${this.props.name}[${indexInput}][url]`} />
                            <InputBox type="hidden" className="form-control" name={`${this.props.name}[${indexInput}][type]`} />
                            <InputBox type="hidden" className="form-control" name={`${this.props.name}[${indexInput}][thumb_url]`} />
                            <InputBox type="hidden" className="form-control" name={`${this.props.name}[${indexInput}][is_new]`} value='1' />
                            <InputBox type="hidden" className="form-control" name={`${this.props.name}[${indexInput}][is_deleted]`} value='0' />
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