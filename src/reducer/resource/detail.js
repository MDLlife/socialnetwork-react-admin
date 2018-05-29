import { CRUD_GET_MATCHING_SUCCESS,CRUD_GET_DISTINCT_SUCCESS, CRUD_GET_DASHBOARD_TOTAL_CMT_SUCCESS } from '../../actions/dataActions';

const initialState = {
};

export default (resource) => (previousState = initialState, { type, payload, meta }) => {
    if (!meta || meta.relatedTo !== resource) {
        return previousState;
    }
    switch (type) {
    case CRUD_GET_MATCHING_SUCCESS:
    case CRUD_GET_DISTINCT_SUCCESS:
        return {
            ...previousState,
            [meta.resource]: payload.map(record => record._key),
        };
    default:
        return previousState;
    }
};
