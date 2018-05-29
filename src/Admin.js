import React, {PropTypes} from 'react';
import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {Router, IndexRoute, Route, Redirect, hashHistory} from 'react-router';
import {syncHistoryWithStore, routerMiddleware, routerReducer} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import adminReducer from './reducer';
import crudSaga from './sideEffect/saga';
import CrudRoute from './CrudRoute';
import Layout from './mui/layout/Layout';
import timer from './reducer/timer';
import login from './mui/layout/LoginLayout';
import logout from './mui/layout/LogoutLayout';
import auth from './auth';

const Admin = ({restClient, appLayout = Layout, dashboard, settings, search, title, children}) => {
    const resources = React.Children.map(children, ({props}) => props);
    const firstResource = resources[0].name;
    const sagaMiddleware = createSagaMiddleware();
    const reducer = combineReducers({
        admin: adminReducer(resources),
        routing: routerReducer,
        timer: timer,
        loggedIn: auth.loggedIn,
        user: auth.getUser,
    });
    const store = createStore(reducer, undefined, compose(
        applyMiddleware(routerMiddleware(hashHistory), sagaMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
    ));
    sagaMiddleware.run(crudSaga(restClient));

    const history = syncHistoryWithStore(hashHistory, store);

    appLayout.title = title;

    /**
     * Checks authentication status on route change
     * @param  {object}   nextState The state we want to change into when we change routes
     * @param  {function} replace Function provided by React Router to replace the location
     */
    function checkAuth(nextState, replace) {
        let {loggedIn, user} = store.getState()

        // console.log("checkAuth, loggedIn, ",loggedIn)
        // console.log("checkAuth, myuser, ",myuser)

        // Check if the path isn't login. That way we can apply specific logic to
        // display/render the path we want to
        if (nextState.location.pathname === '/login') {
            console.log("*&*&*&* Process login page")


        } else if (!loggedIn) {
            console.log("*&*&*&* Will redirect to login page");
            replace('/login');
        } else {
            console.log("*&*&*&* User auth ok, allow route -> ", user);
        }
    }

    return (
        <Provider store={store}>
            <Router history={history}>
                <Route onEnter={checkAuth}>
                    {dashboard ? undefined : <Redirect from="/" to={`/${firstResource}`}/>}
                    <Route path="/" component={appLayout} resources={resources}>
                        {dashboard && <IndexRoute component={dashboard} restClient={restClient}/>}
                        {resources.map(resource =>
                            <CrudRoute key={resource.name} path={resource.name} list={resource.list}
                                       edit={resource.edit} create={resource.create} remove={resource.remove}
                                       moderate={resource.moderate} reply={resource.reply} spam={resource.spam}
                                       options={resource.options}/>
                        )}
                    </Route>
                    <Route path="/settings" component={appLayout} resources={resources}>
                        {settings && <IndexRoute component={settings} restClient={restClient}/>}
                    </Route>

                    <Route path="/login" component={appLayout} resources={resources}>
                        {login && <IndexRoute component={login} restClient={restClient}/>}
                    </Route>

                    <Route path="/logout" component={appLayout} resources={resources}>
                        <IndexRoute component={logout} restClient={restClient}/>
                    </Route>

                    <Route path="/search" component={search}/>

                </Route>
            </Router>
        </Provider>
    );
};

{/*<Route path="/search" component={appLayout} resources={resources}>*/}
    // {search && <IndexRoute component={search}/> }
// </Route>

const componentPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

Admin.propTypes = {
    restClient: PropTypes.func.isRequired,
    appLayout: componentPropType,
    dashboard: componentPropType,
    children: PropTypes.node,
};

export default Admin;
