import {expect} from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionTypes from '../actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

// *************************************
// NOTE: Unfortunately I ran out of time completing the tests in actions as I had some issues getting proxyquire and sinon to play nice for some reason.
// *************************************

describe('Actions component: ', () => {
    // let connectionStatusStub = null;
    let stubbedActions = null;

    before(() => {
        const connectionStatusStub = sinon.stub().returns('CONNECTED');
        stubbedActions = proxyquire('../index', {
            'tickerService': {
                connect: {},
                connectionStatus: connectionStatusStub
            }
        });
    });

    it('should subscribe provide error when no ticker provided', () => {
        const expectedActions = [
            { type: actionTypes.TICKER_CHANGED, payload: { status: 'Disconnected' }},
            { type: actionTypes.SUBSCRIPTION_ERROR, payload: { error: 'You must supply a valid ticker' }}
        ];

        const store = mockStore({});

        store.dispatch(stubbedActions.subscribe());

        const storeActions = store.getActions();
        expect(storeActions).to.be.eql(expectedActions);
    });

    // it('should subscribe provide ', () => {
    //     const expectedActions = [];
    //
    //     const store = mockStore({});
    //
    //     store.dispatch(stubbedActions.subscribe('AAPL'));
    //
    //     const storeActions = store.getActions();
    //     console.log(storeActions);
    //
    //     expect(storeActions).to.be.eql(expectedActions);
    // });
});
