import React from 'react';

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
                this.onAuthChange();
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    };

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return <div>Checking login status</div>
        }
        else if (this.state.isSignedIn) {
            return <div>Signed in</div>
        }
        else {
            return <div>Signed out</div>
        }
    }

    render() {
        return <div className='item'>{ this.renderAuthButton() }</div>
    }
}

export default GoogleAuth;