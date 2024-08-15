// @ts-nocheck
import { FC } from 'react'
// import { createTheme } from '@mui/material/styles'
import { Admin, AdminProps, CustomRoutes } from 'react-admin'
import { Route } from 'react-router-dom'
// import { PROFILE_ROUTE } from './constants/defaultRoutes'
import { AuthOptionsContextProvider, AuthOptionsContextType } from './context/AuthOptionsContext'
import { AuthLayout } from './layout'
import { ProfilePage } from './pages/profile/ProfilePage'
import { defaultAuthRoutes } from './utils'

export type AuthAdminProps = AdminProps & {
    authRoutes?: { path: string; Component: FC }[]
    authOptions?: AuthOptionsContextType
}

export const defaultAuthOptions = { profilePage: <ProfilePage /> || null, userMenuItems: [] }

export const AuthAdmin: FC<AuthAdminProps> = ({
    authRoutes = defaultAuthRoutes,
    authOptions = defaultAuthOptions,
    // react-admin props
    children,
    layout = AuthLayout,
    ...rest
}) => {
    // const { theme } = rest
    // const muiTheme = useMemo(() => createTheme(theme), [theme])

    // TODO - add ProfilePage if opted in
    // <Route exact path={PROFILE_ROUTE} element={<profilePage />} />

    return (
        <AuthOptionsContextProvider {...authOptions}>
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
