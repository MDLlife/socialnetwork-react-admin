import {push} from 'react-router-redux';
import {
    CRUD_CREATE,
    CRUD_UPDATE,
    CRUD_DELETE,
    CRUD_MODERATE,
    CRUD_REPLY,
    CRUD_SPAM,
    CRUD_GET_DASHBOARD_TOTAL_CMT_SUCCESS,
    CRUD_GET_DASHBOARD_SENTIMENT_CMT_SUCCESS,
    CRUD_GET_DASHBOARD_GENDER_CMT_SUCCESS,
    CRUD_GET_DASHBOARD_AGE_CMT_SUCCESS,
    CRUD_GET_DASHBOARD_BROWSER_CMT_SUCCESS,
    CRUD_GET_DASHBOARD_COUNTRY_CMT_SUCCESS,
} from '../../actions/dataActions';
import {showNotification} from '../../actions/notificationActions';

export default (type, resource, payload, response) => {

    // console.log("success.js --> ",type,resource, payload, response)
    var CRUD_CREATE_URL = `${payload.basePath}`;
    if (response && response.id) {
        CRUD_CREATE_URL = `/${response.id}`
    }
    switch (type) {
        case CRUD_GET_DASHBOARD_TOTAL_CMT_SUCCESS:
        case CRUD_GET_DASHBOARD_SENTIMENT_CMT_SUCCESS:
        case CRUD_GET_DASHBOARD_GENDER_CMT_SUCCESS:
        case CRUD_GET_DASHBOARD_AGE_CMT_SUCCESS:
        case CRUD_GET_DASHBOARD_BROWSER_CMT_SUCCESS:
        case CRUD_GET_DASHBOARD_COUNTRY_CMT_SUCCESS:
            return [
                showNotification(`Dashboard ${type} OK`),
            ];
        case CRUD_UPDATE:
            return [
                showNotification('Element updated'),
                push(CRUD_CREATE_URL),
            ];
        case CRUD_CREATE:
            return [
                showNotification('Element created'),
                push(CRUD_CREATE_URL),
            ];
        case CRUD_DELETE:
            return [
                showNotification('Element deleted'),
                push(`${payload.basePath}`),
            ];
        case CRUD_MODERATE:
            return [
                showNotification('Element moderated'),
                push(`${payload.basePath}`),
            ];
        case CRUD_REPLY:
            return [
                showNotification('Element replyed'),
                push(`${payload.basePath}`),
            ];
        case CRUD_SPAM:
            return [
                showNotification('Element spammed'),
                push(`${payload.basePath}`),
            ];

        default:
            return [];
    }
};
