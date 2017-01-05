import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router'
import ContentWrapper from './shared/ContentWrapper'

import DropdownList from './DropdownList'

import ContactForm from 'components/Forms/ContactForm'
import PopupHelper from 'helpers/helper_popup'
class Demo extends Component {
    constructor(props, context) {
        super(props, context);

    }

    componentDidMount() {
        PopupHelper.showContactForm({})
    }



    render() {
        const items = [
            {
                "id": 1,
                "title": 'Demo1',
            },
            {
                "id": 2,
                "title": 'Demo2',
            },
            {
                "id": 3,
                "title": 'Demo3',
            }
        ]

        return (
            <div>
                <ContentWrapper hasSidebar={true}>
                   Demo
                   <DropdownList items={items} selectedValue={3} />

                   
                </ContentWrapper>
            </div>
        );
    }
}


export default Demo;
