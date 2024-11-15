import { LOGIN_ROUTE, FORGOT_PASSWORD_ROUTE, RESET_PASSWORD_ROUTE, SIGN_UP_ROUTE } from './constants/defaultRoutes'
import { ForgotPasswordPage, LoginPage, ResetPasswordPage, SignUpPage } from './pages'

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

export type PasswordRulesType = {
    requiredDigit?: boolean
    requiredLowercase?: boolean
    requiredUppercase?: boolean
    requiredLength?: number
    requiredMinSymbols?: number
}

export const defaultPasswordRules: PasswordRulesType = {
    requiredDigit: true,
    requiredLowercase: true,
    requiredUppercase: true,
    requiredLength: 8,
    requiredMinSymbols: 1,
}
