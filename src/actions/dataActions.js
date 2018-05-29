import {
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    DELETE,
    SPAM,
    REPLY,
    MODERATE,
    GET_MANY,
    GET_MATCHING,
    GET_DISTINCT,
    GET_DASHBOARD_TOTAL_CMT,
    GET_DASHBOARD_SENTIMENT_CMT,
    GET_DASHBOARD_GENDER_CMT,
    GET_DASHBOARD_AGE_CMT,
    GET_DASHBOARD_BROWSER_CMT,
    GET_DASHBOARD_COUNTRY_CMT,
} from '../rest/types';

export const CRUD_GET_LIST = 'CRUD_GET_LIST';
export const CRUD_GET_LIST_LOADING = 'CRUD_GET_LIST_LOADING';
export const CRUD_GET_LIST_FAILURE = 'CRUD_GET_LIST_FAILURE';
export const CRUD_GET_LIST_SUCCESS = 'CRUD_GET_LIST_SUCCESS';

export const crudGetList = (resource, pagination, sort, filter) => ({
    type: CRUD_GET_LIST,
    payload: {pagination, sort, filter},
    meta: {resource, fetch: GET_LIST, cancelPrevious: true},
});

export const CRUD_GET_ONE = 'CRUD_GET_ONE';
export const CRUD_GET_ONE_LOADING = 'CRUD_GET_ONE_LOADING';
export const CRUD_GET_ONE_FAILURE = 'CRUD_GET_ONE_FAILURE';
export const CRUD_GET_ONE_SUCCESS = 'CRUD_GET_ONE_SUCCESS';

export const crudGetOne = (resource, id, basePath, cancelPrevious = true) => ({
    type: CRUD_GET_ONE,
    payload: {id, basePath},
    meta: {resource, fetch: GET_ONE, cancelPrevious},
});

export const CRUD_CREATE = 'CRUD_CREATE';
export const CRUD_CREATE_LOADING = 'CRUD_CREATE_LOADING';
export const CRUD_CREATE_FAILURE = 'CRUD_CREATE_FAILURE';
export const CRUD_CREATE_SUCCESS = 'CRUD_CREATE_SUCCESS';

export const crudCreate = (resource, data, basePath) => ({
    type: CRUD_CREATE,
    payload: {data, basePath},
    meta: {resource, fetch: CREATE, cancelPrevious: true},
});

export const CRUD_UPDATE = 'CRUD_UPDATE';
export const CRUD_UPDATE_LOADING = 'CRUD_UPDATE_LOADING';
export const CRUD_UPDATE_FAILURE = 'CRUD_UPDATE_FAILURE';
export const CRUD_UPDATE_SUCCESS = 'CRUD_UPDATE_SUCCESS';

export const crudUpdate = (resource, id, data, basePath) => ({
    type: CRUD_UPDATE,
    payload: {id, data, basePath},
    meta: {resource, fetch: UPDATE, cancelPrevious: true},
});

export const CRUD_DELETE = 'CRUD_DELETE';
export const CRUD_DELETE_LOADING = 'CRUD_DELETE_LOADING';
export const CRUD_DELETE_FAILURE = 'CRUD_DELETE_FAILURE';
export const CRUD_DELETE_SUCCESS = 'CRUD_DELETE_SUCCESS';

export const crudDelete = (resource, id, basePath) => ({
    type: CRUD_DELETE,
    payload: {id, basePath},
    meta: {resource, fetch: DELETE, cancelPrevious: true},
});

export const CRUD_SPAM = 'CRUD_SPAM';
export const CRUD_SPAM_LOADING = 'CRUD_SPAM_LOADING';
export const CRUD_SPAM_FAILURE = 'CRUD_SPAM_FAILURE';
export const CRUD_SPAM_SUCCESS = 'CRUD_SPAM_SUCCESS';

export const crudSpam = (resource, id, basePath) => ({
    type: CRUD_SPAM,
    payload: {id, basePath},
    meta: {resource, fetch: SPAM, cancelPrevious: true},
});

export const CRUD_REPLY = 'CRUD_REPLY';
export const CRUD_REPLY_LOADING = 'CRUD_REPLY_LOADING';
export const CRUD_REPLY_FAILURE = 'CRUD_REPLY_FAILURE';
export const CRUD_REPLY_SUCCESS = 'CRUD_REPLY_SUCCESS';

