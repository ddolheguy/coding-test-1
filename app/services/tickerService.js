import Rx from 'rxjs/Rx';
import io from 'socket.io-client';

let socket = null;
let tickerProvider$ = null;
let connectionStatusProvider$ = null;

const ticker$ = new Rx.Subject();
const connectionStatus$ = new Rx.ReplaySubject(1);

const CONNECTION_STATUS = {
    CONNECTED: 'Connected',
    DISCONNECTED: 'Disconnected'
};

const connect = () => {
    socket = io('http://localhost:4000');

    socket.on('connect', () => {
        connectionStatus$.next(CONNECTION_STATUS.CONNECTED);
    });

    socket.on('disconnect', () => {
        connectionStatus$.next(CONNECTION_STATUS.DISCONNECTED);
    });
};

const disconnect = () => {
    if (socket) socket.disconnect();
};

const connectionStatus = () => {
    return (socket && socket.connected) ? CONNECTION_STATUS.CONNECTED : CONNECTION_STATUS.DISCONNECTED;
};

const connectionStatusStream = () => {
    if (!connectionStatusProvider$) connectionStatusProvider$ = connectionStatus$.publish().refCount();
    return connectionStatusProvider$;
};

const tickerStream = () => {
    if (!tickerProvider$) tickerProvider$ = ticker$.publish().refCount();
    return tickerProvider$;
};

const subscribeToTicker = (ticker) => {
    return Rx.Observable.create(obs => {
        if (!socket) throw new Error('socket has not been initialised');

        const dataReceived = (data) => {
            try {
                if (typeof data === 'string') {
                    ticker$.next(JSON.parse(data));
                } else {
                    ticker$.next(data);
                }
            } catch (err) {
                ticker$.error(err);
            }
        };

        socket.on(ticker, dataReceived);
        socket.emit('ticker', ticker);

        obs.next();
        return () => {
            socket.off(ticker, dataReceived);
        };
    });
};

export default {
    connect,
    disconnect,
    subscribeToTicker,
    connectionStatus,
    connectionStatusStream,
    tickerStream,
    CONNECTION_STATUS
};
