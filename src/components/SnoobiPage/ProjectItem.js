import React, { PropTypes } from 'react'
class ProjectItem extends React.Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        item: {},
    }


    componentWillMount() {
    }

    componentDidMount() {
      
    }

    componentDidUpdate() {
      
    }

    render() {
        const item = this.props.item;

        const plaat_name = item.plaat ? item.plaat['filter_value_name'] : '';

        const imgUrl = {
            backgroundImage: 'url(' + item.featured_image_url + ')',
        };

        const eigen_catering_text = item.eigen_catering ? trans.pageProject_radio_eigen : trans.pageProject_radio_geen_eigen;
        const eigen_catering_icon_class = item.eigen_catering ? "iconc iconc-food" : "iconc iconc-no-food";

        return (
            <div className={'block-project-item item'}>
                <div className="block-klanten">
                    {/*<div className="img-wrapper" style={ imgUrl}></div>*/}
                    <a target="_blank" href={item.url_live} className="img-wrapper" style={ imgUrl}></a>
                    <div className="text-wrapper">
                        <div className="title">
                            <label><a target="_blank" href={item.url_live} target="_blank">{item.project_title}</a></label>
                            <span>{plaat_name}</span>
                        </div>
                        <p dangerouslySetInnerHTML={{__html:item.excerpt_nolink}}></p>
                        <div className="info-wrapper mt15">
                            <i className={eigen_catering_icon_class}></i>
                            <span>{eigen_catering_text}</span>
                        </div>
                        <div className="info-wrapper">
                            <i className="iconc-person"></i>
                            <span>{item.person_min} tot {item.person_max} {trans.block_project_item_personen}</span>
                        </div>
                        <div className="info-wrapper">
                            <i className="iconc-room"></i>
                            <span>{item.zalen_count} {trans.block_project_item_zalen}</span>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
}
ProjectItem.propTypes = {
    item: React.PropTypes.shape({
        featured_image_url: React.PropTypes.any.isRequired.isNonNull,
        url_live: React.PropTypes.any.isRequired,
        project_title: React.PropTypes.any.isRequired,
        excerpt_nolink: React.PropTypes.any.isRequired,
        eigen_icon_class: React.PropTypes.any.isRequired,
        person_min: React.PropTypes.any.isRequired,
        person_max: React.PropTypes.any.isRequired,
        zalen_count: React.PropTypes.any.isRequired,
    }).isRequired
};

export default ProjectItem