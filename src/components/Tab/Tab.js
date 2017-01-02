import React, { PropTypes } from 'react'


class Tab extends React.Component {
    static defaultProps = {        
        className: '',
        theme: '',

        items: [],
        
    }

    componentDidMount() {
        var $tab = jQuery(this.refs.tab);
        $tab.find(".navitem").click(function(e){
            e.preventDefault();
            var index = jQuery(this).data('index');
            console.log(index)
            // return false;

            $tab.find(".content").hide('fast', function(){
                jQuery(this).removeClass("active")  
            });
            $tab.find(".navitem").removeClass("active");

            jQuery(this).addClass('active')
            $tab.find(".content[data-index='" + index +"']").show('fast').addClass('active');
        })
       
    }


    _renderRight() {
        return this.props.items.map((item, index) => {
            let activeClass = (index==0) ? "active" : ''
            return (
                <div key={index}>
                    <a href="#" className={"navitem index_" + index } data-index={index} ref="navitem">{item.title}</a>
                    <div className={"content index_" + index + " " + activeClass} data-index={index} >
                        {item.content}
                    </div>
                </div>
            )
        })
    }


    _renderLeft() {
        return this.props.items.map((item, index) => {
            return (
                <div key={index}>
                    <a href="#" className={"navitem index_" + index } data-index={index} ref="navitem">{item.title}</a>
                </div>
            )
        })
    }


    


    render() {
        return (
            <div className={'Tab ' + this.props.className} ref="tab">
                <div className="left">
                    {this._renderLeft()}
                    
                </div>
                <div className="right">
                    {this._renderRight()}
                </div>
                <div className="clear" />
            </div>
        );
    }
}
Tab.propTypes = {
    
};

export default Tab