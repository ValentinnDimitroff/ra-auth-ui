import React, { FC } from 'react'
// import { createTheme } from '@mui/material/styles'
import { Admin, AdminProps, CustomRoutes } from 'react-admin'
import { Route } from 'react-router-dom'
// import { PROFILE_ROUTE } from './constants/defaultRoutes'
import { ProfilePage } from './pages/profile/ProfilePage'
import { AuthLayout } from './layout'
import { defaultAuthRoutes } from './utils'
import { AuthOptionsContextProvider } from '../src/context/AuthOptionsContext'

export type AuthAdminProps = AdminProps & {
    authRoutes?: { path: string; Component: FC }[]
    children: React.ReactNode
    authOptions?: {
        profilePage?: React.ReactNode
        userMenuItems?: React.ReactNode[]
    }
}

export const AuthAdmin: FC<AuthAdminProps> = ({
    // authLayout,
    authRoutes = defaultAuthRoutes,
    authOptions = { profilePage: <ProfilePage /> || null, userMenuItems: [] },
    // profilePage = <ProfilePage />,
    // react-admin props
    children,
    ...rest
}) => {
    // const { theme } = rest
    // const muiTheme = useMemo(() => createTheme(theme), [theme])

    // TODO - make UserMenu useable separately in custom layout
    // const finalLayout = (authLayout && AuthLayout) || layout
    const layout = rest.layout || AuthLayout

    // Add user default custom routes
    // if (profilePage) {
    //     customRoutes.push(<Route exact path={PROFILE_ROUTE} element={<profilePage />} />)
    // }

    return (
        <AuthOptionsContextProvider value={authOptions}>
            <Admin loginPage={false} layout={layout} {...rest}>
                <CustomRoutes noLayout>
                    {authRoutes.map(({ path, Component }) => (
                        <Route key={path} path={path} element={<Component />} />
                    ))}
                </CustomRoutes>
                {children}
            </Admin>
        </AuthOptionsContextProvider>
    )
}
