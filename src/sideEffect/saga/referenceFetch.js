import { delay } from 'redux-saga';
import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { CRUD_GET_ONE_REFERENCE } from '../../actions/referenceActions';
import { crudGetMany } from '../../actions/dataActions';

/**
 * Example
 *
 * let id = {
 *   posts: { 4: true, 7: true, 345: true },
 *   authors: { 23: true, 47: true, 78: true },
 * }
 */
let ids = {};

// see http://yelouafi.github.io/redux-saga/docs/recipes/index.html#debouncing
function *fetchReference(resource) {
    // combined with cancel(), this debounces the calls
    yield call(delay, 50);
    yield Object.keys(ids).map(reference =>
        put(crudGetMany(resource, Object.keys(ids[reference])))
    );
    ids = {};
}

function *watchFetchReference() {
    let task;
    while (true) { // eslint-disable-line no-constant-condition
        const { payload } = yield take(CRUD_GET_ONE_REFERENCE);
        const { id, resource } = payload;
        if (!ids[resource]) {
            ids[resource] = {};
        }
        ids[resource][id] = true; // fast UNIQUE
        if (task) {
            yield cancel(task);
        }
        task = yield fork(fetchReference, resource);
    }
}

export default function*() {
    yield watchFetchReference();
}
