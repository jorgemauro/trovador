import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {Route,MemoryRouter} from 'react-router-dom'

import App from '../imports/ui/App.js';
import Blog from '../imports/ui/Blog.js';

Meteor.startup(() => {
    const renderTestSequence = ({
                                    initialEntries,
                                    initialIndex,
                                    subject: Subject,
                                    steps
                                }) => {
        const div = document.createElement('div')

        class Assert extends React.Component {

            componentDidMount() {
                this.assert()
            }

            componentDidUpdate() {
                this.assert()
            }

            assert() {
                const nextStep = steps.shift()
                if (nextStep) {
                    nextStep({...this.props, div})
                } else {
                    unmountComponentAtNode(div)
                }
            }

            render() {
                return this.props.children
            }
        }
    }
    render(<MemoryRouter
        initialIndex={initialIndex}
        initialEntries={initialEntries}>
        <Route path="/" component={App}/>
        <Route path="/blog" component={Blog}/>

    </MemoryRouter>, document.getElementById('render-target'));
});