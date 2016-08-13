import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import Auth from '../helpers/auth.js'

export default function(WrappedComponent) {
    class AuthenticatedComponent extends React.Component {
        componentWillMount() {
            if (!this.props.isAuthenticated) {
                hashHistory.push('login')
            }
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated === true
                        ? <WrappedComponent {...this.props}/>
                        : null
                    }
                </div>
            )
        }
    }

    function mapStateToProps(state) {
        return { isAuthenticated: Auth.check() };
    }

    return connect(mapStateToProps)(AuthenticatedComponent);
}
