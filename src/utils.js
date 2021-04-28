import React from 'react';
import { Route } from 'react-router-dom';

const sanitizeRouteProps = ({ title, ...rest }) => rest;

export const createAuthRoute = (routeObj, theme) => (
    <Route
        exact
        noLayout
        path={routeObj.path}
        render={(props) => (
            <routeObj.component
                {...sanitizeRouteProps(props)}
                theme={theme}
            />
        )}
    />
);
