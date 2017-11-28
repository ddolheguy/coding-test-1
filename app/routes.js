import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Introduction from './components/Introduction';
import StockTicker from './containers/StockTicker';

export default (
	<Switch>
		<Route exact path="/" component={Introduction} />
		<Route exact path="/stock/:ticker" component={StockTicker} />
	</Switch>
);
