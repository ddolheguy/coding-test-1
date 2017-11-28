import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as StockTickerActions from '../actions';
import moment from 'moment';

import ConnectionStatus from '../components/Connection';

class StockTicker extends PureComponent {

    componentWillMount() {
        this.subscribeToTicker(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match !== nextProps.match) this.subscribeToTicker(nextProps);
    }

    componentWillUnmount() {
        this.props.actions.unSubscribe();
    }

    subscribeToTicker(props) {
        const ticker = props.match && props.match.params ? props.match.params.ticker : null;
        this.props.actions.subscribe(ticker);
    }

    renderTicker(ticker) {
        const changeType = ticker.changeType ? ticker.changeType : '';
        return (
            <div>
                <ul className="ticker-data">
                    <li>Ticker <span>{ticker.ticker}</span></li>
                    <li>Exchange <span>{ticker.exchange}</span></li>
                    <li>Price <span className={changeType}>{ticker.price}</span></li>
                    <li>Change <span className={changeType}>{ticker.change}</span></li>
                    <li>Change % <span>{ticker.change_percent}</span></li>
                    <li>Last Trade <span>{moment(ticker.last_trade_time, moment.defaultFormat).format('DD-MM-YYYY HH:mm:ss')}</span></li>

                    <li>Dividend <span>{ticker.dividend}</span></li>
                    <li>Yield <span>{ticker.yield}</span></li>
                </ul>
            </div>
        );
    }

    render() {
        const {match, model} = this.props;
        return (
            <div className="ticker">
                <h1>{match.params.ticker}</h1>

                {!model.tickerData &&
                <div>
                    No ticker data available
                </div>
                }

                {model.tickerData && this.renderTicker(model.tickerData)}

                <ConnectionStatus
                    subscriptionError={model.subscriptionError}
                    connectionStatus={model.connectionStatus}/>
            </div>
        );
    }
}

StockTicker.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            ticker: PropTypes.string.isRequired
        })
    })
};

const mapStateToProps = (state) => {
    return {
        model: state.stockTicker
    };
};

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(StockTickerActions, dispatch) });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StockTicker);
