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

        const imgUrl = {
            backgroundImage: 'url(' + item.featured_image_url + ')',
        };

        return (
            <div className={'block-project-item item'}>
                <div className="block-klanten">
                    <div className="img-wrapper" style={ imgUrl}></div>
                    <div className="text-wrapper">
                        <div className="title">
                            <label><a href="{{item.url_live}}" target="_blank">{item.project_title}</a></label>
                            <span>Bennekom</span>
                        </div>
                        <p dangerouslySetInnerHTML={{__html:item.excerpt_nolink}}></p>
                        <div className="info-wrapper mt15">
                            <i className={item.eigen_icon_class}></i>
                            <span>{item.eigen_text}</span>
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