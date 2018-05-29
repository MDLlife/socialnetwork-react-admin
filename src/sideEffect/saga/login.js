import { takeEvery, delay } from 'redux-saga';
import { put,take,race,actionChannel,call } from 'redux-saga/effects';
import * as timeractions from '../../actions/timerActions';


// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
    yield delay(1000);
    yield put({ type: 'INCREMENT' });
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
    yield* takeEvery('INCREMENT_ASYNC', incrementAsync);
}

// wait :: Number -> Promise
const wait = ms => (
    new Promise(resolve => {
        setTimeout(() => resolve(), ms);
    })
);

export function* runTimer() {
    const channel = yield actionChannel('START');

    while(yield take(channel)) {
        while(true) {
            const winner = yield race({
                stopped: take('STOP'),
                tick: call(wait, 1000)
            });

            if (!winner.stopped) {
                yield put(timeractions.tick());
            } else {
                break;
            }
        }
    }
}