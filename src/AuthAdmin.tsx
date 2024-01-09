import React, { FC } from 'react'
// import { createTheme } from '@mui/material/styles'
import { Admin, AdminProps, CustomRoutes } from 'react-admin'
import { Route } from 'react-router-dom'
// import { PROFILE_ROUTE } from './constants/defaultRoutes'
// import { ProfilePage } from './pages'
import { defaultAuthRoutes } from './utils'

export type AuthAdminProps = AdminProps & {
    authRoutes?: { path: string; Component: FC }[]
    children: React.ReactNode
}

export const AuthAdmin: FC<AuthAdminProps> = ({
    // authLayout,
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

    return (
        <Admin loginPage={false} {...rest}>
            <CustomRoutes noLayout>
                <>
                    {authRoutes.map(({ path, Component }) => (
                        <Route key={path} path={path} element={<Component />} />
                    ))}
                </>
            </CustomRoutes>
            {children}
        </Admin>
    )
}
