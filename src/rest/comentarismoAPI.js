import {queryParameters, fetchJson} from '../util/fetch';
import {
    GET_LIST,
    GET_MATCHING,
    GET_DISTINCT,
    GET_ONE,
    GET_MANY,
    CREATE,
    UPDATE,
    DELETE,
    MODERATE,
    REPLY,
    SPAM,
    GET_DASHBOARD_TOTAL_CMT,
    GET_DASHBOARD_SENTIMENT_CMT,
    GET_DASHBOARD_GENDER_CMT,
    GET_DASHBOARD_AGE_CMT,
    GET_DASHBOARD_BROWSER_CMT,
    GET_DASHBOARD_COUNTRY_CMT,
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
                const {page, perPage} = params.pagination;
                const {field, order} = params.sort;
                const query = {
                    ...params.filter,
                    _sort: field,
                    _order: order,
                    _start: (page - 1) * perPage,
                    _end: perPage,
                };
                url = `${apiUrl}/list/${resource}?${queryParameters(query)}`;
                console.log("convertRESTRequestToHTTP, GET_LIST, ", url);
                break;
            }
            case GET_MATCHING: {
                url = `${apiUrl}/list/${resource}?${queryParameters(params.filter)}`;
                console.log("convertRESTRequestToHTTP, GET_MATCHING, ", url);
                break;
            }
            case GET_DISTINCT: {
                console.log("GET_DISTINCT, ",params)
                url = `${apiUrl}/listdistinct/${resource}/${params.filter}`;
                console.log("convertRESTRequestToHTTP, GET_DISTINCT, ", url);
                break;
            }
            case GET_ONE:
                url = `${apiUrl}/read/${resource}/${params.id}/`;
                console.log("convertRESTRequestToHTTP, GET_ONE, ", url);
                break;
            case UPDATE:
                url = `${apiUrl}/update/${resource}/${params.id}/`;
                console.log("convertRESTRequestToHTTP, UPDATE, ", url);
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
                break;
            case CREATE:
                url = `${apiUrl}/create/${resource}/`;
                console.log("convertRESTRequestToHTTP, CREATE, ", url);
                options.method = 'POST';
                options.body = JSON.stringify(params.data);
                break;
            case DELETE:
                url = `${apiUrl}/delete/${resource}/${params.id}/`;
                console.log("convertRESTRequestToHTTP, DELETE, ", url);
                options.method = 'DELETE';
                break;

            case MODERATE:
                url = `${apiUrl}/moderate/${resource}/${params.id}/`;
                console.log("convertRESTRequestToHTTP, MODERATE, ", url);
                options.method = 'POST';
                break;

            case REPLY:
                url = `${apiUrl}/reply/${resource}/${params.id}/`;
                console.log("convertRESTRequestToHTTP, REPLY, ", url);
                options.method = 'POST';
                options.body = JSON.stringify(params.data);
                break;

            case SPAM:
                url = `${apiUrl}/spam/${resource}/${params.id}/`;
                console.log("convertRESTRequestToHTTP, SPAM, ", url);
                options.method = 'POST';
                break;

            default:
                console.log("convertRESTRequestToHTTP, default, Unsupported");
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return {url, options};
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} REST response
     */
    const convertHTTPResponseToREST = (response, type, resource, params) => {
        const {headers, json} = response;
        switch (type) {
            case GET_DASHBOARD_TOTAL_CMT:
            case GET_LIST:
                return {
                    data: Array.prototype.map.call(json, function (x) {
                        return x;
                    }),
                    total: json.length || 0
                };
            case GET_DISTINCT:

                console.log("convertHTTPResponseToREST, resource, ",params)
                return Array.prototype.map.call(json, function (x) {
                    if (!x.id) {
                        if (params.filter === "title") {
                            x.id = x.title;
                        } else if (params.filter === "nick") {
                            x.id = x.nick;
                        } else if (params.filter === "genre") {
                            x.id = x.genre;
                        } else if (params.filter === "gender") {
                            x.id = x.gender;
                        } else if (params.filter === "spam") {
                            x.id = x.spam;
                        } else if (params.filter === "moderated") {
                            x.id = x.moderated;
                        } else if (params.filter === "age") {
                            x.id = x.age;
                        } else {
                            console.log("GET_DISTINCT returns no ID, you need to configure alternative ID here for having it working.")
                        }
                    }
                    return x;
                });
            case CREATE:
                return {...params.data, id: json.id};
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

        switch (type) {
            case GET_DASHBOARD_TOTAL_CMT:
            case GET_DASHBOARD_SENTIMENT_CMT:
            case GET_DASHBOARD_GENDER_CMT:
            case GET_DASHBOARD_AGE_CMT:
            case GET_DASHBOARD_BROWSER_CMT:
            case GET_DASHBOARD_COUNTRY_CMT:
                var url = `${apiUrl}/analytics/${resource}?${params.id}`;
                console.log("Comentarismo API DASHBOARDS, ", url);
                return fetchJson(url)
                    .then(response => convertHTTPResponseToREST(response, type, resource, params));
            case GET_MANY:
                var url = `${apiUrl}/list/${resource}/${params.id}`;
                console.log("ComentarismoAPI return, GET_MANY, ", url);
                return Promise.all(params.ids.map(id => fetchJson(url)))
                    .then(responses => responses.map(response => response.json));
            default:
                var {url, options} = convertRESTRequestToHTTP(type, resource, params);
                console.log("ComentarismoAPI return, else, ", url);
                return fetchJson(url, options)
                    .then(response => convertHTTPResponseToREST(response, type, resource, params));
        }
    };
};
