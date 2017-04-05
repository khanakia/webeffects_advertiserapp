import React, { PropTypes } from 'react'
import ProjectItem from './ProjectItem'

class ProjectItems extends React.Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        items: [],
    }


    componentWillMount() {
    }

    componentDidMount() {
       
      
    }

    componentDidUpdate() {
       if (Modernizr.mq('only all and (max-width: 767px)')) {
            var winWidth = $(window).width() - 90;
            $(".belangrijkste-wrapper").width(winWidth);
            jQuery('#belangrijkste_carousel').owlCarousel({
                loop: false,
                dots: false,
                margin:15,
                nav:false,
                navText: [
                  "<i class='fa fa-angle-left' ></i>",
                  "<i class='fa fa-angle-right'></i>"
                ],
                responsive:{
                    0:{
                        items:1,
                        stagePadding: 0,
                    },
                    600:{
                        items:1,
                        stagePadding: 50,
                    },
                }
            });
        }
    }

    _renderItems() {
        const items = this.props.items;
        return items.map((item, index) => {
            return (
                <ProjectItem item={item} key={index} />
            )}
        )
    }

    render() {
        return (
            <div className="comp-project-items">
                <div className="form-group">
                    <label className="mt20 mb15">{trans.snoobiPage_uw_belangrijkste_title}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_uw_belangrijkste}></a>
                    </label>
                    <div className="belangrijkste-wrapper">
                        <div className="owl-carousel owl-theme" id="belangrijkste_carousel">
                            {this._renderItems()}
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
}
ProjectItems.propTypes = {
    items: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            featured_image_url: React.PropTypes.any.isRequired.isNonNull,
            url_live: React.PropTypes.any.isRequired,
            project_title: React.PropTypes.any.isRequired,
            excerpt_nolink: React.PropTypes.any.isRequired,
            eigen_icon_class: React.PropTypes.any.isRequired,
            person_min: React.PropTypes.any.isRequired,
            person_max: React.PropTypes.any.isRequired,
            zalen_count: React.PropTypes.any.isRequired,
        })
    )
};

export default ProjectItems