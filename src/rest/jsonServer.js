import { queryParameters, fetchJson } from '../util/fetch';
import {
    GET_LIST,
    GET_MATCHING,
    GET_ONE,
    GET_MANY,
    CREATE,
    UPDATE,
    DELETE,
    MODERATE,
    REPLY,
    SPAM,
} from './types';

/**
 * Maps admin-on-rest queries to a json-server powered REST API
 *
 * @see https://github.com/typicode/json-server
 * @example
 * GET_LIST     => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * GET_MATCHING => GET http://my.api.url/posts?title=bar
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl) => {
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertRESTRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};
        switch (type) {
        case GET_LIST: {
            console.log("convertRESTRequestToHTTP, GET_LIST");
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                ...params.filter,
                _sort: field,
                _order: order,
                _start: (page - 1) * perPage,
                _end: page * perPage - 1,
            };
            url = `${apiUrl}/${resource}?${queryParameters(query)}`;
            break;
        }
        case GET_MATCHING: {
            console.log("convertRESTRequestToHTTP, GET_MATCHING");
            url = `${apiUrl}/${resource}?${queryParameters(params.filter)}`;
            break;
        }
        case GET_ONE:
            console.log("convertRESTRequestToHTTP, GET_ONE");
            url = `${apiUrl}/${resource}/${params.id}`;
            break;
        case UPDATE:
            console.log("convertRESTRequestToHTTP, UPDATE");
            url = `${apiUrl}/${resource}/${params.id}`;
            options.method = 'PUT';
            options.body = JSON.stringify(params.data);
            break;
        case CREATE:
            console.log("convertRESTRequestToHTTP, CREATE");
            url = `${apiUrl}/${resource}`;
            options.method = 'POST';
            options.body = JSON.stringify(params.data);
            break;
        case DELETE:
            console.log("convertRESTRequestToHTTP, DELETE");
            url = `${apiUrl}/${resource}/${params.id}`;
            options.method = 'DELETE';
            break;
        case MODERATE:
            console.log("convertRESTRequestToHTTP, MODERATE");
            url = `${apiUrl}/${resource}/${params.id}`;
            options.method = 'POST';
            break;
        case REPLY:
            console.log("convertRESTRequestToHTTP, REPLY");
            url = `${apiUrl}/${resource}/${params.id}`;
            options.method = 'POST';
            options.body = JSON.stringify(params.data);
            break;
        case SPAM:
            console.log("convertRESTRequestToHTTP, SPAM");
            url = `${apiUrl}/${resource}/${params.id}`;
            options.method = 'POST';
            break;
        default:
            console.log("convertRESTRequestToHTTP, default");
            throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} REST response
     */
    const convertHTTPResponseToREST = (response, type, resource, params) => {
        const { headers, json } = response;
        switch (type) {
        case GET_LIST:
            return {
                data: json.map(x => x),
                total: parseInt(headers['x-total-count'].split('/').pop(), 10),
            };
        case CREATE:
            return { ...params.data, id: json.id };
        default:
            return json;
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a REST response
     */
    return (type, resource, params) => {
        // json-server doesn't handle WHERE IN requests, so we fallback to calling GET_ONE n times instead
        if (type === GET_MANY) {
            return Promise.all(params.ids.map(id => fetchJson(`${apiUrl}/${resource}/${id}`)))
                .then(responses => responses.map(response => response.json));
        }
        const { url, options } = convertRESTRequestToHTTP(type, resource, params);
        return fetchJson(url, options)
            .then(response => convertHTTPResponseToREST(response, type, resource, params));
    };
};
