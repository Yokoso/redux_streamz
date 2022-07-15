import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

import clientId from '../clientId';

class GoogleAuth extends React.Component {
    state = {
        isSignedIn: null
    };

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: clientId,
                scope: 'email',
                plugin_name: 'Streamz'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    };

    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            this.props.signIn();
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        }
        else if (this.state.isSignedIn) {
            return (
                <button className='ui red google button' onClick={this.onSignOut}>
                    <i className='google icon' />
                    Sign out
                </button>
            )
        }
        else {
            return (
                <button className='ui red google button' onClick={this.onSignIn}>
                    <i className='google icon' />
                    Sign in with Google
                </button>
            )
        }
    }

    render() {
        return <div className='item'>{ this.renderAuthButton() }</div>
    }
}

export default connect(null, 
    {
        signIn,
        signOut
    })(GoogleAuth);