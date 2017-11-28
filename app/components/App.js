import '../styles/stockTicker.scss';
import React, {PureComponent} from 'react';
import MainMenu from './MainMenu';
import Routes from '../routes';

class App extends PureComponent {
    render() {
        return (
            <div className="stock-ticker">
                <h1>Stock Blotter</h1>
                <div>
                    <MainMenu/>
                    <div className="container">
                        {Routes}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
