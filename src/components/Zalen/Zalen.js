import React, { PropTypes } from 'react'

import {ProjectHelper} from '../../helpers'
class Zalen extends React.Component {

    constructor(props) {
        super(props);
    
           
        this.state = {
            items: [],
            itemsNew: [],
        }
        
    }

    static defaultProps = {        
        className: '',

        items: [],
        onZalenRemoved: function(){}
        
    }

    

    componentDidMount() {
       
       
    }

    componentWillReceiveProps(nextProps) {
    

    }


    handleAddClick() {
        // var itemsNew = this.state.itemsNew.length;
        var newKey = (_.last(this.state.itemsNew)||0)+1
        this.setState({ itemsNew: this.state.itemsNew.concat(newKey)});
    }

    handleRemoveRow(index) {
        var items = this.state.itemsNew
        this.setState({itemsNew: items.filter((_, i) => i!==index)})
    }

    handleRemoveZalen = (id) => {
        ProjectHelper.delete_zalen(id).then(() => {
            this.props.onZalenRemoved()
        })
    }

    renderList() {
        // return this.props.items.map(function(item, index) {
        //     var checked = this.props.selectedItems.indexOf(item.value)!==-1 ? true : false;
        //     return (
        //         <li className="list-group-item" key={index}>
        //             <label><input type="checkbox" defaultValue={item.value} defaultChecked={checked} />{item.title}</label>
        //         </li>
        //     )
        // }, this)
    }


    render() {
        return (
            <div className={'Zalen ' + this.props.className} ref="Zalen">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th><i className="fa fa-trash"></i></th>
                        <th>Titel</th>
                        <th>Daglicht</th>
                        <th>U-vorm</th>
                        <th>Carre</th>
                        <th>School</th>
                        <th>Theater</th>
                        <th>Cabaret</th>
                        <th>Receptie</th>
                        <th>Diner</th>
                        <th>Feest</th>
                        </tr>
                    </thead>
                    <tbody>


                    {this.props.items.map(function(item, index) {
                        return (
                            <tr key={`z-${item.id}`}>
                                <td>
                                        <button type="button" onClick={()=>{this.handleRemoveZalen(item.id)}}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                </td>
                                <td>
                                {item.id}
                                    <input type="text" name="zalen['id'][]" defaultValue={item.id} />
                                    <input type="text" name="zalen['room_name'][]" defaultValue={item.room_name} />
                                </td>
                                <td><input type="text" name="zalen['daglicht'][]" defaultValue={item.daglicht} /></td>
                                <td><input type="text" name="zalen['u_vorm'][]" defaultValue={item.u_vorm} /></td>
                                <td><input type="text" name="zalen['carre'][]" defaultValue={item.carre} /></td>
                                <td><input type="text" name="zalen['school'][]" defaultValue={item.school} /></td>
                                <td><input type="text" name="zalen['theater'][]" defaultValue={item.theater} /></td>
                                <td><input type="text" name="zalen['cabaret'][]" defaultValue={item.cabaret} /></td>
                                <td><input type="text" name="zalen['receptie'][]" defaultValue={item.receptie} /></td>
                                <td><input type="text" name="zalen['diner'][]" defaultValue={item.diner} /></td>
                                <td><input type="text" name="zalen['feest'][]" defaultValue={item.feest} /></td>
                            </tr>
                        )
                    }, this)}


                    {this.state.itemsNew.map(function(item, index) {
                        return (
                            <tr key={item}>
                                <td>
                                    <button type="button" onClick={()=>{this.handleRemoveRow(index)}}><i className="fa fa-trash"></i></button>
                                </td>
                                <td>
                                    <input type="text" name="zalen['id'][]" />
                                    <input type="text" name="zalen['room_name'][]" />
                                </td>
                                <td><input type="text" name="zalen['daglicht'][]" /></td>
                                <td><input type="text" name="zalen['u_vorm'][]" /></td>
                                <td><input type="text" name="zalen['carre'][]" /></td>
                                <td><input type="text" name="zalen['school'][]" /></td>
                                <td><input type="text" name="zalen['theater'][]" /></td>
                                <td><input type="text" name="zalen['cabaret'][]" /></td>
                                <td><input type="text" name="zalen['receptie'][]" /></td>
                                <td><input type="text" name="zalen['diner'][]" /></td>
                                <td><input type="text" name="zalen['feest'][]" /></td>
                            </tr>
                        )
                    }, this)}


                    </tbody>
                    <tfoot>
                        <tr>
                            <td><button type="button" onClick={()=>this.handleAddClick()}><i className="fa fa-plus"></i></button></td>
                            <td colSpan="10">
                                <label>Zall toevoegen</label>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}
Zalen.propTypes = {
    
};

export default Zalen