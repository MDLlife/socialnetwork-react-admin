import {
    CRUD_GET_LIST_SUCCESS,
    CRUD_GET_ONE_SUCCESS,
    CRUD_GET_MANY_SUCCESS,
    CRUD_UPDATE,
    CRUD_UPDATE_SUCCESS,
    CRUD_CREATE_SUCCESS,
    CRUD_GET_MATCHING_SUCCESS,
    CRUD_GET_DISTINCT_SUCCESS,
    CRUD_GET_DASHBOARD_TOTAL_CMT_SUCCESS
} from '../../actions/dataActions';

/**
 * The data state is an instance pool, which keeps track of the fetch date of each instance.
 *
 * @example
 * {
 *   23: { id: 23, title: 'War and Peace' },
 *   67: { id: 67, title: 'Anna Karenina' },
 *   fetchedAt: { // non enumerable
 *     23: new Date('2016-08-05T19:33:15.012Z'),
 *     67: new Date('2016-08-05T19:33:43.449Z'),
 *   },
 * }
 */

const cacheDuration = 10 * 60 * 1000; // ten minutes

/**
 * Add new records to the pool, and remove outdated ones.
 *
 * This is the equivalent of a stale-while-revalidate caching strategy:
 * The cached data is displayed before fetching, and stale data is removed
 * only once fresh data is fetched.
 */
const addRecords = (newRecords = [], oldRecords) => {
    // prepare new records and timestamp them
    const newRecordsById = newRecords.reduce((prev, record) => {
        if (record) {
            prev[record._key] = record; // eslint-disable-line no-param-reassign
        }
        return prev;
    }, {});
    const now = new Date();
    const newRecordsFetchedAt = newRecords.reduce((prev, record) => {
        if (record) {
            prev[record._key] = now; // eslint-disable-line no-param-reassign
        }
        return prev;
    }, {});
    // remove outdated old records
    const latestValidDate = new Date();
    latestValidDate.setTime(latestValidDate.getTime() - cacheDuration);
    const oldValidRecordIds = Object.keys(oldRecords.fetchedAt)
        .filter(id => oldRecords.fetchedAt[id] > latestValidDate);
    const oldValidRecords = oldValidRecordIds.reduce((prev, id) => {
        prev[id] = oldRecords[id]; // eslint-disable-line no-param-reassign
        return prev;
    }, {});
    const oldValidRecordsFetchedAt = oldValidRecordIds.reduce((prev, id) => {
        prev[id] = oldRecords.fetchedAt[id]; // eslint-disable-line no-param-reassign
        return prev;
    }, {});
    // combine old records and new records
    const records = {
        ...oldValidRecords,
        ...newRecordsById,
    };
    Object.defineProperty(records, 'fetchedAt', {
        value: {
            ...oldValidRecordsFetchedAt,
            ...newRecordsFetchedAt,
        }
    }); // non enumerable by default
    return records;
};

const initialState = {};
Object.defineProperty(initialState, 'fetchedAt', {value: {}}); // non enumerable by default

export default (resource) => (previousState = initialState, {type, payload, meta}) => {
    if (!meta || meta.resource !== resource) {
        return previousState;
    }
    // console.log("Reducer -> ",type, payload, meta)
    switch (type) {
        case CRUD_GET_LIST_SUCCESS:
            return addRecords(payload.data, previousState);
        case CRUD_GET_MANY_SUCCESS:
        case CRUD_GET_MATCHING_SUCCESS:
        case CRUD_GET_DISTINCT_SUCCESS:
            return addRecords(payload, previousState);
        case CRUD_UPDATE: // replace record in edit form with edited one to avoid displaying previous record version
            return addRecords([payload.data], previousState);
        case CRUD_GET_ONE_SUCCESS:
        case CRUD_UPDATE_SUCCESS:
        // return previousState;
        case CRUD_CREATE_SUCCESS:
            return addRecords([payload], previousState);
        default:
            return previousState;
    }
};

export const getRecord = (state, id) => state[id];
