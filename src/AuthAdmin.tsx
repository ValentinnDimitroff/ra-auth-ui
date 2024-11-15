import { FC, ReactNode } from 'react'
import { Route } from 'react-router-dom'
import { Admin, AdminProps, CustomRoutes } from 'react-admin'

import { AuthOptionsContextProvider, AuthOptionsContextType } from './context/AuthOptionsContext'
import { AuthLayout } from './layout'
import { defaultAuthRoutes, defaultPasswordRules } from './utils'
import { ProfilePage } from './pages'
import { PROFILE_ROUTE } from './constants/defaultRoutes'

// import { createTheme } from '@mui/material/styles'

export type AuthAdminProps = AdminProps & {
    authRoutes?: { path: string; Component: FC }[]
    authOptions?: AuthOptionsContextType
    children?: ReactNode //fix typescript issues
}

export const defaultAuthOptions = {
    profilePage: true,
    userMenuItems: [],
    passwordRules: defaultPasswordRules || null, // TODO - not yet implemented
}

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

    // Note that we need to provide defaults for ProfilePage props onPictureUpload, onSubmit
    const ProfileComponent = authOptions.profilePage === true ? <ProfilePage /> : authOptions.profilePage
    return (
        <AuthOptionsContextProvider {...authOptions}>
            <Admin loginPage={false} layout={layout} {...rest}>
                <CustomRoutes noLayout>
                    {authRoutes.map(({ path, Component }) => (
                        <Route key={path} path={path} element={<Component />} />
                    ))}
                    {authOptions.profilePage && <Route path={PROFILE_ROUTE} element={ProfileComponent} />}
                </CustomRoutes>
                {children}
            </Admin>
        </AuthOptionsContextProvider>
    )
}
