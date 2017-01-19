import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router'
import ContentWrapper from './shared/ContentWrapper'

import DropdownList from './DropdownList'
import CheckboxListDropdown from './CheckboxListDropdown'
import ChangePasswordForm from 'components/Forms/ChangePasswordForm'
import PopupHelper from 'helpers/helper_popup'
class Demo extends Component {
    constructor(props, context) {
        super(props, context);

    }
 
    componentDidMount() {
        // PopupHelper.showChangePasswordForm({})
    }



    render() {
        console.log(this.props);
        const items = [
            {
                "value": "1",
                "title": 'Demo1',
            },
            {
                "value": "2",
                "title": 'Demo2',
            },
            {
                "value": "3",
                "title": 'Demo3',
            }
        ]

        return (
            <div>
                <ContentWrapper hasSidebar={true}>
                   Demo
                   <CheckboxListDropdown items={items}  />

                   
                   
                </ContentWrapper>
            </div>
        );
    }
}


export default Demo;
