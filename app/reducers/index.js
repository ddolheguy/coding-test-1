import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import stockTicker from './stockTicker';

const rootReducer = combineReducers({
    stockTicker,
    routing
});

export default rootReducer;
