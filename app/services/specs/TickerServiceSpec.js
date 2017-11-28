import Rx from 'rxjs/Rx';
import {expect} from 'chai';
import tickerService from '../tickerService';

const CONNECTION_STATUS = tickerService.CONNECTION_STATUS;

// =======================================
// NOTE: I didn't get time to get mocks working with Socket IO.
// Hence my tests below require the server to be connected which isn't great but I at least wanted to include them.
// Since SocketIO binds to the window.IO and we are using mocha here there isn't a window object.  I would probably use Karma but didn't get time to set it all up
// I wasn't sure about using Sinon on a Socket and I think it might be possible but again ran out of time.
// =======================================

describe('Ticker Service: ', () => {

    before(() => {
        tickerService.connect();
    });

    after(() => {
        tickerService.disconnect();
    });

    it('should connect (if server running)', (done) => {
        const subscriptions$ = new Rx.Subscription();

        subscriptions$.add(tickerService.connectionStatusStream()
            .take(1)
            .subscribe(status => {
                expect(status).to.be.eql(CONNECTION_STATUS.CONNECTED);
                subscriptions$.unsubscribe();
                done();
            }));
    });

    it('should subscribe to ticker AAPL', (done) => {
        const subscriptions$ = new Rx.Subscription();

        subscriptions$.add(tickerService.tickerStream()
            .subscribe(data => {
                expect(data.ticker).to.be.eql('AAPL');
                subscriptions$.unsubscribe();
                done();
            }));

        subscriptions$.add(tickerService.connectionStatusStream()
            .filter(status => status === CONNECTION_STATUS.CONNECTED)
            .mergeMap(() => tickerService.subscribeToTicker('AAPL'))
            .subscribe());
    });
});

