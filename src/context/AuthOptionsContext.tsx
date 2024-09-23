import { createContext, FC, PropsWithChildren, ReactNode } from 'react'
import { PasswordRulesType } from '../pages/profile/ProfileDetailsCard'

export interface AuthOptionsContextType {
    profilePage?: boolean | ReactNode 
    userMenuItems?: ReactNode[]
    loginRedirectPath?: string
    passwordRules?: PasswordRulesType | null
}

export const AuthOptionsContext = createContext<AuthOptionsContextType>({
    profilePage: true,
    userMenuItems: [],
    passwordRules: null,
})

AuthOptionsContext.displayName = 'AuthOptionsContext'

type Props = AuthOptionsContextType & PropsWithChildren

export const AuthOptionsContextProvider: FC<Props> = ({ children, ...props }) => {
    return <AuthOptionsContext.Provider value={props}>{children}</AuthOptionsContext.Provider>
}
