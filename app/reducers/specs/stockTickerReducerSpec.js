import {expect} from 'chai';
import reducer from '../stockTicker';
import * as actionTypes from '../../actions/actionTypes';

describe('StockTicker reducer:', () => {
    const initialState = {
        tickerData: null,
        tickerError: null,
        connectionStatus: 'Disconnected',
        subscriptionError: null
    };

    it('should return the initial state', () => {
        expect(reducer(initialState, {})).to.be.equal(initialState);
    });

    it('should handle action type CONNECTION_STATUS', () => {
        const action = {
            type: actionTypes.CONNECTION_STATUS,
            payload: {
                status: 'Some new state...'
            }
        };

        const expectedResult = {
            tickerError: null,
            subscriptionError: null,
            tickerData: null,
            connectionStatus: 'Some new state...'
        };

        expect(reducer(initialState, action)).to.be.eql(expectedResult);
    });

    it('should handle action type TICKER_CHANGED', () => {
        const action = {
            type: actionTypes.TICKER_CHANGED,
            payload: {
                status: 'Connected...'
            }
        };

        const expectedResult = {
            tickerError: null,
            subscriptionError: null,
            tickerData: null,
            connectionStatus: 'Connected...'
        };

        expect(reducer(initialState, action)).to.be.eql(expectedResult);
    });

    it('should handle action type TICKER_UPDATE', () => {
        const action = {
            type: actionTypes.TICKER_UPDATE,
            payload: {
                data: {
                    ticker: 'AAPL',
                    price: 287.79
                }
            }
        };

        const expectedResult = {
            tickerError: null,
            subscriptionError: null,
            tickerData: {
                ticker: 'AAPL',
                price: 287.79
            },
            connectionStatus: 'Disconnected'
        };

        expect(reducer(initialState, action)).to.be.eql(expectedResult);
    });

    it('should handle action type TICKER_UPDATE with multiple data for price INCREASE', () => {
        const firstAction = {
            type: actionTypes.TICKER_UPDATE,
            payload: {
                data: {
                    ticker: 'AAPL',
                    price: 287.79
                }
            }
        };

        const secondAction = {
            type: actionTypes.TICKER_UPDATE,
            payload: {
                data: {
                    ticker: 'AAPL',
                    price: 1287.79
                }
            }
        };

        const expectedResult = {
            tickerError: null,
            subscriptionError: null,
            tickerData: {
                ticker: 'AAPL',
                price: 1287.79,
                changeType: 'up'
            },
            connectionStatus: 'Disconnected'
        };

        const state = reducer(initialState, firstAction);

        expect(reducer(state, secondAction)).to.be.eql(expectedResult);
    });

    it('should handle action type TICKER_UPDATE with multiple data for price DECREASE', () => {
        const firstAction = {
            type: actionTypes.TICKER_UPDATE,
            payload: {
                data: {
                    ticker: 'AAPL',
                    price: 287.79
                }
            }
        };

        const secondAction = {
            type: actionTypes.TICKER_UPDATE,
            payload: {
                data: {
                    ticker: 'AAPL',
                    price: 187.79
                }
            }
        };

        const expectedResult = {
            tickerError: null,
            subscriptionError: null,
            tickerData: {
                ticker: 'AAPL',
                price: 187.79,
                changeType: 'down'
            },
            connectionStatus: 'Disconnected'
        };

        const state = reducer(initialState, firstAction);

        expect(reducer(state, secondAction)).to.be.eql(expectedResult);
    });

    it('should handle action type SUBSCRIPTION_ERROR', () => {
        const action = {
            type: actionTypes.SUBSCRIPTION_ERROR,
            payload: {
                error: 'some error'
            }
        };

        const expectedResult = {
            tickerError: null,
            subscriptionError: 'some error',
            tickerData: null,
            connectionStatus: 'Disconnected'
        };

        expect(reducer(initialState, action)).to.be.eql(expectedResult);
    });

    it('should handle action type TICKER_ERROR', () => {
        const action = {
            type: actionTypes.TICKER_ERROR,
            payload: {
                error: 'some error'
            }
        };

        const expectedResult = {
            tickerError: 'some error',
            subscriptionError: null,
            tickerData: null,
            connectionStatus: 'Disconnected'
        };

        expect(reducer(initialState, action)).to.be.eql(expectedResult);
    });
});
