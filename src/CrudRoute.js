import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { createRoutesFromReactChildren } from 'react-router/lib//RouteUtils';

const CrudRoute = () => <div>&lt;CrudRoute&gt; elements are for configuration only and should not be rendered</div>;

CrudRoute.createRouteFromReactElement = (element, parentRoute) => {
    const { path, list, edit, create, remove, spam, reply, moderate, options } = element.props;
    // dynamically add crud routes
    const crudRoute = createRoutesFromReactChildren(
        <Route path={path}>
            {list ? <IndexRoute component={list} /> : null}
            {create ? <Route path="create" component={create} /> : null}
            {edit ? <Route path=":id" component={edit} /> : null}
            {remove ? <Route path=":id/delete" component={remove} /> : null}
            {moderate ? <Route path=":id/moderate" component={moderate} /> : null}
            {reply ? <Route path=":id/reply" component={reply} /> : null}
            {spam ? <Route path=":id/spam" component={spam} /> : null}
        </Route>,
        parentRoute
    )[0];
    // higher-order component to pass path as resource to components
    crudRoute.component = ({ children }) => (
        <div>
            {React.Children.map(children, child => React.cloneElement(child, {
                resource: path,
                options,
                hasList: !!list,
                hasEdit: !!edit,
                hasCreate: !!create,
                hasDelete: !!remove,
                hasModerate: !!moderate,
                hasReply: !!reply,
                hasSpam: !!spam,
            }))}
        </div>
    );
    return crudRoute;
};

export default CrudRoute;
