import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import { Admin } from 'react-admin';
import { Route } from 'react-router-dom';
import { PROFILE_ROUTE } from './constants/defaultRoutes';
import { ProfilePage } from './pages';
import { AuthLayout, LayoutConfigContextProvider } from './layout';
import { createAuthRoute, defaultAuthRoutes } from './utils';

const AuthAdmin = ({
    authRoutes,
    authLayout,
    profilePage,
    // react-admin props
    customRoutes,
    layout,
    ...rest
}) => {
    const { theme } = rest;
    const muiTheme = useMemo(() => createMuiTheme(theme), [theme]);

    // TODO - make UserMenu useable separetly in custom layout
    const finalLayout = (authLayout && AuthLayout) || layout;

    // Add auth default custom routes
    if (authRoutes) {
        authRoutes.map((route) => customRoutes.push(
            createAuthRoute(route, muiTheme),
        ));
    }

    // Add user default custom routes
    if (profilePage) {
        customRoutes.push(
            <Route
                exact
                path={PROFILE_ROUTE}
                component={profilePage}
            />,
        );
    }

    return (
        <LayoutConfigContextProvider value={{ ...authLayout }}>
            <Admin
                {...rest}
                layout={finalLayout}
                loginPage={false}
                customRoutes={customRoutes}
            />
        </LayoutConfigContextProvider>
    );
};

AuthAdmin.defaultProps = {
    customRoutes: [],
    authRoutes: defaultAuthRoutes,
    profilePage: ProfilePage,
};

AuthAdmin.propTypes = {
    authRoutes: PropTypes.array,
    authLayout: PropTypes.object,
    customRoutes: PropTypes.array,
    layout: PropTypes.node,
    menu: PropTypes.node,
    userMenu: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    profilePage: PropTypes.element,
};

export default AuthAdmin;
