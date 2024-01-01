import React from 'react'
import PropTypes from 'prop-types'
// import { createTheme } from '@mui/material/styles'
import { Admin, CustomRoutes } from 'react-admin'
import { Route } from 'react-router-dom'
// import { PROFILE_ROUTE } from './constants/defaultRoutes'
// import { ProfilePage } from './pages'
import { defaultAuthRoutes } from './utils'

export const AuthAdmin = ({
    authLayout,
    authRoutes = defaultAuthRoutes,
    // profilePage = <ProfilePage />,
    // react-admin props
    children,
    ...rest
}) => {
    // const { theme } = rest
    // const muiTheme = useMemo(() => createTheme(theme), [theme])

    // TODO - make UserMenu useable separetly in custom layout
    // const finalLayout = (authLayout && AuthLayout) || layout

    // Add user default custom routes
    // if (profilePage) {
    //     customRoutes.push(<Route exact path={PROFILE_ROUTE} element={<profilePage />} />)
    // }
    console.log('render 2', { rest })

    return (
        <Admin loginPage={false} {...rest}>
            {/* <CustomRoutes noLayout>
                {authRoutes.map(({ path, Component }) => (
                    <Route key={path} exact path={path} element={<Component />} />
                ))}
            </CustomRoutes> */}
            {children}
        </Admin>
    )
}

AuthAdmin.propTypes = {
    authRoutes: PropTypes.array,
    authLayout: PropTypes.object,
    layout: PropTypes.node,
    menu: PropTypes.node,
    userMenu: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    profilePage: PropTypes.node,
    children: PropTypes.node,
}
