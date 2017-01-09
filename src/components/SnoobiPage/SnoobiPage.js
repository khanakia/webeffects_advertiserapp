import React, { PropTypes } from 'react'

class SnoobiPage extends React.Component {

    constructor(props) {
        super(props);
    }


    componentWillMount() {
    }

    componentDidMount() {
        jQuery('.accordion')
        .on('show.bs.collapse', function(e) {
        jQuery(e.target).prev('.accordion-heading').addClass('active');
        })
        .on('hide.bs.collapse', function(e) {
        jQuery(e.target).prev('.accordion-heading').removeClass('active');
        });
    }

    componentDidUpdate() {
        
    }

    static defaultProps = {
        className: '',
        theme: '',
        items: []
        
    }
  

    render() {
        return (
            <div className="statistieken-wrapper">
                <div className="form-group">
                    <div className="row">
                        <div className="form-group col-md-12">
                            <label>Uw advertentie is bezocht door</label>
                        </div>
                        <div className="col-md-6 col-lg-5">
                            <div className="dropdown dropdown--style1 xs-w100 wp120 dropdown-inline">
                                <button className="btn btn-dropdown dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Filters<i className="iconc-chevron-down"></i></button>
                                <ul className="dropdown-menu list-group" aria-labelledby="dropdownMenu1">
                                    <li className="list-group-item"><label><input type="checkbox" name="algemeen" value="algemeen" /><span>Algemeen</span></label></li>
                                    <li className="list-group-item"><label><input type="checkbox" name="telefoonnummer" value="telefoonnummer" /><span>Telefoonnummer</span></label></li>
                                    <li className="list-group-item"><label><input type="checkbox" name="trouwen" value="trouwen" /><span>Trouwen</span></label></li>
                                    <li className="list-group-item"><label><input type="checkbox" name="zalen" value="zalen" /><span>Zalen</span></label></li>
                                    <li className="list-group-item"><label><input type="checkbox" name="vergaderen" value="vergaderen" /><span>Vergaderen & congres</span></label></li>
                                    <li className="list-group-item"><label><input type="checkbox" name="vermelding" value="vermelding" /><span>Vermelding</span></label></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-7">
                            <div className="sorteren-wrapper pull-right visible-lg">
                                <span>Sorteren op:</span>
                                <div className="dropdown dropdown--style1 wp150 ml15 mr10 dropdown-inline">
                                    <button className="btn btn-dropdown dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">februari 2016<i className="iconc-chevron-down"></i></button>
                                    <ul className="dropdown-menu list-group" aria-labelledby="dropdownMenu1">
                                        <li className="list-group-item">februari 2016</li>
                                        <li className="list-group-item">maart 2016</li>
                                        <li className="list-group-item">april 2016</li>
                                        <li className="list-group-item">mei 2016</li>
                                    </ul>
                                </div>
                                <div className="dropdown dropdown--style1 wp180 dropdown-inline">
                                    <button className="btn btn-dropdown dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Recente activiteit<i className="iconc-chevron-down"></i></button>
                                    <ul className="dropdown-menu list-group" aria-labelledby="dropdownMenu1">
                                        <li className="list-group-item">Recente activiteit</li>
                                        <li className="list-group-item">Alfabet</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="dropdown dropdown--style1 hidden-lg">
                                <button className="btn btn-dropdown dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sorteren op<i className="iconc-chevron-down"></i></button>
                                <ul className="dropdown-menu list-group" aria-labelledby="dropdownMenu1">
                                    <li className="list-group-item"><label><input type="radio" name="staus" value="recent" /><span>Recente activiteit</span></label></li>
                                    <li className="list-group-item"><label><input type="radio" name="status" value="alfabet" /><span>Alfabet</span></label></li>

                                    <li className="list-group-item"><label><span>Datum</span></label></li>
                                    <li className="list-group-item"><label><input type="radio" name="datum" value="trouwen" /><span>februari 2016</span></label></li>
                                    <li className="list-group-item"><label><input type="radio" name="datum" value="zalen" /><span>maart 2016</span></label></li>
                                    <li className="list-group-item"><label><input type="radio" name="datum" value="vergaderen" /><span>april 2016 & congres</span></label></li>
                                    <li className="list-group-item"><label><input type="radio" name="datum" value="vermelding" /><span>mei 2016</span></label></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="offerrequesttab">
                                <div id="accordion" className="accordion" role="tablist" aria-multiselectable="true">
                                  <div className="accordion-group">
                                    <div className="accordion-heading" role="tab" id="headingOne">
                                        <a className="accordion-toggle panel_title" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                          Yandex enterprise network
                                        </a>
                                    </div>

                                    <div id="collapseOne" className="accordion-body collapse" role="tabpanel" aria-labelledby="headingOne">
                                      <div className="accordion-inner">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-group">
                                    <div className="accordion-heading" role="tab" id="headingTwo">
                                        <a className="accordion-toggle panel_title" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                          Simadan Holding B.V.
                                        </a>
                                    </div>
                                    <div id="collapseTwo" className="accordion-body collapse" role="tabpanel" aria-labelledby="headingTwo">
                                      <div className="accordion-inner">
                                        <label>Bedrijf</label>
                                        <p>Ministerie van Veiligheid en Justitie</p>
                                        <label>Locatie</label>
                                        <p>Den Haag</p>
                                        <label>Datum en wat bekeken</label>
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td>14 mei 2015</td>
                                                    <td>Algemeen</td>
                                                </tr>
                                                <tr>
                                                    <td>14 mei 2015</td>
                                                    <td>Algemeen</td>
                                                </tr>
                                                <tr>
                                                    <td>14 mei 2015</td>
                                                    <td>Algemeen</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
}
SnoobiPage.propTypes = {
    
};

export default SnoobiPage