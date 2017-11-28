import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';

class MainMenu extends PureComponent {
    render() {
        return (
            <div className={'main-menu'}>
                <Link to="/">Home</Link>
                <div>
                    <span>Select a stock to view</span>
                    <Link to="/stock/AAPL">Apple <span>(AAPL)</span></Link>
                    <Link to="/stock/GOOGL">Google <span>(GOOGL)</span></Link>
                </div>
            </div>
        );
    }
}

export default MainMenu;
