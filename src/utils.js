import React from 'react'
import { Route } from 'react-router-dom'
import {
    LOGIN_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    RESET_PASSWORD_ROUTE,
    SIGN_UP_ROUTE,
} from './constants/defaultRoutes'
import { ForgotPasswordPage, LoginPage, ResetPasswordPage, SignUpPage } from './pages'

const sanitizeRouteProps = ({ title, ...rest }) => rest

export const createAuthRoute = (routeObj, theme) => (
    <Route
        exact
        noLayout
        path={routeObj.path}
        render={(props) => <routeObj.component {...sanitizeRouteProps(props)} theme={theme} />}
    />
)

export const defaultAuthRoutes = [
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
