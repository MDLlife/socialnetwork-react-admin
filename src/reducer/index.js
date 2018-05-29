import { combineReducers } from 'redux';
import resourceReducer from './resource';
import loading from './loading';
import notification from './notification';
import _dashboard from './dashboard';

export default (resources) => {
    const resourceReducers = {};
    // console.log("Resources -> ",resources)
    resources.forEach(resource => {
        resourceReducers[resource.name] = resourceReducer(resource.name, resource.options);
    });
    return combineReducers({
        ...resourceReducers,
        loading,
        notification,
        _dashboard:_dashboard("dashboard"),
    });
};
