import React, { Component } from 'react';

class Account extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
      
    }

    tabsFn() {
        $(".tab-pane").hide();
        $(".tab-pane:first").show();

        $('.nav-tabs li a').click(function (e) {     
            var href = $(this).attr('href');    
            $('.tab_drawer_heading').removeClass('d_active');
            $('.tab_drawer_heading a[href="'+href+'"]').closest('h3').addClass('d_active');

            $('.tab-pane').hide();
            $('.tab-pane'+href).show();
        })

        $('.tab_drawer_heading a').click(function (e) {     
            var href = $(this).attr('href');
            if($('.tab-pane'+href).hasClass("active")) {
                return false;
            }
            $('.nav-tabs li').removeClass('active');
            $('.nav-tabs li a[href="'+href+'"]').closest('li').addClass('active');


            $('.tab-pane').slideUp();
            $('.tab-pane'+href).slideDown();
        })

    }

    render() {
        
        
        return (
            <div className="p20">
                <div className="page-panel">
                    <div className="page-panel__heading">Account instellingen</div>
                    <div className="page-panel__inner">
                        <div className="page-panel__inner__left">
                              <ul className="nav nav-tabs nav-tabs--vertical" role="tablist">
                                <li role="presentation" className="active">
                                    <a href="#home" aria-controls="home" role="tab" data-toggle="tab">Uw gegevens</a>
                                </li>
                                <li role="presentation">
                                    <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Wachtwoord wijzigen</a>
                                </li>
                              </ul>
                        </div>
                        <div className="page-panel__inner__content">
                             
                              <div className="tab-content">
                                <h3 className="d_active tab_drawer_heading">
                                    <a href="#home" aria-controls="home" role="tab" data-toggle="tab">Uw gegevens</a>
                                </h3>
                                <div role="tabpanel" className="tab-pane active" id="home">..sdfsda.</div>

                                <h3 className="tab_drawer_heading">
                                    <a href="#profile" aria-controls="home" role="tab" data-toggle="tab">Wachtwoord wijzigen</a>
                                </h3>
                                <div role="tabpanel" className="tab-pane" id="profile">...eeee</div>
                              </div>

                        </div>
                        <div className="page-panel__inner__right">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Account;