export const crudReply = (resource, id, data, basePath) => ({
    type: CRUD_REPLY,
    payload: {id, data, basePath},
    meta: {resource, fetch: REPLY, cancelPrevious: true},
});

export const CRUD_MODERATE = 'CRUD_MODERATE';
export const CRUD_MODERATE_LOADING = 'CRUD_MODERATE_LOADING';
export const CRUD_MODERATE_FAILURE = 'CRUD_MODERATE_FAILURE';
export const CRUD_MODERATE_SUCCESS = 'CRUD_MODERATE_SUCCESS';

export const crudModerate = (resource, id, basePath) => ({
    type: CRUD_MODERATE,
    payload: {id, basePath},
    meta: {resource, fetch: MODERATE, cancelPrevious: true},
});

export const CRUD_GET_MANY = 'CRUD_GET_MANY';
export const CRUD_GET_MANY_LOADING = 'CRUD_GET_MANY_LOADING';
export const CRUD_GET_MANY_FAILURE = 'CRUD_GET_MANY_FAILURE';
export const CRUD_GET_MANY_SUCCESS = 'CRUD_GET_MANY_SUCCESS';

// Reference related actions

export const crudGetMany = (resource, ids) => ({
    type: CRUD_GET_MANY,
    payload: {ids},
    meta: {resource, fetch: GET_MANY, cancelPrevious: false},
});


export const CRUD_GET_DASHBOARD_TOTAL_CMT = 'CRUD_GET_DASHBOARD_TOTAL_CMT';
export const CRUD_GET_DASHBOARD_TOTAL_CMT_LOADING = 'CRUD_GET_DASHBOARD_TOTAL_CMT_LOADING';
export const CRUD_GET_DASHBOARD_TOTAL_CMT_FAILURE = 'CRUD_GET_DASHBOARD_TOTAL_CMT_FAILURE';
export const CRUD_GET_DASHBOARD_TOTAL_CMT_SUCCESS = 'CRUD_GET_DASHBOARD_TOTAL_CMT_SUCCESS';

// Reference related actions
export const crudDashboardTotalComments = (resource, id) => ({
    type: CRUD_GET_DASHBOARD_TOTAL_CMT,
    payload: {id},
    meta: {resource, fetch: GET_DASHBOARD_TOTAL_CMT, cancelPrevious: false},
});


export const CRUD_GET_DASHBOARD_SENTIMENT_CMT = 'CRUD_GET_DASHBOARD_SENTIMENT_CMT';
export const CRUD_GET_DASHBOARD_SENTIMENT_CMT_LOADING = 'CRUD_GET_DASHBOARD_SENTIMENT_CMT_LOADING';
export const CRUD_GET_DASHBOARD_SENTIMENT_CMT_FAILURE = 'CRUD_GET_DASHBOARD_SENTIMENT_CMT_FAILURE';
export const CRUD_GET_DASHBOARD_SENTIMENT_CMT_SUCCESS = 'CRUD_GET_DASHBOARD_SENTIMENT_CMT_SUCCESS';

// Reference related actions
export const crudDashboardSentimentComments = (resource, id) => ({
    type: CRUD_GET_DASHBOARD_SENTIMENT_CMT,
    payload: {id},
    meta: {resource, fetch: GET_DASHBOARD_SENTIMENT_CMT, cancelPrevious: false},
});

export const CRUD_GET_DASHBOARD_GENDER_CMT = 'CRUD_GET_DASHBOARD_GENDER_CMT';
export const CRUD_GET_DASHBOARD_GENDER_CMT_LOADING = 'CRUD_GET_DASHBOARD_GENDER_CMT_LOADING';
export const CRUD_GET_DASHBOARD_GENDER_CMT_FAILURE = 'CRUD_GET_DASHBOARD_GENDER_CMT_FAILURE';
export const CRUD_GET_DASHBOARD_GENDER_CMT_SUCCESS = 'CRUD_GET_DASHBOARD_GENDER_CMT_SUCCESS';

// Reference related actions
export const crudDashboardGenderComments = (resource, id) => ({
    type: CRUD_GET_DASHBOARD_GENDER_CMT,
    payload: {id},
    meta: {resource, fetch: GET_DASHBOARD_GENDER_CMT, cancelPrevious: false},
});


