import Rx from 'rxjs/Rx';
import tickerService from '../services/tickerService';
import * as actionTypes from './actionTypes';

let subscriptions$ = null;
const CONNECTION_STATUS = tickerService.CONNECTION_STATUS;

const tickerChanged = (status) => ({ type: actionTypes.TICKER_CHANGED, payload: { status }});
const connectionStatus = (status) => ({ type: actionTypes.CONNECTION_STATUS, payload: { status }});
const tickerUpdate = (data) => ({ type: actionTypes.TICKER_UPDATE, payload: { data }});

const tickerError = (error) => ({ type: actionTypes.TICKER_ERROR, payload: { error }});
const subscriptionError = (error) => ({ type: actionTypes.SUBSCRIPTION_ERROR, payload: { error }});

// *************************************
// NOTE: With more time I would break the below function out a little to make it easier to test.
// *************************************

export const subscribe = (ticker) => {
    return dispatch => {
        if (subscriptions$) subscriptions$.unsubscribe();
        dispatch(tickerChanged(tickerService.connectionStatus()));

        if (!ticker || typeof ticker !== 'string' || ticker.trim().length === 0) return dispatch(subscriptionError('You must supply a valid ticker'));

        subscriptions$ = new Rx.Subscription();
        const ticker$ = tickerService.tickerStream()
            .retryWhen(err => {
                dispatch(tickerError('Error in ticker data'));
                return err;
            })
            .subscribe(data => dispatch(tickerUpdate(data)));

        const subscription$ = tickerService.connectionStatusStream()
            .do(status => dispatch(connectionStatus(status)))
            .filter(status => status === CONNECTION_STATUS.CONNECTED)
            .mergeMap(() => tickerService.subscribeToTicker(ticker.trim()))
            .retryWhen(err => {
                dispatch(subscriptionError('Connection error, retrying....'));
                return err.delay(1000);
            })
            .subscribe();

        if (tickerService.connectionStatus() !== CONNECTION_STATUS.CONNECTED) tickerService.connect();

        subscriptions$.add(ticker$);
        subscriptions$.add(subscription$);
    };
};

export const unSubscribe = () => {
    return () => {
        if (subscriptions$) subscriptions$.unsubscribe();
        tickerService.disconnect();
    };
};
