import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles'
import { Admin } from 'react-admin';
import { Route } from 'react-router-dom';
import {
    LOGIN_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    RESET_PASSWORD_ROUTE,
    SIGN_UP_ROUTE,
} from './constants/defaultRoutes';
import {
    ForgotPasswordPage,
    LoginPage,
    ResetPasswordPage,
    SignUpPage,
} from './layouts';

const sanitizeRouteProps = ({ title, ...rest }) => rest

const AuthAdmin = ({
    authRoutes,
    customRoutes = [],
    ...rest
}) => {
    const { theme } = rest;
    const muiTheme = useMemo(() => createMuiTheme(theme), [theme]);

    return (
        <Admin
            {...rest}
            loginPage={false}
            customRoutes={[
                ...customRoutes,
                ...authRoutes.map((route) => (
                    <Route
                        exact
                        noLayout
                        path={route.path}
                        render={(props) => (
                            <route.component
                                {...sanitizeRouteProps(props)}
                                theme={muiTheme}
                            />
                        )}
                    />
                )),
            ]}
        />
    )
};

AuthAdmin.defaultProps = {
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
    ]
};

AuthAdmin.propTypes = {
    customRoutes: PropTypes.array,
    authRoutes: PropTypes.array,
    authProvider: PropTypes.object,
};

export default AuthAdmin;
