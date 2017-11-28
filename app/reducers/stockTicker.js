import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tickerData: null,
    tickerError: null,
    connectionStatus: 'Disconnected',
    subscriptionError: null
};

const stockTicker = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TICKER_CHANGED:
            return {
                ...initialState,
                connectionStatus: action.payload.status
            };
        case actionTypes.SUBSCRIPTION_ERROR:
            return {
                ...state,
                subscriptionError: action.payload.error
            };
        case actionTypes.CONNECTION_STATUS:
            return {
                ...state,
                tickerError: null,
                subscriptionError: null,
                connectionStatus: action.payload.status
            };
        case actionTypes.TICKER_ERROR:
            return {
                ...state,
                tickerData: null,
                tickerError: action.payload.error
            };
        case actionTypes.TICKER_UPDATE:
            const tickerData = action.payload.data;
            if (state.tickerData && !isNaN(state.tickerData.price)) {
                if (state.tickerData.price < tickerData.price) tickerData.changeType = 'up';
                if (state.tickerData.price > tickerData.price) tickerData.changeType = 'down';
            }

            return {
                ...state,
                tickerError: null,
                tickerData: tickerData
            };
        default:
            return state;
    }
};

export default stockTicker;
