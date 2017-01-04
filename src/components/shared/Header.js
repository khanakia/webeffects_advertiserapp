import React, { Component, PropTypes } from 'react'
import { Link, hashHistory } from 'react-router'

import ProjectsLinkList from './ProjectsLinkList'
import Sidebar from './Sidebar'
import Auth from '../../helpers/auth.js'

class Header extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {
        project_list: [],
        userTitle: ''
    }

    componentDidMount() {
        jQuery(".header__menu").click(function(){
            jQuery(".mobile-overlay-menu").slideToggle()
            jQuery(".header__menu").toggleClass("opened")
        })
        jQuery("a.has-childerns").click(function(){
            jQuery(this).parent().find(".submenu").slideToggle()
            jQuery(this).find("i.slideUpDown").toggleClass("iconc-chevron-down iconc-check")
            return false
        })
    }

    logout(e) {
        e.preventDefault();
        Auth.logout()
        hashHistory.push('/')
    }
 
    render() {

        return (
            <div>
                {/*<Sidebar project_list={this.props.project_list} />*/}
                <header className="desktop">
                    <div className="dropdown dropdown--user">
                        <button className="btn btn-user dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            <span className="usericon"><i className="iconc iconc-person"></i></span>
                            <span>{this.props.userTitle}</span>
                            <span><i className="iconc iconc-chevron-down"></i></span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-right dropdown-menu--user" aria-labelledby="dropdownMenu1">
                            <li>
                                <Link to={'account'}>Account instellingen</Link>
                            </li>
                            <li role="separator" className="divider"></li>
                            <li>
                                <a href="#" onClick={(e)=>{this.logout(e)}}>Uitloggen</a>
                            </li>
                        </ul>
                    </div>
                </header>

                <header className="mobile">
                   <a href="/" className="header__logo"></a>
                    <button type="button" className="header__menu">
                        <i className="iconc iconc-hamburger open"></i>
                        <i className="iconc iconc-cross close"></i>
                    </button>
                </header>

                <div className="mobile-overlay-menu">
                    <ul>
                        <li>
                            <a href="#" className="has-childerns">Locaties <i className="slideUpDown iconc-chevron-down"></i></a>
                            <ul className="submenu">
                                <ProjectsLinkList project_list={this.props.project_list} />
                            </ul>
                        </li>
                        <li>
                            <Link to={'account'}>Account instellingen</Link>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li>
                            <a href="#" onClick={(e)=>{this.logout(e)}}>Uitloggen</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}


export default Header;
