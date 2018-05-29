import { SORT_DESC } from './queryReducer';
import { CRUD_CHANGE_LIST_PARAMS } from '../../../actions/listActions';

const defaultState = {
    sort: 'id',
    order: SORT_DESC,
    page: 1,
    perPage: 15,
    filter: {},
};

export default (resource) => (previousState = defaultState, { type, payload, meta }) => {
    if (!meta || meta.resource !== resource) {
        return previousState;
    }
    switch (type) {
    case CRUD_CHANGE_LIST_PARAMS:
        return payload;
    default:
        return previousState;
    }
};
