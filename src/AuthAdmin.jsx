import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import { Admin } from 'react-admin';
import { Route } from 'react-router-dom';
import {
    LOGIN_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    RESET_PASSWORD_ROUTE,
    SIGN_UP_ROUTE,
    PROFILE_ROUTE,
} from './constants/defaultRoutes';
import {
    ForgotPasswordPage,
    LoginPage,
    ProfilePage,
    ResetPasswordPage,
    SignUpPage,
} from './pages';
import { AuthLayout, LayoutConfigContextProvider } from './layout';
import { createAuthRoute } from './utils';

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
    authRoutes: [
        {
            path: LOGIN_ROUTE,
            component: LoginPage,
        },
        {
            path: SIGN_UP_ROUTE,
            component: SignUpPage,
        },
        {
            path: FORGOT_PASSWORD_ROUTE,
            component: ForgotPasswordPage,
        },
        {
            path: RESET_PASSWORD_ROUTE,
            component: ResetPasswordPage,
        },
    ],
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
