import React, { PropTypes } from 'react'

import {AuthHelper, ProjectHelper} from 'helpers'

import {PROJECT_STATUSES} from '../../config'
import DropdownList from '../DropdownList'

class RightBlock extends React.Component {
    static defaultProps = {        
        className: '',

        project_id: '',
        is_live_data: 0,
        has_revision_data: 0,
        // projectStatusList: [],
        onProjectStatusChange: function(item) {},
        project_status_id: '',
        updated_date: '',
        created_date: '',
        url: '',
        url_concept: '',
        status: {
            icon_class: '',
            title: '',
        },

        handleUpdateStatus: function(project_id, status_id){},
        handleSumbit: function(){},
        handleSumbitAdmin: function(){},
        handleLoadActualData: function(){},
        handleLoadRevisionClick: function(){},
        handleCancel: function(){},
        handleTerugClick: function() {}
    }

    componentDidMount() {
    
    }


    render() {
        // console.log("this.props.is_live_datathis.props.is_live_datathis.props.is_live_data", this.props.is_live_data)
        
        let status = PROJECT_STATUSES[this.props.project_status_id]

        return (
            <div className="block-right" ref="block_right">
                <div className="block-info">

                    {
                        this.props.project_id ?
                        <div>
                            <label>{trans.pageProject_rightBlock_bewerkingen}</label>
                            <div className="last_updated mt5" key="date1">{moment(this.props.updated_date).format("LLL")}</div>
                        </div>                            
                        : ''
                    }

                    <div className="d-table w100 mt20">
                        <div className="d-table-cell v-align-middle">
                            <div><button ref="submit" type="button" className="btn btn-green btn--round" onClick={()=>{this.props.handleSumbit()}}>{trans.pageProject_rightBlock_opslaan}</button>
                            </div>
                            {
                                this.props.is_live_data && this.props.has_revision_data ?
                                    <div><button ref="submit" type="button" className="btn btn-green btn--round mt20" onClick={()=>{this.props.handleLoadRevisionClick()}}>{trans.pageProject_rightBlock_btn_loadrevisionbtn}</button></div>
                                :
                                    ''

                            }


                            {
                                !this.props.is_live_data && this.props.project_id ?
                                    <div><button ref="submit" type="button" className="btn btn-green btn--round mt20" onClick={()=>{this.props.handleLoadActualData()}}>{trans.pageProject_rightBlock_btn_loadactualdata}</button></div>
                                : ''

                            }


                            {
                                this.props.project_id && AuthHelper.is_admin() ? 
                                    <div><button ref="submit" type="button" className="btn btn-green btn--round mt20" onClick={()=>{this.props.handleSumbitAdmin()}}>{trans.pageProject_rightBlock_opslaan_admin}</button></div>
                                : ''    
                            }

                            {
                                (this.props.project_id && AuthHelper.is_admin() && this.props.project_status_id!==5 && this.props.is_live_data) ?
                                <div><button ref="submit" type="button" className="btn btn-green btn--round mt20" onClick={() => this.props.handleUpdateStatus(this.props.project_id, 5)}>{trans.pageProject_rightBlock_offline_btn}</button></div>
                                : ''

                            }


                        </div>
                        <div className="d-table-cell v-align-middle">
                            <button ref="annuleren" type="button" className="btn btn-plain" onClick={()=>{this.props.handleCancel()}}>{trans.pageProject_rightBlock_annuleren}</button>
                        </div>
                    </div>
                </div>

                {
                    this.props.project_id ?
                    <div>
                        <div className="block-info">
                            <label>{trans.pageProject_rightBlock_locatie}</label>
                            <div><a className="live" href={this.props.url} target="_blank">{trans.pageProject_rightBlock_link_live}</a> <i className="iconc-link pull-right px5 i-rotate25"></i></div>
                            <div><a className="concept" href={this.props.url_concept} target="_blank">{trans.pageProject_rightBlock_link_concept}</a> <i className="iconc-link pull-right px5 i-rotate25"></i></div>
                        </div>
                        <div className="block-info">
                            <label>{trans.pageProject_rightBlock_status}</label>
                            <div className="dropdown dropdown--status">
                                {
                                    undefined!==status ?
                                        <span className="status"><i className={status.icon_class + ' before_text'}></i> <span>{status.title}</span></span>
                                    : ''
                                }

                                {/*<DropdownList items={this.props.projectStatusList} selectedValue={this.props.project_status_id} onItemChange={this.props.onProjectStatusChange} />*/}

                                {
                                    /*AuthHelper.is_admin() ?
                                    <div className="pull-right">
                                        <a className="pull-right dropdown-toggle px5 i-rotate25" id="gepubliceerd" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><i className="iconc-edit"></i></a>

                                        <ul className="dropdown-menu dropdown-menu--status" aria-labelledby="gepubliceerd">
                                            <li>
                                                
                                                    <label>
                                                        <input type="radio" name="update_status" value="1" onClick={() => this.props.handleUpdateStatus(this.props.project_id, 1)} />
                                                        <span>{trans.pageProject_rightBlock_gepubliceerd} <i className="iconc-published"></i></span>
                                                    </label>
                                                
                                            </li>
                                            <li>
                                                
                                                    <label>
                                                        <input type="radio" name="update_status" value="5" onClick={() => this.props.handleUpdateStatus(this.props.project_id, 5)} />
                                                        <span>{trans.pageProject_rightBlock_concept} <i className="iconc-concept"></i></span>
                                                    </label>
                                                
                                            </li>
                                            
                                        </ul>
                                    </div> 

                                    : ''              */                 
                                }
                            </div> 
                        </div>
                        <div className="block-info">
                            <label>{trans.pageProject_rightBlock_datum}</label>
                            <div className="last_updated">{moment(this.props.created_date).format(Env.dateformat_default)}</div>
                        </div>

                        {/*<div className="block-info">
                                                    <button className="btn btn-plainBlack" onClick={()=>{this.handleDelete(this.props.project_id)}}><i className="iconc-trash before_text"></i>{trans.pageProject_rightBlock_zet_deze}</button>
                                                </div>*/}
                    </div>

                    : ''
                }  
                <div className="block-info text-center box--shadow hidden-md hidden-lg">
                    <button type="button" onClick={()=>{this.props.handleTerugClick()}} className="btn btn--transparent a-hover-color">{trans.pageProject_rightBlock_terug}</button>
                </div>
            </div>
        )
    }

   
}
RightBlock.propTypes = {
    
};

export default RightBlock