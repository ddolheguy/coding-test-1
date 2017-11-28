import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class ConnectionStatus extends PureComponent {
    render() {
        const {connectionStatus, subscriptionError} = this.props;
        return (
            <div className={`connection-status ${connectionStatus.toLowerCase()}`}>
                <span>System status:</span> {connectionStatus} {subscriptionError ? `- ${subscriptionError}` : ''}
            </div>
        );
    }
}

ConnectionStatus.defaultProps = {
    subscriptionError: null,
    connectionStatus: 'Disconnected'
};

ConnectionStatus.propTypes = {
    subscriptionError: PropTypes.string,
    connectionStatus: PropTypes.string
};

export default ConnectionStatus;
