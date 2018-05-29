import {select} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga';

export function* watchAndLog() {
    yield* takeEvery('*', function* logger(action) {
        const state = yield select();

        console.log('*&*&*&* watchAndLog, action, ', action);
        console.log('*&*&*&* watchAndLog, state, ', state);
    })
}
