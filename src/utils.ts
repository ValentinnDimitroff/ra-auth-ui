import {
    LOGIN_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    RESET_PASSWORD_ROUTE,
    SIGN_UP_ROUTE,
    PROFILE_ROUTE,
} from './constants/defaultRoutes'
import { ForgotPasswordPage, LoginPage, ResetPasswordPage, SignUpPage, ProfilePage } from './pages'
import { PasswordRulesType } from './pages/profile/ProfileDetailsCard'

export const defaultAuthRoutes: { path: string; Component: React.FC }[] = [
    {
        path: LOGIN_ROUTE,
        Component: LoginPage,
    },
    {
        path: SIGN_UP_ROUTE,
        Component: SignUpPage,
    },
    {
        path: FORGOT_PASSWORD_ROUTE,
        Component: ForgotPasswordPage,
    },
    {
        path: RESET_PASSWORD_ROUTE,
        Component: ResetPasswordPage,
    },
]

//added defaultPasswordRules props
export const defaultPasswordRules: PasswordRulesType = {
    RequiteDigit: false,
    RequiteLowercase: true,
    RequiteNonAlphanumeric: false,
    RequiteUppercase: true,
    RequitedLength: true,
    RequiteSymbols: false,
}
