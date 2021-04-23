import React from 'react';
import PropTypes from 'prop-types';
import { Admin } from 'react-admin';
import { Route } from 'react-router-dom';
import {
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

const AuthAdmin = ({
    authProvider,
    authRoutes,
    customRoutes,
    ...rest
}) => (
    <Admin
        {...rest}
        authProvider={authProvider}
        loginPage={LoginPage}
        customRoutes={[
            ...customRoutes,
            ...authRoutes.map((route) => (
                <Route
                    exact
                    noLayout
                    path={route.path}
                    render={(props) => (
                        <route.component {...props} authProvider={authProvider} />
                    )}
                />
            )),
        ]}
    />
);

AuthAdmin.defaultProps = {
    authRoutes: {
        signup: {
            path: SIGN_UP_ROUTE,
            component: SignUpPage,
        },
        forgotPassword: {
            path: FORGOT_PASSWORD_ROUTE,
            component: ForgotPasswordPage,
        },
        resetPassword: {
            path: RESET_PASSWORD_ROUTE,
            component: ResetPasswordPage,
        },
    },
};

AuthAdmin.propTypes = {
    customRoutes: PropTypes.array,
    authRoutes: PropTypes.object,
    authProvider: PropTypes.object,
};

export default AuthAdmin;