export const CRUD_GET_DASHBOARD_AGE_CMT = 'CRUD_GET_DASHBOARD_AGE_CMT';
export const CRUD_GET_DASHBOARD_AGE_CMT_LOADING = 'CRUD_GET_DASHBOARD_AGE_CMT_LOADING';
export const CRUD_GET_DASHBOARD_AGE_CMT_FAILURE = 'CRUD_GET_DASHBOARD_AGE_CMT_FAILURE';
export const CRUD_GET_DASHBOARD_AGE_CMT_SUCCESS = 'CRUD_GET_DASHBOARD_AGE_CMT_SUCCESS';

// Reference related actions
export const crudDashboardAgeComments = (resource, id) => ({
    type: CRUD_GET_DASHBOARD_AGE_CMT,
    payload: {id},
    meta: {resource, fetch: GET_DASHBOARD_AGE_CMT, cancelPrevious: false},
});


export const CRUD_GET_DASHBOARD_BROWSER_CMT = 'CRUD_GET_DASHBOARD_BROWSER_CMT';
export const CRUD_GET_DASHBOARD_BROWSER_CMT_LOADING = 'CRUD_GET_DASHBOARD_BROWSER_CMT_LOADING';
export const CRUD_GET_DASHBOARD_BROWSER_CMT_FAILURE = 'CRUD_GET_DASHBOARD_BROWSER_CMT_FAILURE';
export const CRUD_GET_DASHBOARD_BROWSER_CMT_SUCCESS = 'CRUD_GET_DASHBOARD_BROWSER_CMT_SUCCESS';

// Reference related actions
export const crudDashboardBrowserComments = (resource, id) => ({
    type: CRUD_GET_DASHBOARD_BROWSER_CMT,
    payload: {id},
    meta: {resource, fetch: GET_DASHBOARD_BROWSER_CMT, cancelPrevious: false},
});


export const CRUD_GET_DASHBOARD_COUNTRY_CMT = 'CRUD_GET_DASHBOARD_COUNTRY_CMT';
export const CRUD_GET_DASHBOARD_COUNTRY_CMT_LOADING = 'CRUD_GET_DASHBOARD_COUNTRY_CMT_LOADING';
export const CRUD_GET_DASHBOARD_COUNTRY_CMT_FAILURE = 'CRUD_GET_DASHBOARD_COUNTRY_CMT_FAILURE';
export const CRUD_GET_DASHBOARD_COUNTRY_CMT_SUCCESS = 'CRUD_GET_DASHBOARD_COUNTRY_CMT_SUCCESS';

// Reference related actions
export const crudDashboardCountryComments = (resource, id) => ({
    type: CRUD_GET_DASHBOARD_COUNTRY_CMT,
    payload: {id},
    meta: {resource, fetch: GET_DASHBOARD_COUNTRY_CMT, cancelPrevious: false},
});

export const CRUD_GET_MATCHING = 'CRUD_GET_MATCHING';
export const CRUD_GET_MATCHING_LOADING = 'CRUD_GET_MATCHING_LOADING';
export const CRUD_GET_MATCHING_FAILURE = 'CRUD_GET_MATCHING_FAILURE';
export const CRUD_GET_MATCHING_SUCCESS = 'CRUD_GET_MATCHING_SUCCESS';

export const crudGetMatching = (reference, relatedTo, filter) => ({
    type: CRUD_GET_MATCHING,
    payload: {filter},
    meta: {resource: reference, relatedTo, fetch: GET_MATCHING, cancelPrevious: false},
});


export const CRUD_GET_DISTINCT = 'CRUD_GET_DISTINCT';
export const CRUD_GET_DISTINCT_LOADING = 'CRUD_GET_DISTINCT_LOADING';
export const CRUD_GET_DISTINCT_FAILURE = 'CRUD_GET_DISTINCT_FAILURE';
export const CRUD_GET_DISTINCT_SUCCESS = 'CRUD_GET_DISTINCT_SUCCESS';

export const crudGetDistinct = (reference, relatedTo, filter) => ({
    type: CRUD_GET_DISTINCT,
    payload: {filter},
    meta: {resource: reference, relatedTo, fetch: GET_DISTINCT, cancelPrevious: false},
});